import * as R from 'ramda';
import { useEffect, useReducer } from 'react';
import { initialState, timerReducer } from '../state';
import {
  DECREMENT_TIMER,
  RESET_TIMER,
  SET_TEXT,
  START_TIMER,
  STOP_TIMER,
} from '../state/actions';
import { calculateWordCount, isGameRunning } from '../utils';
import { Box, Button, Grow, TextField } from '@material-ui/core';

const App = () => {
  const [state, dispatchTimer] = useReducer(timerReducer, initialState);
  const { isTimerRunning, text, timeRemaining } = state;

  const startTimer = () => {
    dispatchTimer(RESET_TIMER);
    dispatchTimer(START_TIMER);
  };

  const setTimer = () =>
    setTimeout(() => {
      dispatchTimer(DECREMENT_TIMER);
    }, 1000);

  const handleChange = ({ target: { value } }) =>
    R.compose(dispatchTimer, R.mergeRight(SET_TEXT))({
      payload: value,
    });

  useEffect(
    () =>
      R.ifElse(isGameRunning, setTimer, () => dispatchTimer(STOP_TIMER))(state),
    [isTimerRunning, timeRemaining]
  );

  return (
    <div className='app'>
      <h1>Test your typing speed</h1>
      <h2>
        Time Remaining: <span>{timeRemaining}s</span>
      </h2>
      <Box display='flex' flexDirection='column'>
        <div class='no-bg'>
          <TextField
            disabled={!isTimerRunning}
            color='secondary'
            error={R.both(isGameRunning, R.propEq('text', ''))(state)}
            onChange={handleChange}
            fullWidth
            label={
              isTimerRunning ? (
                'Type as many words as you can in here!'
              ) : (
                'Press the go button to start...'
              )
            }
            minRows={4}
            multiline
            placeholder='Press the go button then start typing'
            size='medium'
            variant='outlined'
            value={text}
          />
        </div>
        <Button
          color='secondary'
          disabled={isTimerRunning}
          onClick={startTimer}
          variant='contained'
        >
          GO
        </Button>
        <Grow in={!isTimerRunning && text !== ''}>
          <p class='word-count'>Word Count: {calculateWordCount(text)}</p>
        </Grow>
      </Box>
    </div>
  );
};

export default App;
