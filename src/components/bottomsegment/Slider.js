import React from 'react';

function Slider({ handleSliderChange, min, max, value }) {

    return (
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
    );
}

export default Slider