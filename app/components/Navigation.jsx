import React from 'react';
import { Link } from 'react-router';

import UserActions from 'actions/UserActions';

import styles from 'scss/components/_navigation';
import Button from 'react-bootstrap/lib/Button';

export default class Navigation extends React.Component {

  _onLogout = () => {
    UserActions.logout();
  }

  render() {
    return (
      <div className="container">

        <nav role="navigation" className="navbar navbar-default navbar-fixed-top">
          <Button bsStyle="success" bsSize="large">Primary</Button>
            <Link to="/" className={styles.navigation__item + ' ' + styles['navigation__item--logo']} activeClassName={styles['navigation__item--active']}>syx</Link>
            { this.props.UserStore.user.get('authenticated') ? (
              <Link onClick={this._onLogout} className={styles.navigation__item} to="/logout">Logout</Link>
            ) : (
              <Link className={styles.navigation__item} to="/login">Log in</Link>
            )}
            <Link className={styles.navigation__item} to="/dashboard">Dashboard</Link>
            <Link to="/about" className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>About</Link>
        </nav>
      </div>
    );
  }

}

Navigation.propTypes = { UserStore: React.PropTypes.object };
