import * as React from "react";
import { hot } from "react-hot-loader";
import * as _sortBy from 'lodash.sortby';

const reactLogo = require("../src/assets/img/react_logo.svg");
import "../src/assets/scss/RuleBuilder.scss";
import { ICondition, IResponse, IRuleBuilderConfig } from "../src/components/definitions";
import { RuleBuilder } from "../src/components/rule-builder/RuleBuilder";

const ruleBuilderConfig: IRuleBuilderConfig = {
  variables: [
    {
      name: 'service',
      displayName: 'Service Name',
      singleUse: true,
      operators: [
        {
          name: 'is',
          displayName: 'is in',          
          type: 'unary',
          operands: [
            {
              type: 'list'
            }
          ]
        },
        {
          name: 'is_not',
          displayName: 'is not in',       
          type: 'unary',        
          operands: [
            {
              type: 'list'
            }
          ]
        }
      ],     
      complex: true,
      possibleValues: _sortBy([
        {
          name: 'Dropbox',
          displayName: 'Dropbox'
        }, 
        {
          name: 'Google Drive',
          displayName: 'Google Drive'
        },
        {
          name: 'Salesforce',
          displayName: 'Salesforce'
        }, 
        {
          name: 'Office365',
          displayName: 'Office 365'
        },
        {
          name: 'Box',
          displayName: 'Box'
        },
        {
          name: 'Apple iCloud',
          displayName: 'Apple iCloud'
        },
        {
          name: 'Amazon S3',
          displayName: 'Amazon S3'
        }
      ], 'name'),         
      promptText: 'Select Services',
      operatorSelectorSize: '150px',
      operandSelectorSize: '250px'      
    },
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
              type: 'list'
            }
          ]
        },
        {
          displayName: 'is not',
          name: 'is_not',
          type: 'unary',         
          operands: [
            {
              type: 'list'
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
            unit: 'KB'
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
            unit: 'KB'
          }
        ]
      },
      {
        displayName: 'is between',
        name: 'between',
        units: ['KB', 'MB', 'GB'],
        type: 'binary',        
        operands: [
          {
            type: 'number',
            unit: 'KB'
          },
          {
            type: 'number',
            unit: 'KB'
          }
        ]
      }],
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

class DemoApp extends React.Component<Record<string, unknown>, undefined> {

  public render() {    

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
        <RuleBuilder conditions={conditions} builderConfig={ruleBuilderConfig} response={response}></RuleBuilder>
      </div>        
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(DemoApp);
