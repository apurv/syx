import React, {Component} from "react";
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import AppConstants from '../constants';
import Card from './Card.jsx';

export default class CardsDisplay extends Component {
	constructor(){
		super();

		this.state = {
			articles: []
		};

		let initalListener = ArticleStore.addListener((e) => {
			console.log("inside handler", e)
			this.setState({
				articles: ArticleStore.getAllStoreArticles()
			});

			initalListener.remove();
		});
	}

	componentDidMount() {
		this.state = {
			articles: ArticleActions.getAllArticles()
		};
	}

	processClick () {
		console.log('hi from Card Component', this.state)
	}

	getArticle() {
		ArticleActions.getArticle();
	}

	updateArticle() {
		ArticleActions.updateArticle();
	}

	deleteArticle() {
		ArticleActions.deleteArticle();
	}

	render() {
		return (
			<div className="container">
				{ this.state.articles.map(function(article) {
                return (
					<div key={article._id} className="col-xs-6 col-lg-4">
						<Card article={article}/>
					</div>
				)
            })
        }
			</div>
		)
	}
}
