import React from 'react';
import { Segment, Dropdown, Button, Modal } from 'semantic-ui-react';

function DropdownSegment({ clients }) {
    return (
        <Segment.Group horizontal>
            <Segment>
                <Dropdown placeholder='Client' options={clients} search selection />
            </Segment>
            <Segment>
                <Modal trigger={<Button basic>New client</Button>}>
                    <Modal.Header>Select a Photo</Modal.Header>
                </Modal>
            </Segment>
        </Segment.Group>
    );
}

export default DropdownSegment;
