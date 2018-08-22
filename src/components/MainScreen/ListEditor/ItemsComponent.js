import React from 'react';
import ListItemComponent from './ListItemComponent';

const ItemsComponent = props => {
  console.log('ITEMS COMP', props);
  const items = props.items
    ? Object.keys(props.items).map(itemId => {
        return (
          <ListItemComponent
            itemId
            key={itemId}
            item={props.items[itemId]}
            selectItem={() => props.selectItem(itemId)}
            deleteItem={() => props.deleteItem(itemId)}
          />
        );
      })
    : null;
  return <div style={{ flex: 1 }}>{items}</div>;
};

export default ItemsComponent;
