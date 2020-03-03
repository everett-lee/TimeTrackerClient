import React, { useState } from 'react';
import { Segment, Dropdown, Button, Modal } from 'semantic-ui-react';

import AddClientModal from './modals/AddClientModal';
import AddTaskModal from './modals/AddTaskModal';
import AddSubtaskModal from './modals/AddSubtaskModal';

function DropdownSegment({ items, refetch, deleteItem, itemName, setActiveItem, activeClientId, activeTaskId,
    addDisabled, deleteDisabled }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(null);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    // update the dropdown value, the id associated with the 
    // selected item
    const handleDropdownChange = (e, { value }) => {
        setDropdownValue(value);
        setActiveItem(value);
    }

    const callDeleteItem = () => {
        if (dropdownValue) {
            deleteItem(dropdownValue);
            setDropdownValue(null);
            setActiveItem(null);
        }
    }

    let modal;
    switch (itemName) {
        case 'client':
            modal = <AddClientModal onClose={handleClose}> </AddClientModal>;
            break;
        case 'task':
            modal = <AddTaskModal onClose={handleClose} activeClientId={activeClientId}> </AddTaskModal>;
            break;
        case 'subtask':
            modal = <AddSubtaskModal onClose={handleClose} activeTaskId={activeTaskId} subtasks={items} refetch={refetch}> </AddSubtaskModal>;
            break;
        default: 
            modal = null;
    }

    const deleteButton = deleteDisabled ? <Button disabled basic onClick={callDeleteItem}>Delete {itemName}</Button> :
        <Button basic onClick={callDeleteItem}>Delete {itemName}</Button>

    const addButton = addDisabled ? <Button disabled basic onClick={handleOpen}>New {itemName}</Button> :
        <Button basic onClick={handleOpen}>New {itemName}</Button>

    return (
        <Segment.Group horizontal>
            <Segment id="dropdownContainerLeft" textAlign="center">
                <Dropdown
                    search selection
                    id="dropdown"
                    placeholder={`Select ${itemName}`}
                    options={items}
                    onClick={() => refetch()}
                    onChange={handleDropdownChange}
                    value={dropdownValue} />
            </Segment>
            <Segment textAlign="center">
                {deleteButton}
            </Segment>
            <Segment textAlign="center">
                <Modal
                    trigger={addButton}
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
