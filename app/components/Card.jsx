import React, {Component} from "react";
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';

export default class Card extends Component {
	constructor(){
		super();
	}

	processClick () {
		console.log('hi from Card Component')
		ArticleActions.addArticle();
	}

	render() {
		return (
			<div className="col-xs-6 col-lg-4">
        <h2>Card</h2><span onClick={this.processClick.bind(this)}>Test</span>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a className="btn btn-default" href="#" role="button">Read More »</a></p>
      </div>
		)
	}
}
