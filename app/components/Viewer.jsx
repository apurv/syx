import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Splash from './Splash.jsx';
import Card from './Card.jsx';
require('bootstrap/dist/css/bootstrap.min.css');
import { Link } from 'react-router';

import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';

export default class Viewer extends Component {
	render() {
		return (
	    <div className="container">

	    	<div className="row">
	    		<Navbar />
	    	</div>

	    	<div className="row">
	    		<br />
	    		<br />
	    		<br />
	    	</div>

				<div className="row">
					<div className="col-md-2">
						<span>Sections here</span>
					</div>

					<div className="col-md-8">
						<h1>Content Here</h1>
					</div>

					<div className='col-md-2'>
						<span>Control Panel</span>
					</div>

				</div>
			</div>
		);
	}//end render
}
