import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    artist: '',
    savedArtistName: '',
    isLoading: false,
    arrayOfArtist: [],
    errorMessage: false,
  };

  onButtonClick = async () => {
    const { artist } = this.state;
    this.setState({
      isLoading: true,
    });
    const json = await searchAlbumsAPI(artist);
    console.log(await searchAlbumsAPI('anitta'));
    const validation = json.length <= 1;

    this.setState({
      artist: '',
      isLoading: false,
      savedArtistName: artist,
      arrayOfArtist: json,
      errorMessage: validation,
    });
  };

  onInputChange = (event) => {
    const { name, type } = event.target;
    const value = type === 'checkbox' ? checkbox : event.target.value;
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
    const { artist, isLoading, savedArtistName, arrayOfArtist,
      errorMessage } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          {!isLoading ? (
            <form>
              <input
                data-testid="search-artist-input"
                placeholder="Artista:"
                type="text"
                name="artist"
                value={ artist }
                onChange={ this.onInputChange }
              />
              <input
                data-testid="search-artist-button"
                type="button"
                value="Pesquisar"
                disabled={ !this.validateForm() }
                onClick={ this.onButtonClick }
              />
            </form>
          ) : (
            <>
              <div>
                <input
                  data-testid="search-artist-input"
                  placeholder="Artista:"
                  type="hidden"
                  name="artist"
                  value={ artist }
                  onChange={ this.onInputChange }
                />
                <input
                  data-testid="search-artist-button"
                  type="hidden"
                  value="Pesquisar"
                  disabled={ !this.validateForm() }
                  onClick={ this.onButtonClick }
                />
              </div>
              <div>
                <Loading />
              </div>
            </>
          )}
          {savedArtistName.length > 1 ? (
            <p>
              Resultado de álbuns de:
              {'  '}
              {savedArtistName}
            </p>
          ) : (
            <>
            </>
          )}
        </div>
        {!errorMessage ? (
          <ul>
            {arrayOfArtist.map((albums) => (
              <>
                <li key={ albums.collectionId }>{albums.artistName}</li>
                <Link
                  data-testid={ `link-to-album-${albums.collectionId}` }
                  to={ `/album/${albums.collectionId}` }
                >
                  { albums.collectionName }

                </Link>
                <img src={ albums.artworkUrl100 } alt={ albums.artistName } />
              </>))}
          </ul>
        ) : (
          <p>
            Nenhum álbum foi encontrado
          </p>
        )}

      </div>
    );
  }
}

export default Search;
