export const SERVER_CONNECTING = 'SERVER_CONNECTING'
export const SERVER_CONNECTED = 'SERVER_CONNECTED'

export function serverConnecting() {
	return {
		type: SERVER_CONNECTING
	};
}

export function serverConnected() {
	return {
		type: SERVER_CONNECTED
	};
}
