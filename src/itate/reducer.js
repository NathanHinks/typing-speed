import * as R from 'ramda';
import { timeLimit } from './initialState';

export default (state, { type, payload }) => {
  const updateState = R.flip(R.evolve())(state);

  switch (type) {
    case 'DECREMENT_TIMER':
      return updateState({ timeRemaining: R.dec });
    case 'RESET_TIMER':
      return updateState({
        text: R.always(''),
        timeRemaining: R.always(timeLimit),
      });
    case 'SET_TEXT':
      return updateState({ text: R.always(payload) });
    case 'START_TIMER':
      return updateState({ isTimerRunning: R.always(true) });
    case 'STOP_TIMER':
      return updateState({ isTimerRunning: R.always(false) });
    default:
      return state;
  }
};
