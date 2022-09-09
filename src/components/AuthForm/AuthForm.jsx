import React, { Component } from 'react';
import s from './AuthForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Title from '../UI/Title/Title';
import WhiteBox from '../UI/WhiteBox/WhiteBox';
import { Link } from 'react-router-dom';
import { withNavigation } from '../hocs/withNavigation';

class AuthForm extends Component {
  state = {
    email: '',
    password: '',
  };
  handleClickEnter = async () => {
    if (this.state.email && this.state.password) {
      const response = await fetch(
        'https://internsapi.public.osora.ru/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(this.state),
        }
      );
      const results = await response.json();
      if (results.status) {
        localStorage.setItem('access_token', results.data.access_token);
        this.props.navigate('/');
      } else {
        alert('Неправильный email или пароль');
      }
    } else {
      alert('Заполните все поля');
    }
  };
  handleChangeEmail = (e) => {
    this.state.email = e.target.value;
  };
  handleChangePassword = (e) => {
    this.state.password = e.target.value;
  };
  render() {
    return (
      <div className={s.wrapper}>
        <WhiteBox>
          <Title text='Sign in' />
          <Input placeholder='Email' onChange={this.handleChangeEmail} />
          <Input placeholder='Password' onChange={this.handleChangePassword} />
          <Button text='ENTER' onClick={this.handleClickEnter} />
          <p>
            or
            <span>
              <Link to='/register'> register</Link>
            </span>
          </p>
        </WhiteBox>
      </div>
    );
  }
}

export default withNavigation(AuthForm);
