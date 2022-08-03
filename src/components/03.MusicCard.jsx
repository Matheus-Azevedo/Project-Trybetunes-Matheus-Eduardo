import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
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
              <code>{ music.trackName }</code>
            </audio>
          </li>
        ))}
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
