import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants';
import ArticleStore from '../stores/user.store';
import request from "axios";
import _ from 'lodash';

let UserActions = {
  isAuthenticated
};


function isAuthenticated() {
	return request.get('/api/users').then(response => {
		AppDispatcher.handleServerAction({
			actionType: AppConstants.SET_USER,
			payload: response.data
		});
  }).catch(err => {
    console.log("err", err);
  });
}

export default UserActions;
