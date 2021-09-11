import * as R from 'ramda';
import { useEffect, useReducer } from 'react';
import { initialState, timerReducer } from '../State';
import {
  DECREMENT_TIMER,
  RESET_TIMER,
  SET_TEXT,
  START_TIMER,
  STOP_TIMER,
} from '../State/actions';
import { calculateWordCount, isGameRunning } from '../utils';
import { Box, Button, CardHeader, Grow, TextField } from '@material-ui/core';

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
    <Box maxWidth='500px' mx='auto' py='50px' textAlign='center'>
      <CardHeader
        title='Test your typing speed'
        subheader={`Time Remaining: ${timeRemaining}s`}
      />
      <Box display='flex' flexDirection='column'>
        <TextField
          disabled={!isTimerRunning}
          color='secondary'
          error={R.both(isGameRunning, R.propEq('text', ''))(state)}
          onChange={handleChange}
          label={
            isTimerRunning ? (
              'Type as many words as you can here!'
            ) : (
              'Press go to start...'
            )
          }
          minRows={4}
          multiline
          placeholder='Press the go button then start typing'
          variant='outlined'
          value={text}
        />
        <br />
        <Button
          color='secondary'
          disabled={isTimerRunning}
          onClick={startTimer}
          variant='contained'
        >
          GO
        </Button>
        <Grow in={!isTimerRunning && text !== ''}>
          <p>Word Count: {calculateWordCount(text)}</p>
        </Grow>
      </Box>
    </Box>
  );
};

export default App;
