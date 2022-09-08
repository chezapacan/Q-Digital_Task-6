import React, { Component } from 'react';
import s from './Container.module.css';

export default class Container extends Component {
  render() {
    return <div className={s.container}>{this.props.children}</div>;
  }
}
