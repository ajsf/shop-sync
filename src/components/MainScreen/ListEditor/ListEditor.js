import React, { Component, Fragment } from 'react';

import TitleComponent from './TitleComponent';
import ItemsComponent from './ItemsComponent';
import ListItemInputControls from './ListItemInputControls';

class ListEditor extends Component {
  state = { editing: false };

  onSubmit = item => {
    item['itemQuantity'] = Number(item['itemQuantity']);
    if (this.props.activeItemId) {
      this.props.updateListItem(
        this.props.listId,
        this.props.activeItemId,
        item,
      );
    } else {
      this.props.createListItem(this.props.listId, item);
    }
  };

  render() {
    const { list, activeItemId } = this.props;
    const activeItem =
      list.items && activeItemId ? list.items[activeItemId] : null;

    const items = list.items ? list.items : [];

    console.log('LIST EDITOR', activeItem);
    return (
      <Fragment>
        <TitleComponent
          title={list.title}
          setTitle={newTitle => {
            this.setState({ editing: false });

            this.props.setListTitle(this.props.listId, newTitle);
          }}
          editing={this.state.editing}
          setTitleEditMode={(bool) => {
            this.setState({ editing: bool });
          }}
        />
        <ItemsComponent
          items={items}
          selectItem={this.props.selectItem}
          deleteItem={itemId =>
            this.props.deleteListItem(this.props.listId, itemId)
          }
          activeItemId={activeItemId}
        />
        <ListItemInputControls
          key={this.props.activeItemId}
          activeItem={activeItem}
          onSubmit={this.onSubmit}
          onCancel={() => this.props.selectItem()}
        />
      </Fragment>
    );
  }
}

export default ListEditor;
