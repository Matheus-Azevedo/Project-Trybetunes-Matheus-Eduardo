import React, { Component } from 'react';
import Header from '../components/01.Header';
import Artist from '../components/02.Artist';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    btnDisable: true,
    artistName: '',
    artistData: [],
    MSG: false,
    valueInput: '',
  }

  testArtistName = (event) => {
    const { value } = event.target;
    const two = 2;
    const setFalse = value.length < two;
    this.setState({
      btnDisable: setFalse,
      artistName: value,
    });
  }

  searchMusic = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    const data = await searchAlbumsAPI(artistName);
    this.setState({
      artistData: data, MSG: true, valueInput: artistName, artistName: '',
    });
  }

  render() {
    const { btnDisable, artistData, MSG, valueInput, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <main>
          <form id="search-container">
            <label htmlFor="search-artist">
              Pesquise pelo artista:
              {' '}
              <input
                id="search-artist"
                type="text"
                value={ artistName }
                data-testid="search-artist-input"
                placeholder="ex:ac/dc, Slash"
                onChange={ this.testArtistName }
              />
            </label>
            <button
              type="button"
              disabled={ btnDisable }
              data-testid="search-artist-button"
              onClick={ this.searchMusic }
            >
              Pesquisar
            </button>
          </form>
          { MSG ? <h1>{ `Resultado de álbuns de: ${valueInput}` }</h1> : ('') }
          { artistData.length === 0
            ? 'Nenhum álbum foi encontrado'
            : <Artist artistData={ artistData } /> }
        </main>
      </div>
    );
  }
}
