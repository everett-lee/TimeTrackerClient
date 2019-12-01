import React from 'react';
import { Segment } from 'semantic-ui-react';
import TimerBox from "./TimerBox";
import DropdownSegment from "./DropdownSegment";

function TopSegment() {
    return (
        <Segment.Group horizontal id="topSegment">
            <Segment id="selectionBox">
                <DropdownSegment />
            </Segment>
            <TimerBox></TimerBox>
        </Segment.Group>
    );
}

export default TopSegment;
