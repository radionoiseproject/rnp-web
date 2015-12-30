import React, { Component, PropTypes } from 'react'

export default class ServerConnection extends Component {
  render() {
    var msg = "Disconnected";
    var con = this.props.serverConnection;
    if (con.connecting) {
      msg = "Connecting";
      if (con.attempts > 0) {
        msg += " (attempt " + con.attempts + ")";
      }
    } else if (con.waiting) {
      msg = "Waiting " + con.waitTime + "ms";
    } else if (con.connected) {
      msg = "Connected";
    }

    return (
      <h3>{msg}</h3>
    );
  }
}

ServerConnection.propTypes = {
  serverConnection: PropTypes.shape({
    connecting: PropTypes.bool.isRequired,
    waiting: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    attempts: PropTypes.number.isRequired,
    waitTime: PropTypes.number.isRequired
  })
}
