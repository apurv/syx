import AppConstants from '../constants';
import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import UserActions from '../actions/user.actions';

let users = {};
let current_user = {};

class UserStore extends Store {

	__onDispatch(dispatchMsg) {
		console.log('hello from UserStore; received dispatchMsg: ', dispatchMsg);
		let action = dispatchMsg.action.actionType;
		let source = dispatchMsg.source;

    if (dispatchMsg.action.payload){
      var payload = dispatchMsg.action.payload
    }

		switch(action) {

      case AppConstants.GET_USERS:
        users = payload;
        this.__emitChange()
        break;

			case AppConstants.SET_USER:
        current_user = payload;
        this.__emitChange()
        break;

			default:
				console.log('No match in userStore');
				break;
		}//end switch
	}//end __onDispatch

  getAllStoreUsers() {
    return users;
  }

	getCurrentStoreUser() {
		return current_user;
	}

	isAdmin() {
		// CHANGE THIS TO ADMIN
		return current_user.role === 'user';
	}
}//end Class

let userStore = new UserStore(AppDispatcher);

export default userStore;
