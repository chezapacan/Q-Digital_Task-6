import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class RequireAuth extends Component {
  render() {
    if (!localStorage.getItem('token')) {
      return <Navigate to='/auth' />;
    }
    return this.props.children;
  }
}
