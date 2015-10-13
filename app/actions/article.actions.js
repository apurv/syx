import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';
import request from "axios";

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
	console.log("id", id);
	request.get('/api/articles/:id').then(function (response) {
    console.log("response", response);
  }).catch(function (err) {
    console.log("err", err);
  });
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
