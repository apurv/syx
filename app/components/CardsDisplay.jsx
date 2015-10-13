import React, {Component} from "react";
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import AppConstants from '../constants';
import Card from './Card.jsx';

export default class CardsDisplay extends Component {
	constructor(){
		super();

		let temp = ArticleActions.getAllArticles()

		this.state = {
			articles: []
		};

		let initalListener = ArticleStore.addListener(() => {
			console.log("listener invoked");
			console.log("go inside handler", ArticleStore.getAllStoreArticles())
			this.setState({
				articles: ArticleStore.getAllStoreArticles()
			});

			initalListener.remove();
		});



	}

	componentDidMount() {
		console.log("componentDidMount");
		this.state = {
			articles: ArticleActions.getAllArticles()
		};
		// this.forceUpdate();
		// if (this.mounted) {
		// 	this.state = {
		// 		articles: ArticleActions.getAllArticles()
		// 	};
		// }
	}

	processClick () {
		console.log('hi from Card Component', this.state)
		// ArticleActions.addArticle();
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
						<div className="col-xs-6 col-lg-4">
							<Card key={article._id} article={article}/>
						</div>
						)
	            	})
        		}
			</div>
		)
	}
}
