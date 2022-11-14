import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  handleFavorites = async () => {
    const { music } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong(music);
    this.setState({
      isLoading: false,
      checked: true,
    });
  };

  render() {
    const { music } = this.props;
    const { isLoading, checked } = this.state;
    const { trackName, previewUrl, trackId } = music;
    return (
      <>
        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {
          isLoading ? <Loading /> : (
            <label htmlFor="favorites">
              Favorita
              <input
                type="checkbox"
                checked={ checked }
                name="favorites"
                data-testid={ `checkbox-music-${trackId}` }
                onClick={ this.handleFavorites }
              />
            </label>
          )
        }
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
