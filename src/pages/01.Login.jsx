import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    loginName: '',
    btnDisable: true,
    loading: false,
  }

  onInputChangeName = (event) => {
    const { value } = event.target;
    const three = 3;
    const setFalse = value.length < three;
    this.setState({
      btnDisable: setFalse,
      loginName: value,
    });
  }

  submitUser = async () => {
    const { history } = this.props;
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({ loading: false });
    history.push('/search');
  }

  renderLogin = () => {
    const { btnDisable, loginName } = this.state;
    return (
      <div data-testid="page-login">
        <label htmlFor="login-name">
          Name:
          {' '}
          <input
            type="text"
            data-testid="login-name-input"
            value={ loginName }
            onChange={ this.onInputChangeName }
          />
        </label>
        <button
          id="btn-login-name"
          type="button"
          data-testid="login-submit-button"
          disabled={ btnDisable }
          onClick={ this.submitUser }
        >
          Entrar
        </button>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? 'Carregando...' : this.renderLogin() }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
