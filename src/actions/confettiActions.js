import { delay } from '../lib/utilities';

export function showConfetti() {
	return {
		type: 'SHOW_CONFETTI'
	};
}

export function clearConfetti() {
	return {
		type: 'CLEAR_CONFETTI'
	};
}

export function throwConfetti(dispatch, message) {
	dispatch(showConfetti());

	return delay(5000).then(() => {
		dispatch(clearConfetti());
	});

}
