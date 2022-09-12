import React, { Component } from 'react';
import s from './Text.module.css';

export default class Text extends Component {
  render() {
    return (
      <p className={`${s.text} ${this.props.bold ? s.bold : ''}`}>
        {this.props.text}
      </p>
    );
  }
}
