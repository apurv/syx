import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import marked from 'marked';
import TweenMax from 'gsap';


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
		let node = ReactDOM.findDOMNode(this);
		// console.log("node", node);
		// TweenMax.to(node, 3, { x: 100 })
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
		return (
					<div className="col-md-2" style={{backgroundColor: 'green'}}>
							{ this.state.headers.map(function (header, index) {
									return (
											<div className="syx-sidebar-header" key={index}>{header.text}</div>
									)
								})
							}
					</div>
		);
	}//end render
}
