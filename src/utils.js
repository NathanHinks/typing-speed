import * as R from 'ramda';

export const calculateWordCount = R.compose(
  R.length,
  R.reject(R.equals('')),
  R.split(' '),
  R.trim,
  R.prop('text')
);

export const isGameRunning = R.both(
  R.propSatisfies(R.lt(0), 'timeRemaining'),
  R.propEq('isTimerRunning', true)
);
