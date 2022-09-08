import React, { Component } from 'react';
import s from './Title.module.css';

export default class Title extends Component {
  render() {
    return <p className={s.title}>{this.props.text}</p>;
  }
}
