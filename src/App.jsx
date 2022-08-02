import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/01.Login';
import Search from './pages/02.Search';
import Album from './pages/03.Album';
import Favorites from './pages/04.Favorites';
import Profile from './pages/05.Profile';
import ProfileEdit from './pages/06.ProfileEdit';
import NotFound from './pages/07.NotFound';

export default class App extends Component {
  render() {
    return (
      <section>
        <header>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => <Login { ...props } /> }
            />
            <Route
              exact
              path="/search"
              render={ (props) => <Search { ...props } /> }
            />
            <Route
              exact
              path="/album/:id"
              render={ (props) => <Album { ...props } /> }
            />
            <Route
              exact
              path="/favorites"
              render={ (props) => <Favorites { ...props } /> }
            />
            <Route
              exact
              path="/profile"
              render={ (props) => <Profile { ...props } /> }
            />
            <Route
              exact
              path="/profile/edit"
              render={ (props) => <ProfileEdit { ...props } /> }
            />
            <Route
              exact
              path="*"
              render={ (props) => <NotFound { ...props } /> }
            />
          </Switch>
        </header>
      </section>
    );
  }
}
