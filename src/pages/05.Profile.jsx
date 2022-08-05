import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/01.Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: false,
    user: {},
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { loading, user } = this.state;
    console.log(user);
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <main>
            <div>
              { user.name }
            </div>
            <div>
              { user.email }
            </div>
            <div>
              { user.description }
            </div>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <Link
              to="/profile/edit"
            >
              Editar perfil
            </Link>
          </main>
        ) }
      </div>
    );
  }
}
