import * as React from 'react';
import { ICondition, IConditionVariable, IOperand, IOperator, IRuleBuilderConfig } from '../definitions';
import * as _find from 'lodash.find';
import * as _filter from 'lodash.filter';
import ReactDropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { PopOver } from '../pop-over/PopOver';
import { IListItem, SingleSelectList } from '../single-select-list/SingleSelectList';
import { MultiSelectList } from '../multi-select-list/MultiSelectList';




export interface IConditionProps {
  condition: ICondition;
  builderConfig: IRuleBuilderConfig;
  onConditionComplete: (condition: ICondition) => void;
}

export interface IConditionState {
  condition: ICondition;
}

export class Condition extends React.Component<IConditionProps, IConditionState> {
  state: IConditionState;

  constructor(props: IConditionProps) {
    super(props);
    this.state = {condition: props.condition};     
  }

  public autoAdvance(): boolean {
    let condition: ICondition = this.state.condition;
    if (!condition.complete) {
      if (condition.variable.functions && !condition.function) {
        if (condition.variable.functions.length > 1) { 
          condition.function = {
            displayName: null,
            name: null,
            editting: true
          };
          return true;
        } else {
          //this.functionSelected(condition.variable.functions[0]);
        }
      } else if (!condition.operator) {
        if (condition.variable.operators.length > 1) {
          condition.operator = {
            displayName: null,
            name: null,
            type: null,
            editting: true
          };
          return true;
        } else {
          this.operatorSelected(condition.variable.operators[0]);          
        }       
      } else if (condition.operator.type === 'unary' || condition.operator.type === 'binary') {
        let operand: IOperand = condition.operator.operands[0];
        let operandSpecified: boolean = (operand.type === 'list' && !!operand.value && operand.value.length > 0)  || (!!operand.value); 
          
        if (!operandSpecified) {
          if (condition.variable.defaultValue) {
            this.operandSelected(condition.operator.operands[0], condition.variable.defaultValue);
          } else {
            operand.editting = true;
            return true;
          }
        } else {
          operand.editting = false;
          if (condition.operator.type === 'binary') {
            if (!condition.operator.operands[1].value) {
              condition.operator.operands[1].editting = true;
              return true;
            } else {
              condition.operator.operands[1].editting = false;
              condition.complete = true;
            }
          } else {
            condition.complete = true;
          }
        }
      } else if (condition.operator.type === 'nullary') {
        condition.complete = true;
      }
    }

    return false;
  }


  public render(): JSX.Element {
    return (
      <div className="condition-container">
        <span className="logical-operator">
          {this.state.condition.index === 0? 'IF' : this.state.condition.logicalOperator}
        </span>
        <div className="variable-wrapper">
        { !this.state.condition.variable.editting && 
            <span className="variable">
              {this.state.condition.variable.displayName}
            </span>
        } 
        { 
          this.state.condition.variable.editting &&
          <PopOver includeButton={false} width={this.props.builderConfig.variableSelectorSize}>
            <SingleSelectList items={this.props.builderConfig.variables} itemSelected={this.variableSelected.bind(this)}/>
          </PopOver>
        }           
        </div>
        { this.state.condition.variable.name && 
          <div className="operator-wrapper">
          {!this.state.condition.operator.editting && 
            <span className={'operator' + this.state.condition.variable.operators.length? ' clickable' : '' } onClick={this.operatorClicked.bind(this)}>
              {this.state.condition.operator.displayName || '...'}
            </span>
          } 
          {this.state.condition.operator.editting && 
            <PopOver includeButton={false} width={this.state.condition.variable.operatorSelectorSize}>
              <SingleSelectList items={this.state.condition.variable.operators} itemSelected={this.operatorSelected.bind(this)}/>
            </PopOver>
          } 
        </div>
        }
        { this.state.condition.operator && 
          this.state.condition.operator.name &&  
          !this.state.condition.operator.editting && 
          <div className="operand-wrapper">
            {!this.state.condition.operator.operands[0].editting &&
              <span className="value-tokens clickable" onClick={this.operandClicked.bind(this, this.state.condition.operator.operands[0])}>
                { this.state.condition.operator.operands[0].type === 'list' && this.state.condition.operator.operands[0].value.map((v: any, index: number) => 
                <span className="operand-value" key={v.name}>{index > 0? ', ': ''}{v.displayName || v}</span>
                )}
                {
                  this.state.condition.operator.operands[0].type !== 'list' &&
                    <span className="operand-value">{this.state.condition.operator.operands[0].value}</span>
                } 
                {
                  this.state.condition.operator.operands[0].unit && 
                    <span className="unit">{this.state.condition.operator.operands[0].unit}</span>
                }   
              </span>                       
            }
            {
              this.state.condition.operator.operands[0].editting && this.state.condition.operator.operands[0].type === 'list' &&
              <PopOver includeButton={true} width={this.state.condition.variable.operandSelectorSize} okPressed={this.operandSelected.bind(this, this.state.condition.operator.operands[0], null)}>
                <MultiSelectList items={this.state.condition.variable.possibleValues}/>
              </PopOver>
            }
            {
              this.state.condition.operator.operands[0].editting && this.state.condition.operator.operands[0].type === 'number' &&
              <div className="input-container">
                <input type="number"  className="operand-input" value={this.state.condition.operator.operands[0].value} 
                      onBlur={this.handleInputBlur.bind(this)}
                      onChange={this.handleInputChange.bind(this)}
                      onKeyDown={this.handleKeyDown.bind(this)}/> 
                {                  
                  this.state.condition.operator.units && 
                  <ReactDropdown options={this.state.condition.operator.units} 
                    value={this.state.condition.operator.operands[0].unit}
                    onChange={this.unitSelected.bind(this)}/>                   
                }      
              </div>                          
            }            
          </div>
        }        
      </div>      
    );
  }

  handleInputBlur(event: FocusEvent): void {
    if (this.state.condition.operator.operands[0].value) {
      this.operandSelected(this.state.condition.operator.operands[0], this.state.condition.operator.operands[0].value);
    }
  }

  handleInputChange(event: InputEvent): void {
    this.state.condition.operator.operands[0].value = (event.target as any).value;   
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.operandSelected(this.state.condition.operator.operands[0], this.state.condition.operator.operands[0].value);
    }
  }

  public operandClicked(operand: IOperand): void {
    operand.editting = true;
    this.setState(this.state);
  }

  public operandSelected(operand: IOperand, value: any): void {
    let selected: any[] = value || _filter(this.state.condition.variable.possibleValues, {checked: true});
    operand.value = selected;
    operand.editting = false;
    this.state.condition.complete = true;
    this.props.onConditionComplete(this.state.condition);
    this.setState(this.state);
  }

  public operatorClicked(): void {
    this.state.condition.operator.editting = true;
    this.setState(this.state);
  }

  public operatorSelected(selected: IOperator): void {
    let operator: IOperator = Object.assign({}, selected);

    operator.editting = false;
    let oldOperator: IOperator = this.state.condition.operator;
    if (oldOperator && oldOperator.name && oldOperator !== selected) {
      operator.operands = oldOperator.operands;
    } 
    this.state.condition.operator = operator;
    this.setState(this.state);
    this.autoAdvance();
  }

  public unitSelected(unit: any): void {
    this.state.condition.operator.operands[0].unit = unit.value;
    this.state.condition.operator.operands[0].editting = false;
    this.setState(this.state);
  }

  public variableSelected(selected: IConditionVariable): void {
    let variable: IConditionVariable = Object.assign({}, selected);
    
    variable.editting = false;
    this.state.condition.variable = variable;
    this.setState(this.state); 
    this.autoAdvance();
  }
}