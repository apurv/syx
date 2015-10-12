import React from "react";
import { render } from "react-dom";
import { Router, Route } from 'react-router';

// import io from "socket.io-client";
// const socket = io("http://localhost:7070/");

import "./main-style.css";
import Viewer from './components/Viewer.jsx';
import App from "./components/App.jsx";

//Without react-router
// render(<App />, document.getElementById("container"));

render(
	(
	<Router>
    <Route path="/" component={App} />
    <Route path="Viewer" component={Viewer} />
  </Router>
  ), document.getElementById("container")
);
