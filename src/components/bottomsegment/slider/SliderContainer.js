import React, { useState } from 'react';
import { Segment, Button } from 'semantic-ui-react';

import Slider from './Slider';
import SliderDisplay from './SliderDisplay';

import convertToMinutesAndSecondsDisplay from '../../topsegment/timer/ConvertToMinutesAndSeconds';

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

    const { id, time, date } = timeCommit;
    const [value, setValue] = useState(asFiveMinutes(time));

    const handleSliderChange = ({ target: { value } }) => {
        setValue(value);
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
            <SliderDisplay 
            date={new Date(date).toDateString()} 
            displayTime={handleDisplayTime(value)}
            timeCommitId={new Number(id)}
            time={asSeconds(value)}
            />
        </Segment.Group>
    );
}

export default SliderContainer