import AppConstants from '../constants';
import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import ArticleActions from '../actions/article.actions';

let articles = {};
let current_article = {};

class ArticleStore extends Store {

	__onDispatch(dispatchMsg) {
		console.log('hello from ArticleStore; received dispatchMsg: ', dispatchMsg);
		let action = dispatchMsg.action.actionType;
		let source = dispatchMsg.source;

    if (dispatchMsg.action.payload){
      var payload = dispatchMsg.action.payload
    }

		switch(action) {

      case AppConstants.GET_ARTICLES:
        articles = payload;
        this.__emitChange()
        break;

			case AppConstants.SET_CURRENT_ARTICLE:
        current_article = payload;
        this.__emitChange()
        break;

			case AppConstants.CREATE_ARTICLE:
				console.log('got CREATE_ARTICLE actionType');
				// article = payload;
				// router.transitionTo('/dashboard')
				break;

			default:
				console.log('No match in articleStore');
				break;
		}//end switch
	}//end __onDispatch

  getAllStoreArticles() {
    return articles;
  }

	getStoreArticle() {
		return current_article;
	}

}//end Class

let articleStore = new ArticleStore(AppDispatcher);

export default articleStore;
