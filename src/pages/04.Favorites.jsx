import React, { Component } from 'react';
import Header from '../components/01.Header';
import MusicCard from '../components/03.MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    dataFavorite: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ dataFavorite: favorites, loading: false });
  }

  reload = (array) => {
    this.setState({ dataFavorite: array });
  }

  render() {
    const { loading, dataFavorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <main>
          { loading ? <Loading /> : (
            dataFavorite.map((musica, index) => (
              <MusicCard
                key={ index }
                musica={ musica }
                trackId={ musica.trackId }
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
                dataFavorite={ dataFavorite }
                reload={ this.reload }
              />))
          ) }
        </main>
      </div>
    );
  }
}
