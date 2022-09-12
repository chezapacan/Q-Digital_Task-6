import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class RequireUnauth extends Component {
  render() {
    if (localStorage.getItem('token')) {
      return <Navigate to='/profile' />;
    }
    return this.props.children;
  }
}
