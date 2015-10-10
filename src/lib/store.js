import { createStore } from 'redux';
import { testAction } from 'actions';
import app from 'reduxtest';

let store = createStore(app);

export default store;

console.log(store.getState());

let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
);

store.dispatch(testAction("Hello, World!"));

unsubscribe();
