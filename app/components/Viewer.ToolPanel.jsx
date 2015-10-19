import React, {Component} from "react";

import Dropzone from 'dropzone';

require('dropzone/dist/min/dropzone.min.css');

import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';

import axios from 'axios';

let s3 = new AWS.S3();

export default class ToolPanel extends Component {	

	constructor(props) {
		super(props)
		
		this.state = {
			article: {},
			listenerTokens: {},
		};

		this.state.article = this.props.article;
	}
	// TODO -- PASSED ARTICLE THROUGH PROPS INSTEAD
	// componentWillMount() {
	// 	this.state.listenerTokens.articleStoreToken = ArticleStore.addListener(()=>{
	// 		let currentArtice = ArticleStore.getStoreArticle();
	// 		this.state.article = currentArtice;
	// 	});
	// }

	componentDidMount() {
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

		function computeSyxUrl() {
			let baseUrl = `api/articles/`;
			let articleId = mountedComponent.state.article._id;
			return `${baseUrl}${articleId}/media`;
		}

		function saveMediaInfoToSyx(file) {
			let fileInfo = addedFileData[addedFileData.length - 1];
			fileInfo.height = file.height;
			fileInfo.width = file.width;

			axios.put(computeSyxUrl(), fileInfo)
			.then(res => {
				console.log('Successfully uploaded to our server. Res: ', res);
			})
			.catch(res =>{
				console.log('Error uploading to Syx server. Error: ', res);
				throw new Error(res)
			});
		}

		//Wait for thumbnail event because the File.width property is a DropzoneJS extension
		// and is not a part of the core File API; it is added later.
		//http://stackoverflow.com/questions/25927381/undefined-returned-when-accessing-some-listed-properties-of-file-object
		
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

			let myDropzone = new Dropzone("form#dropzone-form", dropzoneOptions);
		
	}

	componentWillUnmount() {
		let tokens = Object.keys(this.state.listenerTokens);
		tokens.forEach(t => this.state.listenerTokens[t].remove());
	}
	
	render() {
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
				</div>
			</div>
		);
	}
}