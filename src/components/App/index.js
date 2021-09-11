import * as R from 'ramda';
import { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../../state';
import { DECREMENT_TIMER, STOP_TIMER } from '../../state/actions';
import { isGameRunning } from '../../utils';
import Box from '@material-ui/core/Box';
import WordCount from '../WordCount';
import GameInputs from '../GameInputs';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isTimerRunning, timeRemaining } = state;

  const setTimer = () => {
    setTimeout(() => {
      dispatch(DECREMENT_TIMER);
    }, 1000);
  };

  useEffect(
    () => R.ifElse(isGameRunning, setTimer, () => dispatch(STOP_TIMER))(state),
    [isTimerRunning, timeRemaining]
  );

  return (
    <div className='app'>
      <h1>Test your typing speed</h1>
      <h2>
        Time Remaining: <span>{timeRemaining}s</span>
      </h2>
      <Box display='flex' flexDirection='column'>
        <GameInputs dispatch={dispatch} state={state} />
        <WordCount state={state} />
      </Box>
    </div>
  );
};

export default App;
