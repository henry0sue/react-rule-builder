// These types in combination with variable's "possibleValues" determine what kind of UI is used to take
// operand values
// 'number' - an input box will be used
// 'object' - (possibleValues not defined) an input box will be used
//          - (possibleValues defined as array ) a single select list will be used          
// 'list'   - (possibleValues not defined, subType is "comma_separated") a textarea will be used
//          - (possibleValues not defined, subType is not "comma_separated") multi-input-form component will be used
//          - (possibleValues defined as array) a multi-select list will be used
// 'custom' - (variable not "complex") the consumer of this library needs to provide a component called "customOperandInputForm"
//          - (variable marked "complex") the consumer of this libraray needs to provide a component called "customOperandModal"
export type OPERAND_TYPE = 'number' | 'object' | 'date' | 'list' | 'custom';

export interface IOperand {
  type: OPERAND_TYPE;
  // Additional type information can be stored in 'subType'
  subType?: string;
  value?: any;
  unit?: string;  
  editting?: boolean;
  // Validator is only used for operands that take manual input
  validator?: (value: string) => string;     
  validationError?: string;
}

// 'nullary' takes no operands
// 'unary' takes one operand
// 'binary' takes two operands
export type OPERATOR_TYPE = 'nullary' | 'unary' | 'binary';

export interface IOperator {  
  name: string;
  displayName: string;
  type: OPERATOR_TYPE;
  // Example: 'warn' to show the operator in red
  style?: string;    
  operands?: IOperand[]; 
  defaultOperands?: IOperand[];  
  units?: string[];
  editting?: boolean;
}

export interface IAggregateFunction {  
  name: string;
  displayName: string;
  style?: string;  
  operators?: IOperator[];
  editting?: boolean;
  type?: OPERATOR_TYPE
}

export interface IConditionVariable {
  name: string;
  displayName: string;
  singleUse?: boolean;
  editting?: boolean;
  id?: string;
  operators?: IOperator[];
  functions?: IAggregateFunction[];  
  complex?: boolean;
  possibleValues?: any[]; 
  defaultValue?: any;
  promptText?: string;  
  placeHolderText?: string;   
  functionSelectorSize?: string;
  operatorSelectorSize?: string;
  operandSelectorSize?: string; 
  disabled?: boolean;
}

export interface IRuleBuilderConfig {
  variables: IConditionVariable[];
  variableSelectorSize?: string;  
  responseConfigs: IResponseActionConfig[];
  responseSelectorSize?: string;
}

export type LOGICAL_OPERATOR = 'and' | 'or';

export interface ICondition {    
  index: number;
  variable?: IConditionVariable;
  function?: IAggregateFunction;
  operator?: IOperator;  
  complete?: boolean;
  parent?: ICondition;
  logicalOperator: LOGICAL_OPERATOR;
  nestedConditions?: ICondition[];
  useCustomRenderer?: boolean;
  indented?: boolean;
}

export interface IResponse {
  value: IResponseActionConfig;
  editting: boolean;
}

export interface IRule {
  id?: number;
  conditions: ICondition[];
  complete?: boolean;
  name?: string;
  enabled?: boolean;
  response: IResponse;
}

export interface IResponseActionConfig {  
  name: string;
  displayName: string;      
}