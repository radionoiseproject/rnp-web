import Config from 'config'
import React, { findDOMNode, Component, PropTypes } from 'react'
import { connect, Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { testAction } from 'actions';
import { serverInitialize } from 'actions/server_connection';

import Store from 'store'

window.setTimeout(function() {
	Store.dispatch(testAction("Whee!"));
}, 3000);
Store.dispatch(serverInitialize("ws://localhost:8080/rnp"));

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
			<div className="vertical grid-frame">
				<div className="shrink collapse grid-content">
					<div className="primary title-bar">
						<span className="title center">Radio Noise Project</span>
					</div>
				</div>
				<div className="grid-content">
					<TestText text={testText}/>
				</div>
			</div>
		);
	}
}
App.propTypes = {
	testText: PropTypes.string.isRequired
};

function select(state) {
	return {
		testText: state.reduxTest.testText
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

