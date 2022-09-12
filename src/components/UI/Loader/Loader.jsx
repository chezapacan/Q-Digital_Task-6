import React, { Component } from 'react';
import s from './Loader.module.css';

export default class Loader extends Component {
  render() {
    return <span className={s.loader}></span>;
  }
}
