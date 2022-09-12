import React, { Component } from 'react';
import Title from '../components/UI/Title/Title';
import WhiteBox from '../components/UI/WhiteBox/WhiteBox';

export default class NotFound extends Component {
  render() {
    return (
      <WhiteBox>
        <Title text='Page not found' />
      </WhiteBox>
    );
  }
}
