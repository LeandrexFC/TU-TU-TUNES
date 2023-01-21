import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

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
      isLoading: true,
      checked: !checked,
    });

    if (!checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }

    this.setState({
      isLoading: false,
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
                onChange={ () => {} }
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
  id: PropTypes.number.isRequired,
};

export default MusicCard;
