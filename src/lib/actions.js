export const TEST_ACTION = 'TEST_ACTION'

export function testAction(text) {
	return {
		type: TEST_ACTION,
		payload: text
	};
}
