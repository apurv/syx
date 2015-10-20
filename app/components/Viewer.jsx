import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import marked from 'marked';

import Splash from './Splash.jsx';
import Card from './Card.jsx';
import ToolPanel from './Viewer.ToolPanel.jsx';
import LeftSidebar from './LeftSidebar.jsx';
import ArticleActions from '../actions/article.actions';
import articleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import ArticleStore from '../stores/article.store';

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

	// componentWillMount() {
		
	// }

  componentDidMount() {
    this.state.listeners.articleStore = ArticleStore.addListener(this._onChange.bind(this));

    let dragSrc = null;

    function handleDragStart(e) {
    	dragSrc = this;
    	e.dataTransfer.effectAllowed = 'move';
    	e.dataTransfer.setData('text/html', this.innerHTML);

    }

    function handleDrop(e) {
    	if (e.stopPropagation) {
    		e.stopPropagation();
    	}

    	if (dragSrc != this) {
    		//We delete reactids to avoid duplicates 
    		let reactDataRegex = /data-reactid=".+?"/mig;
    		let newDiv = document.createElement("div");
    		let newInnerHtml = e.dataTransfer.getData('text/html').replace(reactDataRegex, "");
    		newDiv.innerHTML = newInnerHtml
    		this.appendChild(newDiv);
    	}

    	return false;
    }

    function handleDragOver(e) {
    	if (e.preventDefault) {
    		e.preventDefault();
    	}

    	e.dataTransfer.dropEffect = 'move';
    	return false;
    }

    /*
    // WHEN WE WANT TO ADD STYLE TO DIFFERENT EVENTS
	function handleDragEnd(e) {
		// styling cleanup goes here
		return false;
	}

	function handleDragEnter(e) {
	  // this  e.target is the current hover target.
	  this.classList.add('over');
	}

	function handleDragLeave(e) {
	  this.classList.remove('over');  // this / e.target is previous target element.
	}
    */

    // We are waiting for dom to be compiled, otherwise this could go in render
    setTimeout(()=>{
    	let draggableDivs = document.querySelectorAll('#draggable-media .draggable-media-elem');

    	[].forEach.call(draggableDivs, function(div) {
    		div.addEventListener('dragstart', handleDragStart, false);
    	});

    	let droppableDivs = document.querySelectorAll('.droppable-media-elem');

    	[].forEach.call(droppableDivs, function(div) {
    		div.addEventListener('drop', handleDrop, false);
    		div.addEventListener('dragover', handleDragOver, false);
    	});
    },0);
  }//end componentDidMount

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
			<div className="container" style={{ marginTop: '50px' }}>
				<div className="row">
					<LeftSidebar article={this.state.article} />
					<div className="droppable-media-elem" style={{ backgroundColor: "teal" }} droppable>Drop Here</div>
					<div className="col-md-7" onDoubleClick={this.handleEditing.bind(this)} style={editStyle}>
						<h1>{this.state.article.title}</h1>
						<div dangerouslySetInnerHTML={this.markdownify()}></div>
					</div>

					<div className="col-md-7" style={viewStyle}>
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
						<ToolPanel article={this.state.article}/>
					</div>
				</div>
			</div>
		);
	}//end render
}
