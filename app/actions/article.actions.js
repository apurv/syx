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

function addArticle() {
	AppDispatcher.handleViewAction({
		actionType: AppConstants.CREATE_ARTICLE
	});
}

function getAllArticles() {
	request.get('/api/articles').then(function (response) {
		AppDispatcher.handleServerAction({
			actionType: AppConstants.GET_ARTICLES,
			payload: response.data
		});

  }).catch(function (err) {
    console.log("err", err);
  });
}

function getArticle(id) {
	console.log("inside getArticle")

	let cachedArticle;

	_.forEach(ArticleStore.getAllStoreArticles(), (article) => {
		if (id === article._id) {
			cachedArticle = article;
			console.log("set cachedArticle")
		}
	})

	if (cachedArticle) {
		console.log("dispatching payload", cachedArticle)
		AppDispatcher.handleServerAction({
			actionType: AppConstants.SET_CURRENT_ARTICLE,
			payload: cachedArticle
		});
	} else {
		request.get(`/api/articles/${id}`).then(function (response) {

			AppDispatcher.handleServerAction({
				actionType: AppConstants.SET_CURRENT_ARTICLE,
				payload: response.data
			});

	  }).catch(function (err) {
	    console.log("err", err);
	  });
	}

}

function updateArticle(id) {
	console.log("id", id);
	request.put('/api/articles/:id').then(function (response) {
    console.log("response", response);
  }).catch(function (err) {
    console.log("err", err);
  });
}

function deleteArticle(id) {
	console.log("id", id);
	request.delete('/api/articles/:id').then(function (response) {
    console.log("response", response);
  }).catch(function (err) {
    console.log("err", err);
  });
}

export default ArticleActions;
