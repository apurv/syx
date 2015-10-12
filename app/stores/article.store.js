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

		switch(action) {
			case AppConstants.CREATE_ARTICLE:
				console.log('got CREATE_ARTICLE actionType');
				break;

			default:
				console.log('No match in articleStore');
				break;

		}//end switch
	}

	// componentWillUnmount() {
	// 	console.log('articleStore, componentWillUnmount; this:', this, 'token', this._dispatchToken)
	// 	AppDispatcher.unregister(this._dispatchToken)
	// }

}//end Class

let articleStore = new ArticleStore(AppDispatcher);

export default articleStore;
