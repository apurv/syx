import React from "react";
import {render} from "react-dom";
// import io from "socket.io-client";

import "./main-style.css";
import App from "./components/App.jsx";

// const socket = io("http://localhost:7070/");
render(<App />, document.getElementById("container"));
