import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';
import ArticleStore from '../stores/article.store';
import request from "axios";
import _ from 'lodash';

let ArticleActions = {
	addArticle,
	getAllArticles,
	getArticle,
	updateArticle,
	deleteArticle
};

function addArticle(authorId) {
	return request.post('/api/articles', { author: authorId }).then(response => {
		console.log('response for add article', response)
		AppDispatcher.handleViewAction({
			actionType: AppConstants.CREATE_ARTICLE,
			payload: response.data
		});
	})
}

function getAllArticles() {
	return request.get('/api/articles').then(response => {
		AppDispatcher.handleServerAction({
			actionType: AppConstants.GET_ARTICLES,
			payload: response.data
		});
  }).catch(function (err) {
    console.log("err", err);
  });
}

function getArticle(id) {

	let cachedArticle;

	_.forEach(ArticleStore.getAllStoreArticles(), (article) => {
		if (id === article._id) {
			cachedArticle = article;
		}
	})

	if (cachedArticle) {
		AppDispatcher.handleServerAction({
			actionType: AppConstants.SET_CURRENT_ARTICLE,
			payload: cachedArticle
		});
		return cachedArticle;
	} else {

		return request.get(`/api/articles/${id}`).then(response => {

			AppDispatcher.handleServerAction({
				actionType: AppConstants.SET_CURRENT_ARTICLE,
				payload: response.data
			});

			return response.data;

	  }).catch(function (err) {
	    console.log("err", err);
	  });
	}
}

function updateArticle(id, article) {
	console.log("id", id);
	return request.put('/api/articles/' + id, article).then(response => {
		AppDispatcher.handleServerAction({
			actionType: AppConstants.SET_CURRENT_ARTICLE,
			payload: response.data
		});
  }).catch(function (err) {
    console.log("err", err);
  });
}

function deleteArticle(id) {
	console.log("id", id);
	request.delete('/api/articles/:id').then(response => {
    console.log("response", response);
  }).catch(function (err) {
    console.log("err", err);
  });
}

export default ArticleActions;
