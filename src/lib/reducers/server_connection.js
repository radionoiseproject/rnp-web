import { SERVER_CONNECTING, SERVER_CONNECTED } from 'actions/server_connection'
import { combineReducers } from 'redux'

function connected(state = false, action) {
	switch (action.type) {
	case SERVER_CONNECTING:
		return false;
	case SERVER_CONNECTED:
		if (action.error)
			return false;
		else
			return true;
	default:
		return state;
	}
}

export default combineReducers({
	connected
});
