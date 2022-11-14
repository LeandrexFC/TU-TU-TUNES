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
      checked: false,
    });
    const { id } = this.props;
    const savedMusics = await getFavoriteSongs();
    const resultsChecked = savedMusics.find((favorite) => favorite.trackId
    === id);

    // const validateType = typeof resultsChecked;
    // const finalResults = validateType ? 'undefined' === false : resultsChecked;

    this.setState({
      isLoading: false,
      checked: resultsChecked,
    });
  }

  handleFavorites = async () => {
    const { music } = this.props;
    const { checked } = this.state;
    const results = checked === false;

    this.setState({
      isLoading: true,
    });

    if (!checked) {
      await addSong(music);

      this.setState({
        isLoading: false,
      });

      this.setState({
        checked: results,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      await removeSong(music);
      this.setState({
        isLoading: false,
        checked: results,
      });
    }
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
  id: PropTypes.string.isRequired,
};

export default MusicCard;
