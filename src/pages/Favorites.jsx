import React, { Component } from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../css/Favorites.css';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoritesSongs: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const savedSongs = await getFavoriteSongs();

    this.setState({
      isLoading: false,
      favoritesSongs: savedSongs,
    });
  }

  render() {
    const { favoritesSongs, isLoading } = this.state;
    return (
      <>
        <div className="allPageFavorites">
          <Header />
          <h1 className="favoriteTitle"> Músicas Favoritas </h1>
        </div>
        <div data-testid="page-favorites" className="page-favorites">
          {isLoading ? (
            <Loading />
          ) : (

            favoritesSongs.map((music) => (<MusicCard
              key={ music.collectionName }
              music={ music }
              id={ music.trackId }
            />))

          )}

        </div>
      </>
    );
  }
}

export default Favorites;
