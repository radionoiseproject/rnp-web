import {
  SERVER_INITIALIZED,
  SERVER_DISCONNECTED,
  SERVER_WAITING,
  SERVER_CONNECTING,
  SERVER_CONNECTED
} from 'actions/server_connection'
import { combineReducers } from 'redux'

const initialState = {
  url: null,
  connecting: false,
  connected: false,
  waiting: false,
  waitTime: 0,
  attempts: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case SERVER_INITIALIZED:
      console.log("ServerConnection: INITIALIZED: url=" + action.payload);
      return Object.assign({}, state, {
        url: action.payload
      });

    case SERVER_DISCONNECTED:
      console.log("ServerConnection: DISCONNECTED");
      return Object.assign({}, state, {
        connecting: false,
        connected: false
      });

    case SERVER_WAITING:
      console.log("ServerConnection: WAITING: wait_time=" + action.payload + "ms");
      return Object.assign({}, state, {
        waiting: true,
        waitTime: action.payload
      });

    case SERVER_CONNECTING:
      console.log("ServerConnection: CONNECTING");
      return Object.assign({}, state, {
        attempts: state.attempts + 1,
        waiting: false,
        connecting: true
      });

    case SERVER_CONNECTED:
      console.log("ServerConnection: CONNECTED");
      return Object.assign({}, state, {
        attempts: 0,
        connecting: false,
        connected: true
      });

    default:
      return state;
  }
}
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
