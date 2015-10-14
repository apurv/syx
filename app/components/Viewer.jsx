import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Splash from './Splash.jsx';
import Card from './Card.jsx';
import { Link } from 'react-router';
import ArticleActions from '../actions/article.actions';
import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import ArticleStore from '../stores/article.store';
import marked from 'marked';
require('bootstrap/dist/css/bootstrap.min.css');


export default class Viewer extends Component {

	constructor(props){
		super(props);

		let initalListener = ArticleStore.addListener(() => {
			this.setState({
				article: ArticleStore.getStoreArticle()
			});

			//maybe do unmounting instead?
			initalListener.remove();
		});

		this.state = {
			article: {}
		};

		console.log("this.state", this.state)

	}

	componentDidMount() {
    this.setState({
      article: ArticleActions.getArticle(this.props.params.id)
    });
  }

	render() {

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-2">
						<h3>Side-Bar</h3>
					</div>
					<div className="col-md-8">
						<h1>Article</h1>
						<div dangerouslySetInnerHTML={{__html: marked(this.state.article.content)}}></div>
					</div>
					<div className="col-md-2">
						<h3>Control Panel</h3>
					</div>
				</div>
			</div>
		);
	}//end render
}
