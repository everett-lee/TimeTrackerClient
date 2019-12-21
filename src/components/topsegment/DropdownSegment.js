import React from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';

function DropdownSegment({ clients }) {
    return (
        <Segment.Group horizontal>
            <Segment>
                <Dropdown placeholder='Client' options={clients} search selection />
            </Segment>
            <Segment>
                
            </Segment>
      </Segment.Group>
    );
}

export default DropdownSegment;
