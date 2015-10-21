import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import marked from 'marked';
import TweenMax from 'gsap';
import ScrollMagic from 'ScrollMagic';
window.jQuery = window.$ =  require('jquery/dist/jquery.min');
require('bootstrap/dist/js/bootstrap.min');
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
		let tween = TweenMax.fromTo(ReactDOM.findDOMNode(this), 1.5, { x: -300 }, { x: 0 });
		var scene = new ScrollMagic.Scene({ triggerElement: "#syx-article-info" })
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

		$('body').scrollspy({
		    target: '.bs-docs-sidebar',
		    offset: 40
		});

		$(".bs-docs-sidebar").affix({
		    offset: { top: -1 }
		});


		return (
						<nav className="bs-docs-sidebar hidden-xs hidden-sm">
							<ul id="syx-sidebar" className="nav nav-stacked">
									{ this.state.headers.map(function (header, index) {
											return (
												<li key={'li_' + index}>
													<a
														href={'#' + (header.text.replace(spaceRegEx, "-")).toLowerCase()}
														key={index}>{header.text}
													</a>
												</li>
											)
										})
									}
							</ul>
						</nav>
		);
	}//end render
}
// <a className="back-to-top" href="#top">
// 	Back to top
// </a>

//
// <nav className="bs-docs-sidebar hidden-print hidden-xs hidden-sm affix" style={{ backgroundColor: 'grey' }}>
// 	<ul id="syx-sidebar" className="nav bs-docs-sidenav">

// <div className="syx-sidebar-header" key={index}>{header.text}</div>
