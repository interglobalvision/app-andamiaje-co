import Store from '../store/confetti';

export const initialState = Store;

export default function confettiReducer(state = initialState, action) {
	const { message, type } = action;

	switch (type) {
		case 'SHOW_CONFETTI': {
			return {
				show: true,
			}
		}
		case 'CLEAR_CONFETTI': {
			return initialState;
		}
		default:
			return state;
	}
}
