import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state ={
    loading: false,
  }

  addFavorite = async (event) => {
    const { value } = event.target;
    const number = parseInt(value, 10);
    this.setState({ loading: true });
    await addSong(number);
    this.setState({ loading: false });
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
                onChange={ this.addFavorite }
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
