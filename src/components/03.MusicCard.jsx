import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state ={
    loading: false,
  }

  toggleFavorite = async (event) => {
    const { value, checked } = event.target;
    const number = parseInt(value, 10);
    this.setState({ loading: true });
    if (checked) {
      await addSong(number);
      this.setState({
        loading: false,
      });
    } else {
      await removeSong(number);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { musicList } = this.props;
    return (
      <ol>
        { musicList.map((music, index) => (
          <li key={ index }>
            { music.trackName }
            <audio
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              { music.trackName }
              <code>code</code>
            </audio>
            <label htmlFor="checkbox">
              Favorita
              { ' ' }
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${music.trackId}` }
                value={ music.trackId }
                // checked={ checkState }
                onChange={ this.toggleFavorite }
              />
            </label>
          </li>
        ))}
        { loading ? 'Carregando...' : '' }
      </ol>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  })).isRequired,
};
