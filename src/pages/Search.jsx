import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    artist: '',
    savedArtistName: '',
    savedAlbumName: '',
    isLoading: false,
    arrayOfArtist: [],
    errorMessage: false,
  };

  componentDidMount() {
    const { savedAlbumName } = this.state;
    localStorage.setItem('savedAlbumName', savedAlbumName);
  }

  onButtonClick = async () => {
    const { artist } = this.state;
    this.setState({
      isLoading: true,
    });
    const json = await searchAlbumsAPI(artist);
    const validation = json.length <= 1;

    this.setState({
      artist: '',
      isLoading: false,
      savedArtistName: artist,
      savedAlbumName: '',
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

  handleLink = (event) => {
    const { id } = event.target;

    this.setState({
      savedAlbumName: id,
    });
  };

  render() {
    const { artist, isLoading, savedArtistName, arrayOfArtist,
      errorMessage, savedAlbumName } = this.state;
    localStorage.setItem('savedAlbumName', savedAlbumName);

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
                <li key={ albums.collectionName }>{albums.artistName}</li>
                <Link
                  data-testid={ `link-to-album-${albums.collectionId}` }
                  id={ albums.collectionId }
                  to={ `/album/${albums.collectionId}` }
                  onClick={ this.handleLink }
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
