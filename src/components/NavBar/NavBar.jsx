import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';

export default class NavBar extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.navbar}>
          <Link to='/'>
            <p className={s.title}>Game-test</p>
          </Link>
          <Link to={localStorage.getItem('token') ? '/profile' : '/auth'}>
            <img src='/svg/profile.svg' alt='' />
          </Link>
        </div>
      </div>
    );
  }
}
