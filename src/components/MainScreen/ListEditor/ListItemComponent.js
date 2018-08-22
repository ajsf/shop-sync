import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/icons/Clear';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  root: {
    flex: 1,
  },
};

const ListItemComponent = props => {
  console.log('ITEM', props, styles);
  const { classes } = props;
  const { itemName, itemQuantity, itemQuantityUnit } = props.item;
  let text = '';
  if (itemQuantity > 0) {
    text = `${itemQuantity} ${itemQuantityUnit} ${itemName}`;
  } else {
    text = `${itemQuantityUnit} ${itemName}`;
  }

  return (
    <Card>
      <div style={{ display: 'flex' }}>
        <Checkbox />
        <ButtonBase onClick={props.selectItem} classes={{ root: classes.root }}>
          <Typography align="center">{text}</Typography>
        </ButtonBase>
        <IconButton onClick={props.deleteItem}>
          <Icon />
        </IconButton>
      </div>
    </Card>
  );
};

export default withStyles(styles)(ListItemComponent);
