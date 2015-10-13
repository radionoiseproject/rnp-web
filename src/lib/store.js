import { createStore } from 'redux';
import { testAction } from 'actions';
import reducer from 'reducers';

let store = createStore(reducer);

export default store;

console.log(store.getState());

let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
);

store.dispatch(testAction("Hello, World!"));

