var EventEmitter = require('events').EventEmitter

let ArticleStore = Object.assign({}, EventEmitter.prototype, {

	emitChange() {
		this.emit('TEST');
	}
});
