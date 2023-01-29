import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../css/Album.css';

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
      savedAlbumImg: fullAlbum[0].artworkUrl100,
    });
  }

  render() {
    const { savedAlbumName, savedArtistname, fullAlbum, savedAlbumImg } = this.state;
    return (
      <>
        <div className="albums">
          <Header />
        </div>
        <div className="allAlbum-top">
          <img src={ savedAlbumImg } alt="albumimg" className="renderAlbum" />
          <div className="albumtopP">
            <p data-testid="artist-name" className="artist-name">
              { savedArtistname }
            </p>
            <p data-testid="album-name" className="album-name">
              { savedAlbumName }
            </p>
          </div>
        </div>
        <div data-testid="page-album" className="page-album">
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
