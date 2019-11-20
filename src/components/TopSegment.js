import React from 'react';
import { Segment } from 'semantic-ui-react';

function TopSegment() {
    return (
        <Segment.Group horizontal className="topSegment">
            <Segment className="selectionBox">Left</Segment>
            <Segment>Right</Segment>
        </Segment.Group>
    );
}

export default TopSegment;
