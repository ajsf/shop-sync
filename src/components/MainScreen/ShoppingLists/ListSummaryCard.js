import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Link } from 'react-router-dom';

const styles = {};

const ListSummaryCard = props => {
  const { list } = props;
  const modifiedDate = moment(list.modifiedDate).format(
    'MMM Do YYYY, h:mm:ss a',
  );
  const link = `/list/${list.listId}`;
  return (
    <Card>
      <ButtonBase
        component={Link}
        to={link}
        onClick={() => {
          props.openList(list.listId);
        }}
      >
        <CardContent>
          <Typography>{list.title}</Typography>
          <Typography>{list.createdBy}</Typography>
          <Typography>{modifiedDate}</Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default withStyles(styles)(ListSummaryCard);
