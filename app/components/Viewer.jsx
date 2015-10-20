import React, {Component} from 'react';
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

	// componentWillMount() {
		
	// }

  componentDidMount() {
  	require("../public/js/viewpanel-scroll")(window);
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
					renderer.code = function (code, lang, escaped) {
						if (lang === item.lang) {
							return '<div class="droppable-media-elem text-center" style="background: deepskyblue;"> DROPPABLE DIV </div>';
						} else {
							return '<pre><code>' + code + '</code></pre>';
						}
					}
					return item;
				}
			}));

			return {__html: marked(this.state.article.content, { renderer: renderer })};
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
			<div id="syx-view-row" className="row">
				<div id="syx-viewpanel" className="syx-view-intro syx-intro-container" style={{ marginTop: '50px' }}>

		 			<header className="header">
		 				<div className="bg-img"><img src="http://i.imgur.com/67EjwuD.jpg" alt="Background Image" /></div>
		 				<div className="title">
		 					<h1>{this.state.article.title}</h1>
							<h3>Lorem markdownum parenti ut matris.</h3>
		 					<p>by <strong>Apurv Parikh</strong> &#8212; Posted in <strong>Web Fundamentals</strong> on <strong>October 18, 2015</strong></p>
		 				</div>
		 			</header>


		 			<article className="content">
						<div className="row" style={{ minWidth: '100%' }}>
							{ /* HEADERS PANEL */}
							<HeadersPanel article={this.state.article} />

							{ /* ARTICLE PANEL */}
							<div className="col-md-7" onDoubleClick={this.handleEditing.bind(this)} style={editStyle}>
								<h1>Article</h1>
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

							{ /* TOOLS PANEL */}
							<div className="col-md-3">
								<ToolPanel article={this.state.article}/>
							</div>
						</div>
		 			</article>
		 		</div>
			</div>
		);
	}//end render
}
