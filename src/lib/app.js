import Config from 'config'
import React, { findDOMNode, Component, PropTypes } from 'react'
import { connect, Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { serverInitialize } from 'actions/server_connection';
import ServerConnection from 'components/server_connection';

import Store from 'store'

Store.dispatch(serverInitialize(Config.server));

class App extends Component {
	render() {
		const { dispatch, testText, serverConnection } = this.props;
		return (
			<div className="vertical grid-frame">
				<div className="shrink collapse grid-content">
					<div className="primary title-bar">
						<span className="title center">Radio Noise Project</span>
					</div>
				</div>
				<div className="grid-content">
					<ServerConnection serverConnection={serverConnection}/>
				</div>
			</div>
		);
	}
}
App.propTypes = {
	serverConnection: ServerConnection.propTypes.serverConnection
};

function select(state) {
	return {
		serverConnection: state.serverConnection
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

