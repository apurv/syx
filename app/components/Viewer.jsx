import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import ArticleActions from '../actions/article.actions';
import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import ArticleStore from '../stores/article.store';
import marked from 'marked';
import HeadersPanel from './HeadersPanel';
require('bootstrap/dist/css/bootstrap.min.css');


export default class Viewer extends Component {

	constructor(props){
		super(props);

		this.state = {
			article: ArticleActions.getArticle(this.props.params.id),
			editing: false,
			listeners: {
				articleStore: {}
			}
		};
	}

  componentDidMount() {
    this.state.listeners.articleStore = ArticleStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
		Object.keys(this.state.listeners).forEach( token => {
			this.state.listeners[token].remove();
		}.bind(this));
	}

  _onChange() {
    this.setState({ article: ArticleStore.getStoreArticle() });
  }

	markdownify() {
		if (this.state.article.content) {
			return {__html: marked(this.state.article.content)};
		} else {
			return {__html: ''};
		}
	}

	handleEditing (event) {
		let self = this;
		this.setState({ editing: true });
		setTimeout(function () {
			ReactDOM.findDOMNode(self.refs.articleTextArea).focus();
		}, 0);
	}

	handleEditingDone (event) {
			this.setState({ editing: false });
			ArticleActions.updateArticle(this.state.article._id, this.state.article)
			.then(() => {
				// console.log(".then invoked", ArticleStore.getStoreArticle())
				this._onChange();
			}.bind(this));
	}

	handleChange(event) {
		let tempVar = this.state.article;
		tempVar.content = event.target.value;
		this.setState({
			article: tempVar
		});
  }

	render() {
    let viewStyle = {};
    let editStyle = {};
		let value = this.state.article.content;

    if (!this.state.editing) {
      viewStyle.display = 'none';
    } else {
      editStyle.display = 'none';
    }


		 return (
			 <div className="row">
				 <div id="syx-viewpanel" class="syx-view-intro syx-intro-container" style={{ marginTop: '50px' }}>

		 			<header class="header">
		 				<div class="bg-img"><img src="http://i.imgur.com/67EjwuD.jpg" alt="Background Image" /></div>
		 				<div class="title">
		 					<h1>Supernova Remnants</h1>
		 					<p class="subline">Inspiration for Article Intro Effects</p>
		 					<p>by <strong>Apurv Parikh</strong> &#8212; Posted in <strong>Web Fundamentals</strong> on <strong>October 18, 2015</strong></p>
		 				</div>
		 			</header>


		 			<article class="content">
							{ /* HEADERS PANEL */}
							<HeadersPanel article={this.state.article} />

							{ /* ARTICLE PANEL */}
							<div className="col-md-8" onDoubleClick={this.handleEditing.bind(this)} style={editStyle}>
								<h1>Article</h1>
								<div dangerouslySetInnerHTML={this.markdownify()}></div>
							</div>

							<div className="col-md-8" style={viewStyle}>
								<h1>Article</h1>
								<textarea type="text"
									className="form-control"
									ref="articleTextArea"
									style={{height: '90vh'}}
									value={value}
									onChange={this.handleChange.bind(this)}
									onBlur={this.handleEditingDone.bind(this)}>
								</textarea>
							</div>

							{ /* TOOLS PANEL */}
							<div className="col-md-2">
								<h3>Control Panel</h3>
							</div>
		 			</article>
		 		</div>
			</div>
		);
	}//end render
}


// 		 			<button class="trigger" data-info="Click to see the header effect"><span>Trigger</span></button>
