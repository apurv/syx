import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import NavigationBar from './NavigationBar';
require("../public/scss/main");


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
