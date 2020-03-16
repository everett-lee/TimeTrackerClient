import React, { useState } from 'react';
import { Segment } from 'semantic-ui-react';

import Slider from './Slider';

import convertToMinutesAndSecondsDisplay from '../topsegment/timer/ConvertToMinutesAndSeconds';

function SliderContainer({ timeCommit }) {
    const min = 0;
    const max = 288;

    // Represent as five minute increments
    const asFiveMinutes = (seconds) => {
        return Math.round(seconds / (60 * 5));
    }

    // Represent five minute increments as seconds
    const asSeconds = (fiveMinuteIncrements) => {
        return fiveMinuteIncrements * (60 * 5);
    }

    // Convert time from five minute segments to seconds
    // the display as hours:minutes:seconds
    const handleDisplayTime = (timeIn) => {
        // Hide seconds flag set to true
        return convertToMinutesAndSecondsDisplay(asSeconds(timeIn), true);
    }

    const { time, date } = timeCommit;

    const [value, setValue] = useState(asFiveMinutes(time));

    const handleSliderChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <Segment.Group>
            <Segment>
                <Slider
                    handleSliderChange={handleSliderChange}
                    min={min}
                    max={max}
                    value={value}
                />
            </Segment>
            <Segment.Group horizontal>
                <Segment>{new Date(date).toDateString()}</Segment>
                <Segment>{handleDisplayTime(value)}</Segment>
                <Segment>Right</Segment>
            </Segment.Group>
        </Segment.Group>
    );
}

export default SliderContainer