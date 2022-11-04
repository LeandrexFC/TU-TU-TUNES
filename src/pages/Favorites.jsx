import React, { Component } from 'react';
import Header from '../Components/Header';

class Favorites extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites" />
      </>
    );
  }
}

export default Favorites;
