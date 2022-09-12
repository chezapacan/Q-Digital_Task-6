import React, { Component } from 'react';
import s from './ProfileInfo.module.css';
import { withNavigation } from '../hocs/withNavigation';
import Button from '../UI/Button/Button';
import Text from '../UI/Text/Text';
import Title from '../UI/Title/Title';
import WhiteBox from '../UI/WhiteBox/WhiteBox';

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      lastPoints: 0,
    };
  }
  async componentDidMount() {
    const response = await fetch(
      'https://internsapi.public.osora.ru/api/game/lobby',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    );
    const results = await response.json();
    if (results.status) {
      this.setState({
        points: results.data.points,
        lastPoints: results.data.last_points,
      });
    } else {
      alert(results.errors);
    }
  }
  handleClickLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('email', '');
    this.props.navigate('/auth');
  };

  render() {
    return (
      <div className={s.wrapper}>
        <WhiteBox>
          <Title text='Profile' />
          <Text text={localStorage.getItem('email')} />
          <div className={s.points}>
            <div className={s.pointsWrapper}>
              <Text text='Points: ' />
              <Text text={this.state.points} bold />
            </div>
            <div className={s.pointsWrapper}>
              <Text text='Last points: ' />
              <Text text={this.state.lastPoints} bold />
            </div>
          </div>
          <Button text='LOGOUT' onClick={this.handleClickLogout} />
        </WhiteBox>
      </div>
    );
  }
}

export default withNavigation(ProfileInfo);
