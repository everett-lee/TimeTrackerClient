import React from 'react';
import { Segment } from 'semantic-ui-react';

function TimerBox() {
    return (
        <Segment id="timerBox">
            <div class="counterWrapper">
                <div class="counter">00:01</div>
            </div>
        </Segment>
    );
}

export default TimerBox;
