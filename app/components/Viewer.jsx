import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Splash from './Splash.jsx';
import Card from './Card.jsx';
require('bootstrap/dist/css/bootstrap.min.css');
import { Link } from 'react-router';
import ToolPanel from './Viewer.ToolPanel.jsx';

import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';

export default class Viewer extends Component {
	render() {
		return (
			<div className="container" style={{ marginTop: '50px' }}>
				<div className="row">
					<div className="col-md-2">
						<h3>Side-Bar</h3>
					</div>
					<div className="col-md-6">
						<h1>Article</h1>
					</div>
					<div className="col-md-4">
						<ToolPanel />
					</div>
				</div>
			</div>
		);
	}//end render
}
