import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';

const TitleInputControls = props => {
  console.log('IN CONTR', props);
  return (
    <Fragment>
      <div style={{ flex: 1 }}>
        <form onSubmit={props.onSubmit}>
          <TextField
            id="list_title"
            placeholder="Enter a title..."
            label="Title"
            fullWidth
            value={props.newTitle}
            onChange={props.onChange}
          />
        </form>
      </div>
      <IconButton onClick={props.setTitle}>
        <SaveIcon />
      </IconButton>
      <IconButton onClick={props.cancel}>
        <CancelIcon />
      </IconButton>
    </Fragment>
  );
};

export default TitleInputControls;
