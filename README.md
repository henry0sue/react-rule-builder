# React Rule Builder
> A highly configurable, free-flow rule builder component developed with ReactJS

## Screenshot
![alt text](https://github.com/henry0sue/react-rule-builder/blob/main/react-rule-builder.png?raw=true)

## Live Demo
https://henry0sue.github.io/


## Installation
npm install @henry_sue/react-rule-builder --save

## Usage
````typescript

const ruleBuilderConfig: IRuleBuilderConfig = {
  variables: [
    {
      name: 'activity',
      displayName: 'Activity',
      operators: [
        {
          displayName: 'is',
          name: 'is',
          type: 'unary',
          operands: [
            {
              type: 'object'
            }
          ]
        },
        {
          displayName: 'is not',
          name: 'is_not',
          type: 'unary',         
          operands: [
            {
              type: 'object'
            }
          ]
        },
      ],             
      complex: false,
      possibleValues: [{
          name: 'Upload',
          displayName: 'Upload'
        }, {
          name: 'Download',
          displayName: 'Download'
        }
      ],       
      promptText: 'Select activities',
      operatorSelectorSize: '80px',
      operandSelectorSize: '150px'   
    },
    {
      name: 'file-size',
      displayName: 'File Size',
      operators: [{
        displayName: 'is less than',
        name: '<',
        type: 'unary',
        units: ['KB', 'MB', 'GB'],
        operands: [
          {
            type: 'number',
            unit: 'KB',
            value: ''
          }
        ]
      }, {
        displayName: 'is greater than',
        name: '>',
        type: 'unary',
        units: ['KB', 'MB', 'GB'],
        operands: [
          {
            type: 'number',
            unit: 'KB',
            value: ''
          }
        ]
      },
    ],
      operatorSelectorSize: '200px',
      operandSelectorSize: '150px'                 
    }
  ],
  variableSelectorSize: '120px',
  responseConfigs: [
    {
      name: 'block',
      displayName: 'Block'
    },
    {
      name: 'allow',
      displayName: 'Allow'
    },
    {
      name: 'notify',
      displayName: 'Notify Admin'
    }
  ],
  responseSelectorSize: '120px'
}

const conditions: ICondition[] = [{
      index: 0,
      logicalOperator: 'and',
      variable: {
        name: null,
        displayName: null
      }
    }];
    const response: IResponse = {
      value: {
        name: null,
        displayName: null
      },
      editting: false
    };

  return (
    <div className="demo-container">
      <RuleBuilder conditions={conditions} builderConfig={ruleBuilderConfig} response={response}/>
      
    </div>        
  );
````

---

## See also
* [React Webpack Babel Starter](https://github.com/vikpe/react-webpack-babel-starter)
* [Snowpack](https://github.com/snowpackjs/snowpack)
* [Create React App](https://github.com/facebook/create-react-app)
* [Isomorphic Webapp Starter](https://github.com/vikpe/isomorphic-webapp-starter)
