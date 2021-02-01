import * as React from 'react';

export interface IListItem {
  name: string;
  displayName: string;
  code?: string;
  disabled?: boolean;
  style?: string;
  checked?: boolean;
}

export interface ISingleSelectListProps {
  items: IListItem[];   
  itemSelected: (item: IListItem) => void;
}

export interface ISingleSelectListState {

}

export class SingleSelectList extends React.Component<ISingleSelectListProps, ISingleSelectListState> {
  constructor(props: ISingleSelectListProps) {
    super(props);    
  }

  itemClicked(item: IListItem): void {
    item.checked = true;
    this.props.itemSelected(item);
  }

  public render(): JSX.Element {
    let listItems: JSX.Element[] = this.props.items.map((item): JSX.Element => 
      <div className="list-item" key={item.code || item.name}>   
        <div className="single-select-wrapper">
          { item.disabled && 
            <div className="single-select-value select-value-disabled">
              {item.displayName}
            </div>
          }
          { !item.disabled && 
            <div className={`single-select-value ${item.style || ''}`} onClick={this.itemClicked.bind(this, item)}>
              {item.displayName}
            </div>
          }
        </div>
      </div>
    ); 
    return (
      <div className="list-container">
        {listItems}
      </div>
    )
  }
}