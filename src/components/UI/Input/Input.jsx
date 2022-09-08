import React, { Component } from 'react';
import s from './Input.module.css';

export default class Input extends Component {
  render() {
    return (
      <input
        className={s.input}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      ></input>
    );
  }
}
