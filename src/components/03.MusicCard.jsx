import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state ={
    loading: false,
    checked: false,
  }

  componentDidMount() {
    const { dataFavorite, musica } = this.props;
    const { trackId } = musica;
    const valid = dataFavorite.some((favorito) => (
      favorito.trackId === trackId
    ));
    this.setState({ checked: valid });
  }

  toggleFavorite = async (event) => {
    const { musica, reload } = this.props;
    const { checked } = event.target;
    this.setState({ checked, loading: true });
    if (checked) await addSong(musica);
    else await removeSong(musica);
    if (reload) {
      const favoritos = await getFavoriteSongs();
      reload(favoritos);
    }
    this.setState({ loading: false });
  }

  render() {
    const { loading, checked } = this.state;
    const { trackId, trackName, previewUrl } = this.props;
    return (
      <ul>
        { loading ? <Loading /> : (
          <li>
            { trackName }
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              { trackName }
              <code>code</code>
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              { ' ' }
              <input
                id={ trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ checked }
                onChange={ this.toggleFavorite }
              />
            </label>
          </li>
        ) }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  dataFavorite: PropTypes.arrayOf(PropTypes.shape({
    some: PropTypes.func,
  })).isRequired,
  reload: PropTypes.func.isRequired,
};
