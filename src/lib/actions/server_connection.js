export const SERVER_INITIALIZED = 'SERVER_INITIALIZED'
export const SERVER_DISCONNECTED = 'SERVER_DISCONNECTED'
export const SERVER_WAITING = 'SERVER_WAITING'
export const SERVER_CONNECTING = 'SERVER_CONNECTING'
export const SERVER_CONNECTED = 'SERVER_CONNECTED'

/* Flow graph
 * initial -> [initialize] -> initialized
 * initialized -> [disconnect] -> disconnected
 * disconnected -> [wait] -> waiting
 * waiting -> [connect] -> connecting
 * connecting -> disconnected
 * connecting -> connected
 * connected -> disconnected
 */

/* Static action creators */
function serverInitialized(url) {
  return {
    type: SERVER_INITIALIZED,
    payload: url
  };
}

function serverDisconnected() {
  return {
    type: SERVER_DISCONNECTED
  };
}

function serverWaiting(waitTime) {
  return {
    type: SERVER_WAITING,
    payload: waitTime
  };
}

function serverConnecting() {
  return {
    type: SERVER_CONNECTING
  };
}

function serverConnected() {
  return {
    type: SERVER_CONNECTED
  };
}

/* Asynchronous actions */
export function serverInitialize(url) {
  return (dispatch) => {
    dispatch(serverInitialized(url));
    dispatch(serverDisconnect());
  };
}

function serverDisconnect() {
  return (dispatch) => {
    dispatch(serverDisconnected());
    dispatch(serverWait());
  };
}

function serverWait() {
  return (dispatch, getState) => {
    const state = getState();
    const attempts = state.serverConnection.attempts;

    const waitTime = attempts * attempts * 1000;

    dispatch(serverWaiting(waitTime));

    if (attempts > 0) {
      setTimeout(() => {
        dispatch(serverConnect());
      }, attempts * 1000);
    } else {
      dispatch(serverConnect());
    }
  };
}

function serverConnect() {
  return (dispatch, getState) => {
    dispatch(serverConnecting());

    const state = getState();
    const url = state.serverConnection.url;
    var ws = new WebSocket(url);

    ws.addEventListener("error", (ev) => {
      console.log(ev);
    });
    ws.addEventListener("close", () => {
      dispatch(serverDisconnect());
    });
    ws.addEventListener("open", () => {
      dispatch(serverConnected());
    });
    ws.addEventListener("message", (ev) => {
      console.log("Received:", ev.data);
    });

    const ka = function() {
      if (ws.readyState == 1) {
        console.log("Sending KEEP_ALIVE");
        ws.send(JSON.stringify({type: "KEEP_ALIVE"}));
        setTimeout(ka, 30000);
      }
    };
    setTimeout(ka, 30000);

  };
}
