import * as R from 'ramda';
import { calculateWordCount } from '../../utils';
import Grow from '@material-ui/core/Grow';

const WordCount = ({ state }) => {
  const showCount = R.both(
    R.propEq('isTimerRunning', false),
    R.propSatisfies((x) => x !== '', 'text')
  )(state);

  return (
    <Grow in={showCount}>
      <p className='word-count'>Word Count: {calculateWordCount(state)}</p>
    </Grow>
  );
};

export default WordCount;
