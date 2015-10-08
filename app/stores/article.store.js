import AppConstants from '../constants';
import AppDispatcher from '../dispatcher/dispatcher';
import {Store} from 'flux/utils';
import ArticleActions from '../actions/article.actions';

console.log('inside ArticleStore; dispatcher: ', AppDispatcher);


let dispatchToken = AppDispatcher.register(analyzeDispatch)

function analyzeDispatch() {
	let action = dispatchMsg.action;
	console.log('hello from ArticleStore; received dispatchMsg: ', dispatchMsg);
}

let ArticleStore = new Store();

export default ArticleStore;
