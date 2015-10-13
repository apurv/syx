import React, {Component} from "react";

export default class Navbar extends Component {
	render() {
		return (
		    <nav className="navbar navbar-inverse navbar-fixed-top">
		      <div className="container">
		        <div className="navbar-header">
		          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span className="sr-only">Toggle navigation</span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		          </button>
		          <a className="navbar-brand" href="#">syx</a>
		        </div>
		        <div id="navbar" className="navbar-collapse collapse">
		          <ul className="nav navbar-nav navbar-right">
		            <li><a href="">Articles</a></li>
		            <li><a href="/auth/github">GitHub Login</a></li>
		          </ul>
		        </div>
		      </div>
		    </nav>
		)
	}
}
