import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';

let ArticleActions = {
	addArticle,
	getAll,
};

function addArticle() {

	console.log('hi from ArticleActions, addArticle')

	AppDispatcher.handleViewAction({
		actionType: AppConstants.CREATE_ARTICLE
	});
}

function getAll() {

}

export default ArticleActions;
