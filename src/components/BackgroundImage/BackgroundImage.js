import { Component } from 'react';
import classes from './BackgroundImage.css';

class BackgroundImage extends Component {
  componentDidMount() {
    document.body.classList.toggle(classes.BackgroundImageClass);
  }

  componentWillUnmount() {
    document.body.classList.remove(classes.BackgroundImageClass);
  }

  render() {
    return this.props.children;
  }
}

export default BackgroundImage;
