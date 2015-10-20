import React from "react";
import { render } from "react-dom";
import { Router, Route } from 'react-router';
import { IndexRoute } from 'react-router'

// import io from "socket.io-client";
// const socket = io("http://localhost:7070/");

import Viewer from './components/Viewer';
import Splash from './components/Splash';
import Card from './components/Card';
import App from "./components/App";

//Without react-router
// render(<App />, document.getElementById("container"));

render(
	(
	<Router>
    	<Route path="/" component={App}>
	    	<IndexRoute component={Splash} />
	    	<Route path="Card" component={Card} />
				<Route path="articles/:id" component={Viewer} />
    	</Route>
	</Router>
  ), document.getElementById("container")
);

	    	// <Route path="Viewer" component={Viewer} />
