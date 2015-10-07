import nodeLibsBrowser from 'node-libs-browser'

// import merge from 'react/lib/merge'
let EventEmitter = nodeLibsBrowser[events].EventEmitter;

// let ArticleStore = merge(EventEmitter.prototype, {

// 	emitChange() {
// 		this.emit('TEST');
// 	}
// })

console.log('hello from article store');
