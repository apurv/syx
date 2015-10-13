import React, {Component} from "react";
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import { Link } from 'react-router';
import moment from 'moment';

export default class Card extends Component {
	constructor(){
		super();
	}

	processClick () {
		console.log('hi from Card Component')
		ArticleActions.addArticle();
	}

	componentDidMount() {
		console.log("this.props.article", this.props.article)
	}

	render() {
		let article = this.props.article;
		let date = moment(article.postDate).format("MMM DD hh:mm:ss");

		return (
			<div>
        <h2 onClick={this.processClick.bind(this)}>{article.title}</h2>
				<p>{date}</p>
				<p>{article.tags.join(", ")}</p>
        <p><a className="btn btn-default" href="#" role="button">Read More »</a></p>
      </div>
		)
	}
}
