import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Artist extends Component {
  render() {
    const { artistData } = this.props;
    return (
      <section id="artist-content">
        { artistData.map((artista, index) => (
          <div key={ index }>
            <div>
              Nome:
              { ' ' }
              { artista.artistName }
            </div>
            <div>
              <img src={ artista.artworkUrl100 } alt={ artista.collectionName } />
            </div>
            <div>
              Coleção:
              { ' ' }
              { artista.collectionName }
            </div>
            <div>
              Valor:
              { ' ' }
              { artista.collectionPrice }
            </div>
            <div>
              Data de lançamento:
              { ' ' }
              { artista.releaseDate }
            </div>
            <div>
              Tracks:
              { ' ' }
              { artista.trackCount }
            </div>
            <Link
              data-testid={ `link-to-album-${artista.collectionId}` }
              to={ `/album/${artista.collectionId}` }
            >
              Link para o album
            </Link>
          </div>
        ))}
      </section>
    );
  }
}

Artist.propTypes = {
  artistData: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  })).isRequired,
};
