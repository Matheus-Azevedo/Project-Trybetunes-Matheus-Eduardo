import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/01.Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/03.MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    musicList: [],
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    loading: true,
    dataFavorite: [],
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ dataFavorite: favorites, loading: false });
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const data = await getMusics(id);
    this.setState({
      musicList: data.filter((m, index) => index !== 0),
      artistName: data[0].artistName,
      collectionName: data[0].collectionName,
      artworkUrl100: data[0].artworkUrl100,
      loading: false,
    });
  }

  render() {
    const {
      musicList, artistName, loading,
      collectionName, artworkUrl100,
      dataFavorite } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main>
          <div>
            <p data-testid="artist-name">{ artistName }</p>
            <p data-testid="album-name">{ collectionName }</p>
            <img src={ artworkUrl100 } alt={ artistName } />
          </div>
          <div>
            { loading ? 'Carregando...' : '' }
            { musicList.map((musica) => (
              <MusicCard
                key={ musica.trackId }
                musica={ musica }
                trackId={ musica.trackId }
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
                dataFavorite={ dataFavorite }
              />)) }
          </div>
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
