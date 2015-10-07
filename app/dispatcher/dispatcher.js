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

let AppDispatcher = Object.assign({}, new Dispatcher(), helpers);

module.exports = AppDispatcher;
