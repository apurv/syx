import React, {Component} from "react";
import UserActions from '../actions/user.actions';
import UserStore from '../stores/user.store';
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class NavigationBar extends Component {

	constructor() {
		super()

		this.state = {
			user: {},
			listeners: {
				userStore: {}
			}
		};
	}

	componentWillMount() {
		UserActions.isAuthenticated();
	}

  componentDidMount() {
    this.state.listeners.userStore = UserStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
		Object.keys(this.state.listeners).forEach( token => {
			this.state.listeners[token].remove();
		}.bind(this));
  }

  _onChange() {
    this.setState({ user: UserStore.getCurrentStoreUser() });
  }

	render() {

		let loggedIn = {}, loggedOut = {};

		if (this.state.user.username) {
			loggedIn.display = 'none';
		} else {
			loggedOut.display = 'none';
		}

		return (
			<Navbar className="navbar navbar-inverse navbar-fixed-top" inverse toggleNavKey={0}>
		    <NavBrand>
					<a className="navbar-brand" href="#">syx</a>
				</NavBrand>
		    <Nav right eventKey={0}> {/* This is the eventKey referenced */}
		      <NavItem eventKey={1} href="#">Articles</NavItem>
					<NavItem eventKey={2} href="/auth/github" style={loggedIn}>Login with Github</NavItem>
		      <NavDropdown eventKey={2} title={this.state.user.username || ''} id="collapsible-navbar-dropdown" style={loggedOut}>
		        <MenuItem eventKey="1">Edit Profile</MenuItem>
		        <MenuItem divider />
		        <MenuItem eventKey="2">Logout</MenuItem>
		      </NavDropdown>
		    </Nav>
		  </Navbar>
		)
	}
}
