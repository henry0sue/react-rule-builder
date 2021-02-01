import * as React from 'react';

export interface IPopOverProps {
  includeButton: boolean;
  width?: string;
  okPressed?: () => void;
}

export interface IPopOverState {
  
}

export class PopOver extends React.Component<IPopOverProps, IPopOverState> {
  state: IPopOverState;
  constructor(props: IPopOverProps) {
    super(props);
    this.state = {popOverVisible: false};
  }

  public render(): JSX.Element {
    return (      
      <div className="popover selection-container" style={{width: this.props.width}}>
        {this.props.children}        
        { this.props.includeButton &&         
          <div className="button-bar">
            <span className="ok clickable" onClick={this.props.okPressed}>
              OK
            </span>
          </div>
        }
      </div>
    );
  }
}