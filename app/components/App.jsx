import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Splash from './Splash.jsx';
import Card from './Card.jsx';
import CardsDisplay from './CardsDisplay.jsx';

require('bootstrap/dist/css/bootstrap.min.css');
import { Router, Route, Link } from 'react-router';

import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';

// import ArticleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';

var data =  ['card1', 'card2', 'card3'];

export default class App extends Component {
	render() {
		return (
			<div>
		    <Navbar />
				<Splash />

				<div className="row">
					<CardsDisplay data={ data } />
				</div>

			</div>
		)
	}
}
// 					<CardDisplay data={ data } />
