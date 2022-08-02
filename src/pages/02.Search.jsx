import React, { Component } from 'react';
import Header from '../components/01.Header';

export default class Search extends Component {
  state = {
    btnDisable: true,
  }

  testArtistName = (event) => {
    const { value } = event.target;
    const two = 2;
    const setFalse = value.length < two;
    this.setState({
      btnDisable: setFalse,
    });
  }

  render() {
    const { btnDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist">
          <input
            id="search-artist"
            type="text"
            data-testid="search-artist-input"
            placeholder="ex:ac/dc, Slash"
            onChange={ this.testArtistName }
          />
          <button
            type="button"
            disabled={ btnDisable }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}
