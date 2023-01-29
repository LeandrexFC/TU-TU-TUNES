import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../css/Album.css';

class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,

    });
    const { id } = this.props;
    const savedMusics = await getFavoriteSongs();
    const resultsChecked = savedMusics.find((favorite) => favorite.trackId
    === id);
    this.setState({
      isLoading: false,
      checked: resultsChecked,
    });
  }

  handleFavorites = async () => {
    window.location.reload(true);
    const { music } = this.props;
    const { checked } = this.state;

    this.setState({
      checked: !checked,
    });

    if (!checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
  };

  render() {
    const { music } = this.props;
    const { isLoading, checked } = this.state;
    const { trackName, previewUrl, trackId } = music;
    return (
      <div className="allAlbumsCard">
        <p className="songName">
          { trackName }
        </p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
          className="songCard"
        >
          <track kind="captions" className="songCard" />
          O seu navegador não suporta o elemento
          <code className="songCard">audio</code>
          .
        </audio>
        {
          isLoading ? <Loading /> : (
            <FontAwesomeIcon
              className="heart"
              icon={ checked ? faHeartCircleCheck : faHeart }
              onChange={ () => {} }
              type="checkbox"
              checked={ checked }
              name="favorites"
              data-testid={ `checkbox-music-${trackId}` }
              onClick={ this.handleFavorites }
            />
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
};

export default MusicCard;
