import React, {Component} from "react";

import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';
import Dropzone from 'dropzone';
import axios from 'axios';

require('dropzone/dist/min/dropzone.min.css');

export default class ToolPanel extends Component {

	constructor() {
		super()
		
		this.state = {
			article: {},
			listenerTokens: {},
		};
	}

	componentWillMount() {
		this.state.listenerTokens.articleStoreToken = ArticleStore.addListener(()=>{
			this.state.article = ArticleStore.getStoreArticle();
		});
	}

	componentDidMount() {

		let mountedComponent = this;
		
		function computeAmazonURL(){
			// TODO -- SETUP AMAZON S3 AND UPDATE THIS URL
			let baseURL = `api/forAmazonServer/`;
			return `${baseURL}${mountedComponent.state.article._id}/media`;
		}

		function computeSyxURL(){
			let baseURL = `api/articles/`;
			return `${baseURL}${mountedComponent.state.article._id}/media`;
		}

		// function addedFileEvent(file) {

		// }

		// function uploadErrorEvent(file, errorMsg, xhrObj) {
		// 	console.log('inside uploadErrorEvent function. args:', arguments);
		// }

		// function uploadComplete(file) {
		// 	console.log(`uploadComplete`, arguments);
		// }

		function createFileInfo(file) {

			let mediaInfo = {
				name: file.name,
				type: file.type,
				height: file.height,
				width: file.width
			};

			return mediaInfo;
		}

		function addMediaInfo(file) {

			let infoToSend = createFileInfo(file);
			
			axios.put(computeSyxURL(), infoToSend)
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
		Dropzone.options.dropzoneForm = {
			acceptedFiles: 'image/*',
			init: function() {
				// this.on("addedfile", addMediaInfo);
				// this.on('error', uploadErrorEvent);
				this.on('thumbnail', addMediaInfo);
			},
			url: computeAmazonURL,
			method: 'put',
			dictDefaultMessage: `Drop files here.`,
			dictFileTooBig: `File too big!`
		};
	}

	componentWillUnmount() {
		let tokens = Object.keys(this.state.listenerTokens);
		tokens.forEach(t => t.remove());
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