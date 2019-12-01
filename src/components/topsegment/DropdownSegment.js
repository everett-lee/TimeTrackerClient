import React from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';

function DropdownSegment() {
    return (
        <Segment.Group horizontal>
            <Segment>
                <Dropdown placeholder='NT' search selection options={{text:"nt", value:"hi"}} />
            </Segment>
            <Segment>Right</Segment>
      </Segment.Group>
    );
}

export default DropdownSegment;
