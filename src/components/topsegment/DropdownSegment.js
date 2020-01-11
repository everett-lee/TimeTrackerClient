import React from 'react';
import { Segment, Dropdown, Button, Modal } from 'semantic-ui-react';

import AddcClientModal from './AddClientModal';

function DropdownSegment({ clients }) {
    return (
        <Segment.Group horizontal>
            <Segment>
                <Dropdown placeholder='Client' options={clients} search selection />
            </Segment>
            <Segment>
                <Modal trigger={<Button basic>New client</Button>}>
                    <Modal.Header>Add client</Modal.Header>
                    <Modal.Content>
                        <AddcClientModal></AddcClientModal>
                    </Modal.Content>
                </Modal>
            </Segment>
        </Segment.Group>
    );
}

export default DropdownSegment;
