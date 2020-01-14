import React, { useState } from 'react';
import { Segment, Dropdown, Button, Modal } from 'semantic-ui-react';

import AddcClientModal from './AddClientModal';

function DropdownSegment({ clients, refetch }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownValue, setDropdowValue] = useState(null);

    const handleOpen = () => setModalOpen(true);

    const handleClose = () => setModalOpen(false);

    const handleDropdownChange = (e, { value }) => {
        setDropdowValue(value)   
    }

    return (
        <Segment.Group horizontal>
            <Segment id="dropdownContainerLeft" textAlign="center">
                <Dropdown
                    id="dropdown"
                    placeholder='Select client'
                    options={clients}
                    onClick={() => refetch()}
                    onChange={handleDropdownChange}
                    search selection 
                    value={dropdownValue} /> 
            </Segment>
            delete client
            <Segment textAlign="center">
                <Modal
                    trigger={<Button basic onClick={handleOpen}>New client</Button>}
                    open={modalOpen}
               >
                    <Modal.Header>Add client</Modal.Header>
                    <Modal.Content>
                        <AddcClientModal onClose={handleClose}></AddcClientModal>
                    </Modal.Content>
                </Modal>
            </Segment>
        </Segment.Group>
    );
}

export default DropdownSegment;
