import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import marked from 'marked';
import TweenMax from 'gsap';
import ScrollMagic from 'ScrollMagic';
require('../../node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min');

export default class HeadersPanel extends Component {

	constructor(props){
		super(props);

		this.state = {
			headers: []
		}
	}

	componentWillMount() {
		if (!(this.props.article instanceof Promise)) {
			this.setHeaders(this.props.article);
		}
	}

	componentDidMount() {
		let smController = new ScrollMagic.Controller();
		let tween = TweenMax.to(ReactDOM.findDOMNode(this), 2.5, { x: 300 });
		var scene = new ScrollMagic.Scene({ triggerElement: "#syx-sidebar" })
								.setTween(tween)
								.addTo(smController);
	}

  componentWillReceiveProps() {
		if (this.props.article instanceof Promise) {
			this.props.article.then(article => {
				this.setHeaders(article);
			}.bind(this));
		} else {
			this.setHeaders(this.props.article);
		}
  }

  setHeaders(article) {
		let headers = _.compact(_.map(marked.lexer(article.content), item => {
			if (item.depth === 1 && item.type === 'heading') {
				return item;
			}
		}));
		this.setState({ headers: headers });
  }


	render() {
		let spaceRegEx = /\s/gmi;
		return (
					<div id="syx-sidebar" className="col-md-2">
						<nav className="bs-docs-sidebar hidden-print hidden-xs hidden-sm affix">
							<ul className="nav bs-docs-sidenav">
								<li className="active">
									{ this.state.headers.map(function (header, index) {
											return (
													<a className="syx-sidebar-header"
														href={'#'+(header.text.replace(spaceRegEx, "-"))}
														key={index}>{header.text}
													</a>
											)
										})
									}
								</li>
							</ul>
							<a className="back-to-top" href="#top">
								Back to top
							</a>
						</nav>
					</div>
		);
	}//end render
}

// <div className="syx-sidebar-header" key={index}>{header.text}</div>
