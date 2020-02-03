import React, { useState } from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react';

import { callTimer } from './Timer';

function TimerBox() {
    const [time, setTime] = useState(0);

    const convertToMinutesAndSecondsDisplay = (timeIn) => {
        // Time will stop updating after 23:59
        if (timeIn >= (60 * 24) - 1) {
            return '23:59'
        }

        const hours = timeIn / 60;
        const seconds = timeIn % 60;
        const hoursLeadingZero = hours < 10 ? '0' : '';
        const secondsLeadingZero = seconds < 10 ? '0' : '';

        return `${hoursLeadingZero}${Math.round(hours)}:${secondsLeadingZero}${seconds}`;
    }

    const handleTimerClick = () => {
        callTimer(setTime);
    }

    return (
        <Segment id="timerBox">
            <Grid columns={2} stackable textAlign='center'>
                <Grid.Column id='timerCol'>
                    <div className='counterWrapper'>
                        <button className="timerButton" onClick={handleTimerClick}>{convertToMinutesAndSecondsDisplay(time)}
                        </button>
                    </div>
                </Grid.Column>
                <Grid.Column id='timerCol'>
                    <Button.Group id='timerButtons'>
                        <Button size='huge' basic color='green'>Save</Button>
                        <Button size='huge' basic color='green'>Reset</Button>
                    </ Button.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default TimerBox;
