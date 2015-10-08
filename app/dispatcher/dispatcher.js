import {Dispatcher} from 'flux';
import AppConstants from '../constants';

let helpers = {
	handleViewAction: function(action) {
		this.dispatch({
			source: AppConstants.VIEW_ACTION,
			action
		});
	},
	handleServerAction: function(action) {
		this.dispatch({
			source: AppConstants.SERVER_ACTION,
			action
		});
	}
};

let AppDispatcher = Object.assign(new Dispatcher(), helpers);

module.exports = AppDispatcher;

/**
 * dispatch
 * @param  {object} payload The data from the action.
 */

 /**
  * register
  * @param {function} callback The callback to be registered.
  * @return {number} The index of the callback within the _callbacks array.
  */ 

  /*
  * unregister
  *
  */

  /*
  * waitFor
  *
  */

  /*
  * isDispatching
  *
  */
