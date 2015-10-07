import React, {Component} from "react";
import Navbar from "./Navbar.jsx";
import Splash from "./Splash.jsx";
import Card from "./Card.jsx";
require('bootstrap/dist/css/bootstrap.min.css');

export default class App extends Component {
	render() {
		return (
			<div>
		    <Navbar />
				<Splash />
				<div className="row">
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		)
	}
}
