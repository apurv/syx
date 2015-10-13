import React from "react";
import { render } from "react-dom";
import { Router, Route } from 'react-router';
import { IndexRoute } from 'react-router'

// import io from "socket.io-client";
// const socket = io("http://localhost:7070/");

import "./main-style.css";
import Viewer from './components/Viewer.jsx';
import Splash from './components/Splash.jsx';
import Card from './components/Card.jsx';
import App from "./components/App.jsx";

//Without react-router
// render(<App />, document.getElementById("container"));

render(
	(
	<Router>
    	<Route path="/" component={App}>
	    	<IndexRoute component={Splash} />
	    	<Route path="Card" component={Card} />
	    	<Route path="Viewer" component={Viewer} />
    	</Route>
	</Router>
  ), document.getElementById("container")
);
