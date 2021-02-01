import * as React from 'react';

export interface ICheckBoxProps {
  checked: boolean;
  label: string;
  id: string;
  onChange: (checked: boolean) => void;
}

export interface ICheckBoxState {
  checked: boolean;
}

export class CheckBox extends React.Component<ICheckBoxProps, ICheckBoxState> {
  state: ICheckBoxState;
  constructor(props: ICheckBoxProps) {
    super(props);
    this.state = {checked: props.checked};
  }

  handleChange(): void {
    this.state.checked = !this.state.checked;
    this.setState(this.state);
    this.props.onChange(this.state.checked);
  }

  public render(): JSX.Element {
    return (
      <div className="checkbox-wrapper">
        <input type="checkbox" checked={this.state.checked} id={this.props.id} onChange={this.handleChange.bind(this)}/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    )
  }
}