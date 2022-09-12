import React, { Component } from 'react';
import s from './StartGame.module.css';
import Title from '../UI/Title/Title';
import WhiteBox from '../UI/WhiteBox/WhiteBox';
import Button from '../UI/Button/Button';
import Game from '../Game/Game';
import Loader from '../UI/Loader/Loader';

export default class StartGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diff: '1',
      gameStarted: false,
      data: {},
      loading: false,
    };
  }

  handleClickStart = async () => {
    const token = localStorage.getItem('token');
    this.setState({
      loading: true,
    });
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
    if (results.status) {
      this.setState({
        data: results.data,
        gameStarted: true,
      });
    }
    this.setState({
      loading: false,
    });
  };

  handleChangeDiff = (e) => {
    this.setState({
      diff: e.target.value,
    });
  };

  handleClickEnd = () => {
    this.setState({
      gameStarted: false,
    });
  };

  render() {
    if (!this.state.gameStarted) {
      return (
        <div className={s.wrapper}>
          <WhiteBox>
            <Title text='Difficulty level' />
            <select className={s.select} onChange={this.handleChangeDiff}>
              <option value='1'>Easy</option>
              <option value='2'>Hard</option>
            </select>
            {!this.state.loading ? (
              <Button text='START' onClick={this.handleClickStart} />
            ) : (
              <Loader />
            )}
          </WhiteBox>
        </div>
      );
    } else {
      return (
        <Game
          {...this.state.data}
          handleClickEnd={this.handleClickEnd}
          diff={this.state.diff}
        />
      );
    }
  }
}
