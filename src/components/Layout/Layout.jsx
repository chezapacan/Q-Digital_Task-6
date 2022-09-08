import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Container from '../UI/Container/Container';

export default class Layout extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Container>
          <Outlet />
        </Container>
      </>
    );
  }
}
