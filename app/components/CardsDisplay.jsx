import React, {Component} from "react";
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import AppConstants from '../constants';
import axios from "axios";

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
			<div className="col-xs-6 col-lg-4">
				{ this.state.articles.map(function(item) {
                return <div>{item.author}</div>
            })
        }
        <h2>Card</h2><span onClick={this.processClick.bind(this)}>Test</span>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a className="btn btn-default" href="#" role="button">Read More »</a></p>
      </div>
		)
	}
}
