import Config from 'config'
import React, { findDOMNode, Component, PropTypes } from 'react'
import { connect, Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { testAction } from 'actions';

import Store from 'store'

window.setTimeout(function() {
	Store.dispatch(testAction("Whee!"));
}, 3000);

class TestText extends Component {
	render() {
		return (
			<h2>{this.props.text}</h2>
		);
	}
}
TestText.propTypes = {
	text: PropTypes.string.isRequired
}

class App extends Component {
	render() {
		const { dispatch, testText } = this.props;
		return (
			<TestText text={testText}/>
		);
	}
}
App.propTypes = {
	testText: PropTypes.string.isRequired
};

function select(state) {
	return {
		testText: state.testText
	};
}

let ConnectedApp = connect(select)(App);

let rootElement = document.getElementById('app-container');
ReactDOM.render(
	<Provider store={Store}>
		<ConnectedApp />
	</Provider>,
	rootElement
);

