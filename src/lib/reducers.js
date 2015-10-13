import serverConnection from 'reducers/server_connection'
import reduxTest from 'reducers/redux_test'
import { combineReducers } from 'redux'

export default combineReducers({
	serverConnection,
	reduxTest
});
