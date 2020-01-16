import React, { useState, useContext } from 'react';
import { Segment, Dropdown, Button, Modal } from 'semantic-ui-react';

import AddcClientModal from './AddClientModal';
import { TaskContext } from '../providers/TaskProvider';

function DropdownSegment({ clients, refetch, deleteItem }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);

    const taskContext = useContext(TaskContext);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    // update the dropdown value, the id associated with the 
    // selected item
    const handleDropdownChange = (e, { value }) => {
        setDropdownValue(value)
    }

    // update store of clients
    taskContext.setClients(clients);

    const callDeleteItem = () => {
        deleteItem(dropdownValue);
        setDropdownValue(null);
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
            <Segment textAlign="center">
            <Button basic onClick={callDeleteItem}>Delete client</Button>
            </Segment>
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
