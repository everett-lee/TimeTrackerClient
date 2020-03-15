import React, { useState } from 'react';
import { Segment } from 'semantic-ui-react'


function Slider({ timeCommit }) {
    const min = 1;
    const max = 288;

    // Represent as five minute increments
    const asFiveMinutes = (seconds) => {
        return Math.round(seconds / (60 * 5));
    }

    // Represent five minute increments as seconds
    const asSeconds = (fiveMinuteIncrements) => {
        return fiveMinuteIncrements * (60 * 5);
    }

    const { time, date } = timeCommit;

    const [value, setValue] = useState(asFiveMinutes(time));

    console.log(time, value)


    const handleSliderChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <Segment.Group>
            <Segment>
                <div className="sliderContainer">
                    <input
                        onInput={handleSliderChange}
                        type="range" min={min}
                        max={max}
                        value={value}
                        className="slider"
                        id="myRange"
                    />
                </div>
            </Segment>
            <Segment.Group horizontal>
                <Segment>{date}</Segment>
                <Segment>{value}</Segment>
                <Segment>Right</Segment>
            </Segment.Group>
        </Segment.Group>
    );
}

export default Slider