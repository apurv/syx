import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router';

require('bootstrap/dist/css/bootstrap.min.css');

import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import NavigationBar from './NavigationBar.jsx';

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="container">
			    	<NavigationBar />
			  </div>
				{this.props.children}
			</div>
		)
	}
}
