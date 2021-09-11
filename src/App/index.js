import * as R from 'ramda';
import { useEffect, useReducer, useRef, useState } from 'react';
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
import WordCount from '../WordCount';

const App = () => {
  const [state, dispatchTimer] = useReducer(timerReducer, initialState);
  const { isTimerRunning, text, timeRemaining } = state;

  const textInputRef = useRef();
  const [focusInput, setFocusInput] = useState(false);

  const startTimer = () => {
    dispatchTimer(RESET_TIMER);
    dispatchTimer(START_TIMER);
    setFocusInput(true);
  };

  const setTimer = () => {
    setTimeout(() => {
      dispatchTimer(DECREMENT_TIMER);
    }, 1000);
  };

  const handleChange = ({ target: { value } }) =>
    R.compose(dispatchTimer, R.mergeRight(SET_TEXT))({
      payload: value,
    });

  useEffect(
    () => {
      if (focusInput) {
        textInputRef.current.focus();
      }
    },
    [isTimerRunning]
  );
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
        <div className='no-bg'>
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
            inputRef={textInputRef}
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
        <WordCount state={state} />
      </Box>
    </div>
  );
};

export default App;
