import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const quantityUnits = ['g', 'Kg', 'Oz', 'Lb', 'Can'];

class ListItemInputControls extends Component {
  constructor(props) {
    console.log('INPUT CONTROLS', props);
    super(props);
    if (props.activeItem) {
      this.state = { ...props.activeItem };
    } else {
      this.state = { itemName: '', itemQuantity: '', itemQuantityUnit: '' };
    }
  }

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 8, marginRight: 8 }}>
            <TextField
              id="item_name"
              placeholder="Enter a new item"
              label="Item Name"
              fullWidth
              value={this.state.itemName}
              onChange={this.handleChange('itemName')}
            />
          </div>
          <div style={{ display: 'flex', flex: 2 }}>
            <TextField
              style={{ marginRight: 8 }}
              type="number"
              id="item_quantity"
              label="Quantity"
              fullWidth
              value={this.state.itemQuantity}
              onChange={this.handleChange('itemQuantity')}
            />
            <TextField
              style={{ marginRight: 8 }}
              select
              label="Unit"
              id="unit"
              fullWidth
              value={this.state.itemQuantityUnit}
              onChange={this.handleChange('itemQuantityUnit')}
            >
              <MenuItem key={''} value="">
                <em>No Unit</em>
              </MenuItem>
              {quantityUnits.map(unit => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}
        >
          <Button variant="contained">Reset</Button>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => this.props.onSubmit({ ...this.state })}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default ListItemInputControls;
