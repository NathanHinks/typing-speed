import * as R from 'ramda';
import { Fragment, useEffect, useRef, useState } from 'react';
import { RESET_TIMER, SET_TEXT, START_TIMER } from '../../itate/actions';
import { isGameRunning } from '../../utils';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const GameInputs = ({ state, dispatch }) => {
  const textInputRef = useRef();
  const [focusInput, setFocusInput] = useState(false);
  const { isTimerRunning, text } = state;

  const startTimer = () => {
    dispatch(RESET_TIMER);
    dispatch(START_TIMER);
    setFocusInput(true);
  };

  const handleChange = ({ target: { value } }) =>
    R.compose(dispatch, R.mergeRight(SET_TEXT))({
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

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default GameInputs;
