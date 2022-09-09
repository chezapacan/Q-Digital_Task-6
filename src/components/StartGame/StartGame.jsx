import React, { Component } from 'react';
import s from './StartGame.module.css';
import Title from '../UI/Title/Title';
import WhiteBox from '../UI/WhiteBox/WhiteBox';
import Button from '../UI/Button/Button';

export default class StartGame extends Component {
  state = {
    diff: '1',
  };

  handleClickStart = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(
      'https://internsapi.public.osora.ru/api/game/play',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          type_hard: +this.state.diff,
          type: 1,
        }),
      }
    );
    const results = await response.json();
    console.log(results);
  };
  handleChangeDiff = (e) => {
    this.state.diff = e.target.value;
  };

  render() {
    return (
      <div className={s.wrapper}>
        <WhiteBox>
          <Title text='Difficulty level' />
          <select className={s.select} onChange={this.handleChangeDiff}>
            <option value='1'>Easy</option>
            <option value='2'>Hard</option>
          </select>
          <Button text='START' onClick={this.handleClickStart} />
        </WhiteBox>
      </div>
    );
  }
}
