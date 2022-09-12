import React, { Component } from 'react';
import s from './RegisterForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Title from '../UI/Title/Title';
import WhiteBox from '../UI/WhiteBox/WhiteBox';
import { withNavigation } from '../hocs/withNavigation';
import Loader from '../UI/Loader/Loader';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      loading: false,
    };
  }

  handleClickRegister = async () => {
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.password === this.state.password_confirmation
    ) {
      this.setState({
        loading: true,
      });
      const response = await fetch(
        'https://internsapi.public.osora.ru/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          }),
        }
      );
      const results = await response.json();
      if (results.status) {
        this.props.navigate('/auth');
      } else {
        alert(results.errors.email[0]);
      }
      this.setState({
        loading: false,
      });
    } else {
      alert('Не заполнены все поля или пароли не совпадают');
    }
  };

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
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

  handleChangePasswordConf = (e) => {
    this.setState({
      password_confirmation: e.target.value,
    });
  };

  render() {
    return (
      <div className={s.wrapper}>
        <WhiteBox>
          <Title text='Sign up' />
          <Input placeholder='Name' onChange={this.handleChangeName} />
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
          <Input
            type='password'
            placeholder='Confirm password'
            onChange={this.handleChangePasswordConf}
          />
          {!this.state.loading ? (
            <Button text='REGISTER' onClick={this.handleClickRegister} />
          ) : (
            <Loader />
          )}
        </WhiteBox>
      </div>
    );
  }
}

export default withNavigation(RegisterForm);
