import React, { Component } from 'react';
import s from './WhiteBox.module.css';

export default class WhiteBox extends Component {
  render() {
    return <div className={s.wrapper}>{this.props.children}</div>;
  }
}
