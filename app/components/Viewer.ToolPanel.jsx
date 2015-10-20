import React, {Component} from "react";
import Dropzone from 'dropzone';

import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';

require('dropzone/dist/min/dropzone.min.css');

let s3 = new AWS.S3();

export default class ToolPanel extends Component {	

	constructor(props) {
		super(props)
		
		this.state = {
			article: {
				media: []
			},
			listenerTokens: {},
		};
		// TODO -- POTENTIAL REFACTOR INTO READ FILE IN THE FUTURE - 
		// FOR SOME REASON WE HAVE TO GET ARTICLE THROUGH PROPS AND ARTICLE STORE
		// IN ORDER FOR IT TO BE DEFINED ON STATE X-FER AND PAGE RELOAD
		if (!(typeof this.props.article.then === 'function')) {
			this.state.article = this.props.article;
		}
	}

	_onChange() {
		this.setState({ article: ArticleStore.getStoreArticle() });
	}

	// componentWillMount() {
		
	// }

	componentDidMount() {

		this.state.listenerTokens.articleStoreToken = ArticleStore.addListener(this._onChange.bind(this));

		let mountedComponent = this;
		let addedFileData = [];

		//Ensure media info is URI safe
		function encodeName(str) {
			let spaceRegEx = /\s/gm;
			return encodeURIComponent(str.replace(spaceRegEx, "_"));
		}

		//store uri safe info
		function setMediaInfoInMemory(file, done) {
			let modName = encodeName(file.name);
			let modFolder = encodeName(mountedComponent.state.article.title);
			
			addedFileData.push({
				name: file.name,
				urlEncodedName: modName,
				amazonFolder: modFolder,
				fileType: file.type
			});

			done();
		}

		function computeAmazonURL(){

			let fileInfo = addedFileData[addedFileData.length - 1];

			//TODO -- switch from localhost to amazon when moving to production
			let amazonBaseUrl = 'https://s3.amazonaws.com/syx/article-media/';
			let localhost = 'http://127.0.0.1:3000/syx/article-media/';

			let fullAmazonUrl = `${localhost}${fileInfo.amazonFolder}/${fileInfo.urlEncodedName}`;
			fileInfo.s3Url = fullAmazonUrl;
			return fullAmazonUrl;
		}

		function saveMediaInfoToSyx(file) {
			let fileInfo = addedFileData[addedFileData.length - 1];

			fileInfo.height = file.height;
			fileInfo.width = file.width;

			ArticleActions.updateArticleMedia(mountedComponent.state.article._id, fileInfo);
		}

		//Wait for thumbnail event because the File.width property is a DropzoneJS extension
		// and is not a part of the core File API; it is added later.
		//http://stackoverflow.com/questions/25927381/undefined-returned-when-accessing-some-listed-properties-of-file-object
			
		Dropzone.options.dropzoneForm = false;
		
		let dropzoneOptions = {
			acceptedFiles: 'image/*',
			url: computeAmazonURL,
			method: 'post',
			dictDefaultMessage: `Drop files here.`,
			dictFileTooBig: `File too big!`,
			accept: setMediaInfoInMemory,
			init: function() {
				this.on('thumbnail', saveMediaInfoToSyx);
			},
		};

		let dropElem = document.getElementById('dropzone-form');
		
		let myDropzone = new Dropzone("form#dropzone-form", dropzoneOptions);
	}

	componentWillUnmount() {
		let tokens = Object.keys(this.state.listenerTokens);
		tokens.forEach(t => this.state.listenerTokens[t].remove());
	}
	
	render() {
		let articleMedia = this.state.article.media;

		return (
			<div>
				<div className="col-md-12">
					<h3>Tool Panel</h3>
					<div id='preview-template'>
					<form 
						action="/file-upload" 
						className="dropzone"
						id="dropzone-form">
					</form>
					</div>

					<div id="draggable-media">
						{articleMedia.map((media, index) => {
							return (	
								<div className="draggable-media-elem" key={index} draggable="true">
									<span>
										<img src="/images/image_default.svg" data-s3url={media.s3Url}/>
										<span>
											{media.name}
										</span>
									</span>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		);
	}
}