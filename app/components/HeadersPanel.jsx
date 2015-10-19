import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import marked from 'marked';


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
						<h3>Side-Bar</h3>
							{ this.state.headers.map(function (header, index) {
									return (
											<h4 key={index}>{header.text}</h4>
									)
								})
							}
					</div>
		);
	}//end render
}
