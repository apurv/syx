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
		})
		console.log('hi from compuonent will mount', this.state.artcle)
	}

	componentDidMount() {
		this.setState({
			article: ArticleStore.getStoreArticle() || {}
		});
	}

	markdownify() {
		console.log("this.state", this.state.article instanceof Promise)
		if (this.state.article.content) {
			return {__html: marked(this.state.article.content)};
		} else {
			return {__html: ''};
		}
	}

	editable() {
		console.log("edit")

	}

	handleEditing (event) {
		console.log('handleEditing', event)
		this.setState({ editing: true });
	}

	handleEditingDone (event) {
		console.log("yoyo", event)
		if (event.keyCode === 13 ) { // submit
			this.setState({ editing: false });
		}
	}

	handleChange(event) {
		console.log("invoked handleChange")
		console.log("event", event)
		let tempVar = this.state.article;
		tempVar.content = event.target.value;
		this.setState({
			article: tempVar
		});
  }

	render() {

    var viewStyle = {};
    var editStyle = {};
		let value = this.state.article.content;

		console.log("this.state in render", this.state)

    if (!this.state.editing) {
      viewStyle.display = 'none';
    } else {
      editStyle.display = 'none';
    }

		return (

			<div className="container">
				<div className="row">
					<div className="col-md-2">
						<h3>Side-Bar</h3>
					</div>

					<div className="col-md-8"  onDoubleClick={this.handleEditing.bind(this)} style={editStyle}>
						<h1>Article</h1>
						<div dangerouslySetInnerHTML={this.markdownify()}></div>
					</div>

					<div className="col-md-8" style={viewStyle}>
						<h1>Article</h1>
						<textarea type="text" className="form-control" style={{height: '90vh'}} value={value}
							onChange={this.handleChange.bind(this)}
							onKeyDown={this.handleEditingDone.bind(this)}>
						</textarea>
					</div>


					<div className="col-md-2">
						<h3>Control Panel</h3>
					</div>
				</div>
			</div>
		);
	}//end render
}

// <div dangerouslySetInnerHTML={this.markdownify()}></div>
