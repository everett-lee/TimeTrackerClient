import React, { useState, useContext } from 'react';
import { Segment, Dropdown, Button, Modal } from 'semantic-ui-react';

import AddClientModal from './AddClientModal';
import { TaskContext } from '../providers/TaskProvider';

function DropdownSegment({ items, refetch, deleteItem }) {
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

    // update store
    if (items.type === "CLIENTS") {
        taskContext.setClients(items.results);
    }

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
                    options={items.results}
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
                        <AddClientModal onClose={handleClose}> </AddClientModal>
                    </Modal.Content>
                </Modal>
            </Segment>
        </Segment.Group>
    );
}

export default DropdownSegment;
