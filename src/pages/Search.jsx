import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  state = {
    artist: '',
  };

  onInputChange = (event) => {
    const { name, type } = event.target;
    const value = type === 'checkbox' ? checkbox : event.target.value;
    console.log(name);
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const { artist } = this.state;
    const validation = artist.length > 1;

    return validation;
  };

  render() {
    const { artist } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              data-testid="search-artist-input"
              placeholder="Artista:"
              type="text"
              name="artist"
              value={ artist }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ !this.validateForm() }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
