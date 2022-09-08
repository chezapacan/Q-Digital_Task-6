import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Title from '../UI/Title/Title';
import WhiteBox from '../UI/WhiteBox/WhiteBox';

export default class RegisterForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  handleClickRegister = async () => {
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.password === this.state.password_confirmation
    ) {
      const response = await fetch(
        'https://internsapi.public.osora.ru/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(this.state),
        }
      );
      const results = await response.json();
      console.log(results);
    } else {
      alert('Не заполнены все поля или ');
    }
  };
  handleChangeName = (e) => {
    this.state.name = e.target.value;
  };
  handleChangeEmail = (e) => {
    this.state.email = e.target.value;
  };
  handleChangePassword = (e) => {
    this.state.password = e.target.value;
  };
  handleChangePasswordConf = (e) => {
    this.state.password_confirmation = e.target.value;
  };
  render() {
    return (
      <WhiteBox>
        <Title text='Sign up' />
        <Input placeholder='Name' onChange={this.handleChangeName} />
        <Input placeholder='Email' onChange={this.handleChangeEmail} />
        <Input placeholder='Password' onChange={this.handleChangePassword} />
        <Input
          placeholder='Confirm password'
          onChange={this.handleChangePasswordConf}
        />
        <Button text='REGISTER' onClick={this.handleClickRegister} />
      </WhiteBox>
    );
  }
}
