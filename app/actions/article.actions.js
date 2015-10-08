import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';

let ArticleActions = {
	addArticle
};

function addArticle () {
	console.log('hi from ArticleActions, addArticle')
	AppDispatcher.handleViewAction({
		actionType: AppConstants.CREATE_ARTICLE
	});
}

export default ArticleActions;
