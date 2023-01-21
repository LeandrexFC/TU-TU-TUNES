import React, { Component } from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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
    console.log(savedSongs);
    // const test = savedSongs.map((songs) => songs.artistName);
    this.setState({
      isLoading: false,
      favoritesSongs: savedSongs,
    });
  }

  render() {
    const { favoritesSongs, isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
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
