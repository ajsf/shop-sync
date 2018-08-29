import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';

import TitleInputControls from './TitleInputControls';

class TitleComponent extends Component {
  state = { newTitle: this.props.title };

  handleChange = event => {
    this.setState({
      newTitle: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('HANDILING SUBMIT');
    this.setTitle();
  };

  setTitle = () => {
    this.props.setTitle(this.state.newTitle);
  };

  render() {
    const titleField =
      this.props.title === '' || this.props.editing ? (
        <TitleInputControls
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          newTitle={this.state.newTitle}
          setTitle={this.setTitle}
          cancel={() => this.props.setTitleEditMode(false)}
        />
      ) : (
        <ButtonBase
          onClick={() => this.props.setTitleEditMode(true)}
          style={{ width: '90%' }}
        >
          <Typography variant="title">{this.props.title}</Typography>
        </ButtonBase>
      );
    return (
      <div style={{ display: 'flex', marginBottom: 16 }}>
        {titleField}
        <IconButton style={{ marginLeft: 'auto', alignSelf: 'center' }}>
          <ShareIcon />
        </IconButton>
      </div>
    );
  }
}

export default TitleComponent;
