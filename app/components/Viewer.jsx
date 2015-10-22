import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Splash from './Splash';
import Card from './Card';
import ToolPanel from './Viewer.ToolPanel';
import ArticleActions from '../actions/article.actions';
import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import ArticleStore from '../stores/article.store';
import marked from 'marked';
import HeadersPanel from './HeadersPanel';
import hljs from 'highlight.js';
require("../public/scss/viewpanel");


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
		require("../public/js/viewpanel-scroll")(window);
  }

	componentWillUnmount() {
		Object.keys(this.state.listeners).forEach( token => {
			this.state.listeners[token].remove();
		}.bind(this));
		require("../public/js/viewpanel-scroll")();
	}

	_onChange() {
		this.setState({ article: ArticleStore.getStoreArticle() });
	}

	markdownify() {

		if (this.state.article.content) {

			let renderer = new marked.Renderer();

			let droppables = _.compact(_.map(marked.lexer(this.state.article.content), item => {
				if (item.type === 'code' && item.lang === 'syx-droppable') {
					renderer.code = (code, lang, escaped) => {
						if (lang === item.lang) {
							return '<div class="droppable text-center" style="background: deepskyblue;"> DROPPABLE DIV </div>';
						}

					  if (renderer.options.highlight) {
					    let out = renderer.options.highlight(code, lang);
					    if (out != null && out !== code) {
					      escaped = true;
					      code = out;
					    }
					  }

					  if (!lang) {
					    return '<pre><code class="hljs ">'
					      + (escaped ? code : escape(code, true))
					      + '\n</code></pre>';
					  }

					  return '<pre><code class="hljs '
					    + renderer.options.langPrefix
					    + escape(lang, true)
					    + '">'
					    + (escaped ? code : escape(code, true))
					    + '\n</code></pre>\n';
					}
					return item;
				}
			}));

			marked.setOptions({
				highlight: function (code) {
					return hljs.highlightAuto(code).value;
				},
				renderer: renderer
			});

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
			this._onChange();
		}.bind(this));
	}

	handleChange(event) {
		let temp = this.state.article;
		temp.content = event.target.value;
		this.setState({
			article: temp
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
			 <div id="syx-view-row" className="row">
				 <div id="syx-viewpanel" className="syx-view-intro syx-intro-container" style={{ marginTop: '50px' }}>

		 			<header className="header">
		 				<div className="bg-img"><img src="http://i.imgur.com/67EjwuD.jpg" alt="Background Image" /></div>
		 				<div className="title">
		 					<h1>Intro to Angular2</h1>
							<h3>Lorem markdownum parenti ut matris.</h3>
		 					<p id="syx-article-info">by <strong>Apurv Parikh</strong> &#8212; Posted in <strong>Web Fundamentals</strong> on <strong>October 18, 2015</strong></p>
		 				</div>
		 			</header>

					<HeadersPanel article={this.state.article} />

		 			<article className="content">
						<div className="row" style={{ minWidth: '100%' }}>
							{ /* HEADERS PANEL */}
							<div className="col-md-2"></div>

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
								<ToolPanel article={this.state.article}/>
							</div>
						</div>
		 			</article>
		 		</div>
			</div>
		);
	}//end render
}

// <p className="subline">Lorem markdownum parenti ut matris.</p>
// <button className="trigger" data-info="Click to see the header effect"><span>Trigger</span></button>
