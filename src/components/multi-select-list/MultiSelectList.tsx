import * as React from 'react';
import { CheckBox } from '../checkbox/CheckBox';
import { IListItem } from '../single-select-list/SingleSelectList';

export interface IMultiSelectListProps {
  items: IListItem[];
}

export interface IMultiSelectListState {

}

export class MultiSelectList extends React.Component<IMultiSelectListProps, IMultiSelectListState> {
  constructor(props: IMultiSelectListProps) {
    super(props);
    for (let item of props.items) {
      if (item.checked === undefined) {
        item.checked = false;
      }
    }
  }

  itemChecked(item: IListItem, checked: boolean): void {
    item.checked = checked;
  }

  public render(): JSX.Element {
    let listItems: JSX.Element[] = this.props.items.map((item): JSX.Element => 
    <div className="list-item" key={item.code || item.name}> 
      <CheckBox id={item.name} label={item.displayName} checked={item.checked} onChange={this.itemChecked.bind(this, item)}/>        
    </div>
  ); 
  return (
    <div className="list-container">
      {listItems}
    </div>
  )
  }
}