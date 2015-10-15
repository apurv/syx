import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import marked from 'marked';

import Navbar from './Navbar.jsx';
import Splash from './Splash.jsx';
import Card from './Card.jsx';
import ToolPanel from './Viewer.ToolPanel.jsx';
import ArticleActions from '../actions/article.actions';
import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import ArticleStore from '../stores/article.store';

require('bootstrap/dist/css/bootstrap.min.css');


export default class Viewer extends Component {

	constructor(props){
		super(props);

		this.state = {
			article: {},
			editing: false
		};


		let initalListener = ArticleStore.addListener(() => {
			this.setState({
				article: ArticleStore.getStoreArticle()
			});

			initalListener.remove();
		});
	}

	componentWillMount() {
		this.setState({
			article: ArticleActions.getArticle(this.props.params.id)
		});
	}

	componentDidMount() {
		this.setState({
			article: ArticleStore.getStoreArticle() || {}
		});
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
			<div className="container" style={{ marginTop: '50px' }}>
				<div className="row">
					<div className="col-md-2">
						<h3>Side-Bar</h3>
					</div>

					<div className="col-md-7" onDoubleClick={this.handleEditing.bind(this)} style={editStyle}>
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

					<div className="col-md-3">
						<ToolPanel />

					</div>
				</div>
			</div>
		);
	}//end render
}
