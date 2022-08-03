import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/01.Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/03.MusicCard';

export default class Album extends Component {
  state = {
    musicList: [],
    artistName: '',
    collectionName: '',
    artworkUrl60: '',
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      musicList: data.splice(1),
      artistName: data[0].artistName,
      collectionName: data[0].collectionName,
      artworkUrl60: data[0].artworkUrl100,
    });
  }

  render() {
    const { musicList, artistName, collectionName, artworkUrl60 } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main>
          <div>
            <p data-testid="artist-name">{ artistName }</p>
            <p data-testid="album-name">{ collectionName }</p>
            <img src={ artworkUrl60 } alt={ artistName } />
          </div>
          <div>
            <MusicCard musicList={ musicList } />
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
