import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    nameUser: '',
    loading: false,
  }

  componentDidMount() {
    this.renderUser();
  }

  renderUser = async () => {
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({ nameUser: data.name, loading: false });
  }

  render() {
    const { loading, nameUser } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          { loading ? 'Carregando...' : nameUser }
          <nav>
            <Link data-testid="link-to-search" to="/search">Search</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">Trybe Talks</Link>
          </nav>
        </div>
      </header>
    );
  }
}
