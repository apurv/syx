import React, {Component} from "react";
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';
import Dropzone from 'dropzone';

export default class ToolPanel extends Component {

	constructor() {
		super()

		// this.state = {
		// 	article: {}
		// };
	}

	
	// getArticle() {
	// 	ArticleActions.getArticle();
	// }

	// updateArticle() {
	// 	ArticleActions.updateArticle();
	// }

	componentDidMount() {
		
		// let article = this.state.article

		let trimmedFileObj = {};
		Dropzone.options.dropzoneForm = {
			acceptedFiles: 'image/*',
			maxFilesize: 2,
			init: function() {
				this.on("addedfile", function(file) { 
					trimmedFileObj.name = file.name || null;
					trimmedFileObj.type = file.type || null;
					trimmedFileObj.height = file.height || null;
					trimmedFileObj.width = file.width || null;
					console.log('the file: ', file);
				});
			},
			url: 'api/toolPanel/' + article._id,
			method: 'post'
		};
	}

	
	render() {
		return (
			<div>
				<div className="col-md-12">
					<h3>Tool Panel</h3>
					<form 
						action="/file-upload" 
						className="dropzone"
						id="dropzone-form">
					</form>
				</div>
			</div>
		);
	}
}