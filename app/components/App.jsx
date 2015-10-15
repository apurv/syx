import React, {Component} from 'react';
import Navbar from './Navbar.jsx';

require('bootstrap/dist/css/bootstrap.min.css');
import { Router, Route, Link } from 'react-router';

import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';


export default class App extends Component {
	render() {
		return (
			<div>
				<div className="container">
			    	<Navbar />
			  </div>
				{this.props.children}
			</div>
		)
	}
}
