import * as React from 'react';
import {Condition} from '../condition/Condition';
import { ICondition, IOperand, IResponse, IResponseActionConfig, IRuleBuilderConfig } from '../definitions';
import { PopOver } from '../pop-over/PopOver';
import { SingleSelectList } from '../single-select-list/SingleSelectList';

export interface IRuleBuilderProps {
  conditions: ICondition[];
  builderConfig: IRuleBuilderConfig;
  response: IResponse;
}

export interface IRuleBuilderState {
  conditions: ICondition[];
  conditionsSpecified: boolean;
  response: IResponse;
}

export default class RuleBuilder extends React.Component<IRuleBuilderProps, IRuleBuilderState> {
  state: IRuleBuilderState;
  constructor(props: any) {
    super(props);
    this.state = {conditions: props.conditions, response: props.response, conditionsSpecified: false};
    this.init();
  }

  public init(): void {
    if (this.state.conditions.length > 0) { 
      for (let c of this.state.conditions) {
        if (!c.variable.name) {
          c.variable.editting = true;
          break;
        }
      }
    } else {
      this.state.conditions.push({
        index: 0,
        variable: {
          name: null,
          displayName: null,
          editting: true
        },
        logicalOperator: 'and'
      });
    }
  }

  public addAndCondition(): void {
    let index: number = this.state.conditions.length;
    this.state.conditions.push({
      index: index,
      variable: {
        name: null,
        displayName: null,
        editting: true
      },
      logicalOperator: 'and'
    });
    this.setState(this.state);
  }

  public onConditionComplete(c: ICondition): void {
    this.setState(this.state);
  }

  public onThenClicked(): void {
    this.state.conditionsSpecified = true;
    this.state.response.editting = true;
    this.setState(this.state);
  }

  public responseClicked(): void {
    this.state.response.editting = true;
    this.setState(this.state);
  }

  public responseSelected(response: IResponseActionConfig): void {
    this.state.response.value = response;
    this.state.response.editting = false;
    this.setState(this.state);
  }

  public showButtons(): boolean {
    let condition: ICondition = this.state.conditions[this.state.conditions.length - 1];
    return condition.complete && !this.state.conditionsSpecified;
  }

  
  public render(): any {
    const conditions: JSX.Element[] = this.state.conditions.map((c: ICondition) => {
      return (
        <Condition key={c.index} condition = {c} 
          builderConfig={this.props.builderConfig} onConditionComplete={this.onConditionComplete.bind(this)}></Condition>
      );
    });
    return (
      <section className="rule-builder-main">
        <div className="rule-builder-outer">
          <div className="rule-builder-content">
            <div className="conditions-container">
              {conditions} 
            </div>   
            { this.state.conditionsSpecified &&          
              <div className="response-container">
                <span className="then logical-operator">THEN</span>
                <div className="response-wrapper">
                  
                  {
                    !this.state.response.editting && 
                    <span className="response clickable" onClick={this.responseClicked.bind(this)}>
                      {this.state.response.value.displayName || 'Select Response'}
                      </span>
                  }
                  {
                    this.state.response.editting && 
                    <PopOver includeButton={false} width={this.props.builderConfig.responseSelectorSize}>
                      <SingleSelectList items={this.props.builderConfig.responseConfigs} itemSelected={this.responseSelected.bind(this)}/>
                    </PopOver>
                  }
                </div>
              
              
              </div>    
            }         
          </div>
          {
            this.showButtons() && 
            <div className="button-container">
              <span>
                <button className="button outline primary tiny and" type="button" onClick={this.addAndCondition.bind(this)}>AND
                </button>
              
                <button className="button outline primary tiny then" type="button" onClick={this.onThenClicked.bind(this)}>THEN
                </button>
              </span>
            </div>
          }
          
        </div>
      </section>
    );
  }
}
