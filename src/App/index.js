import { useEffect, useState } from 'react';
import * as R from 'ramda';
import { Box, Button, CardHeader, TextField } from '@material-ui/core';

const App = () => {
    const [text, setText] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(5);
    const [timerRunning, setTimerRunning] = useState(false);

    const startTimer = () => {
        setText('');
        setTimerRunning(true);
        setTimeRemaining(5);
    };

    const setTimer = (timeRemaining) =>
        setTimeout(() => {
            console.log('run');
            setTimeRemaining(timeRemaining - 1);
        }, 1000);

    const handleChange = ({ target: { value } }) => setText(value);

    const calculateWordCount = R.compose(
        R.length,
        R.reject(R.equals('')),
        R.split(' '),
        R.trim
    );

    useEffect(() => R.when(R.gt(0), setTimer)(timeRemaining), [text]);

    return (
        <Box maxWidth="500px" mx="auto" py="50px" textAlign="center">
            <CardHeader
                title="Test your typing speed"
                subheader={`Time Remaining: ${timeRemaining}s`}
            />
            <Box display="flex" flexDirection="column">
                <TextField
                    disabled={!timerRunning}
                    color="secondary"
                    onChange={handleChange}
                    minRows={4}
                    multiline
                    placeholder="Press the start button then begin typing"
                    variant="outlined"
                    value={text}
                />
                <br />
                <Button
                    disabled={timerRunning}
                    color="primary"
                    onClick={startTimer}
                    variant="contained"
                >
                    Start
                </Button>
                {!timerRunning && (
                    <p>total words: {calculateWordCount(text)}</p>
                )}
                <Button
                    color="secondary"
                    onClick={() => setTimerRunning(false)}
                    variant="outlined"
                >
                    Reveal Word Count
                </Button>
            </Box>
        </Box>
    );
};

export default App;
