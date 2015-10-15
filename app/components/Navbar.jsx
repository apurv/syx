import React, {Component} from "react";
import UserActions from '../actions/user.actions';
import UserStore from '../stores/user.store';

export default class Navbar extends Component {

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
		for(let token of this.state.listeners) {
			token.remove();
		}
  }

  _onChange() {
    this.setState({ user: UserStore.getCurrentStoreUser() });
  }

	render() {
		return (
		    <nav className="navbar navbar-inverse navbar-fixed-top">
		      <div className="container">
		        <div className="navbar-header">
		          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span className="sr-only">Toggle navigation</span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		          </button>
		          <a className="navbar-brand" href="#">syx</a>
		        </div>
		        <div id="navbar" className="navbar-collapse collapse">
		          <ul className="nav navbar-nav navbar-right">
		            <li><a href="">Articles</a></li>
		            <li><a href="/auth/github">Welcome {this.state.user.username}</a></li>
		          </ul>
		        </div>
		      </div>
		    </nav>
		)
	}
}
