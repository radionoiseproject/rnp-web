import { TEST_ACTION } from 'actions'
import { combineReducers } from 'redux'

function testText(state = "", action) {
	switch (action.type) {
	case TEST_ACTION:
		return action.payload;
	default:
		return state;
	}
}

const app = combineReducers({
	testText
});

export default app;
