import React from 'react';
import { Segment } from 'semantic-ui-react';
import TimerBox from "./TimerBox";

function TopSegment() {
    return (
        <Segment.Group horizontal id="topSegment">
            <Segment id="selectionBox"> Left</Segment>
            <TimerBox></TimerBox>
        </Segment.Group>
    );
}

export default TopSegment;
