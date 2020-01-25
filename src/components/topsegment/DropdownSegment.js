import React, { useState } from 'react';
import { Segment, Dropdown, Button, Modal } from 'semantic-ui-react';

import AddClientModal from './modals/AddClientModal';
import AddTaskModal from './modals/AddTaskModal';

function DropdownSegment({ items, refetch, deleteItem, itemName, setActiveItem, activeClientId }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);

    //const taskContext = useContext(TaskContext);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    // update the dropdown value, the id associated with the 
    // selected item
    const handleDropdownChange = (e, { value }) => {
        setDropdownValue(value);
        setActiveItem(value);
    }

    const callDeleteItem = () => {
        deleteItem(dropdownValue);
        setDropdownValue(null);
    }

    let modal;
    switch (itemName) {
        case 'client':
            modal = <AddClientModal onClose={handleClose}> </AddClientModal>;
            break;
        case 'task':
            modal = <AddTaskModal onClose={handleClose} activeClientId={activeClientId}> </AddTaskModal>;
            break;
    }

    return (
        <Segment.Group horizontal>
            <Segment id="dropdownContainerLeft" textAlign="center">
                <Dropdown
                    id="dropdown"
                    placeholder={`Select ${itemName}`}
                    options={items}
                    onClick={() => refetch()}
                    onChange={handleDropdownChange}
                    search selection
                    value={dropdownValue} />
            </Segment>
            <Segment textAlign="center">
                <Button basic onClick={callDeleteItem}>Delete {itemName}</Button>
            </Segment>
            <Segment textAlign="center">
                <Modal
                    trigger={<Button basic onClick={handleOpen}>New {itemName}</Button>}
                    open={modalOpen} >
                    <Modal.Header>Add {itemName}</Modal.Header>
                    <Modal.Content>
                        {modal}
                    </Modal.Content>
                </Modal>
            </Segment>
        </Segment.Group>
    );
}

export default DropdownSegment;
