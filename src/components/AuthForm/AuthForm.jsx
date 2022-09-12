import React, { Component } from 'react';
import s from './AuthForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Title from '../UI/Title/Title';
import WhiteBox from '../UI/WhiteBox/WhiteBox';
import { Link } from 'react-router-dom';
import { withNavigation } from '../hocs/withNavigation';
import Loader from '../UI/Loader/Loader';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  handleClickLogin = async () => {
    if (this.state.email && this.state.password) {
      this.setState({
        loading: true,
      });
      const response = await fetch(
        'https://internsapi.public.osora.ru/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        }
      );
      const results = await response.json();
      if (results.status) {
        localStorage.setItem('token', results.data.access_token);
        localStorage.setItem('email', this.state.email);
        this.props.navigate('/');
      } else {
        alert(
          typeof results.errors === 'string'
            ? results.errors
            : results.errors.email[0]
        );
      }
      this.setState({
        loading: false,
      });
    } else {
      alert('Заполните все поля');
    }
  };

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    return (
      <div className={s.wrapper}>
        <WhiteBox>
          <Title text='Sign in' />
          <Input
            type='email'
            placeholder='Email'
            onChange={this.handleChangeEmail}
          />
          <Input
            type='password'
            placeholder='Password'
            onChange={this.handleChangePassword}
          />
          {!this.state.loading ? (
            <Button text='LOGIN' onClick={this.handleClickLogin} />
          ) : (
            <Loader />
          )}

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
