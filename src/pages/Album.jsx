import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    fullAlbum: [],
    savedAlbumName: '',
    savedArtistname: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const fullAlbum = await getMusics(id);
    this.setState({
      fullAlbum: fullAlbum.slice(1),
      savedAlbumName: fullAlbum[0].collectionName,
      savedArtistname: fullAlbum[0].artistName,
    });
  }

  render() {
    const { savedAlbumName, savedArtistname, fullAlbum } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">
            { savedArtistname }
          </p>
          <p data-testid="album-name">
            { savedAlbumName }
          </p>
          { fullAlbum.map((music) => (<MusicCard
            key={ music.collectionName }
            music={ music }
            id={ music.trackId }
          />)) }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default Album;
