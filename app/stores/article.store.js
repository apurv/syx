import AppConstants from '../constants';
import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import ArticleActions from '../actions/article.actions';

let articles = {};

class ArticleStore extends Store {

	getInitialState() {
		console.log('get inital state here')
	}

	__onDispatch(dispatchMsg) {
		console.log('hello from ArticleStore; received dispatchMsg: ', dispatchMsg);
		let action = dispatchMsg.action.actionType;
		let source = dispatchMsg.source;

    if (dispatchMsg.action.payload){
      var payload = dispatchMsg.action.payload
    }

		switch(action) {

      case AppConstants.GET_ARTICLES:
        console.log("got GET_ARTICLES actionType")
        articles = payload;
        this.__emitChange()
        break;

			case AppConstants.CREATE_ARTICLE:
				console.log('got CREATE_ARTICLE actionType');
				break;

			default:
				console.log('No match in articleStore');
				break;
		}//end switch
	}//end __onDispatch

  getAllStoreArticles() {
    return articles;
  }

}//end Class

let articleStore = new ArticleStore(AppDispatcher);

export default articleStore;
