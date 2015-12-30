import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { testAction } from 'actions';
import reducer from 'reducers';

const createStoreThunk = applyMiddleware(
    thunk
)(createStore);

const store = createStoreThunk(reducer);

export default store;

console.log(store.getState());

let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
);

store.dispatch(testAction("Hello, World!"));

