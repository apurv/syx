import { Dispatcher } from 'flux';
import AppConstants from '../constants';

let helpers = {
	handleViewAction,
	handleServerAction
};

let AppDispatcher = Object.assign(new Dispatcher(), helpers);

function handleViewAction (action) {
	console.log('hi from AppDispatcher; action: ', action);

	this.dispatch({
		source: AppConstants.VIEW_ACTION,
		action
	});
}

function handleServerAction (action) {
	this.dispatch({
		source: AppConstants.SERVER_ACTION,
		action
	});
}

export default AppDispatcher;
/**
 * dispatch
 * @param  {object} payload The data from the action.
 */

 /**
  * register
  * @param {function} callback The callback to be registered.
  * @return {number} The index of the callback within the _callbacks array.
  */

  /**
  * unregister
  * @param {String} Id of callback to be unregistered.
  * @return {undefined}?
  */

  /**
  * waitFor
  * @param {Array} Array of string Ids to wait for.
  * @return {undefined}?
  */

  /**
  * isDispatching
  * @return {Boolean}
  */
