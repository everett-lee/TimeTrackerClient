import React, { useState } from 'react';
import { Segment } from 'semantic-ui-react';

import Slider from './Slider';
import SliderDisplay from './SliderDisplay';

import convertToHoursMinutesAndSecondsDisplay from '../../topsegment/timercomponents/ConvertToHoursMinutesAndSeconds';

/**
 * Contains the slider for adjusting time associated with
 * time commit and its relevant details.
 */
function SliderContainer({ timeCommit, setMessage }) {
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
        return convertToHoursMinutesAndSecondsDisplay(asSeconds(timeIn), true, true);
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
            timeCommitId={Number(id)}
            time={asSeconds(value)}
            setMessage={setMessage}
            />
        </Segment.Group>
    );
}

export default SliderContainer