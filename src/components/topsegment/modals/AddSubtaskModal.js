import React, { useState, useContext } from 'react';
import { useMutation, onCompleted } from '@apollo/react-hooks';
import { Button, Form } from 'semantic-ui-react'
import { AuthenticationContext } from '../../providers/AuthenticationProvider';

import Mutations from '../../../graphql/Mutations'

function AddSubtaskModal({ onClose, activeTaskId, refetch, subtasks }) {
    const authenticationContext = useContext(AuthenticationContext);

    const [subtaskName, setSubtaskName] = useState('');
    const [category, setCategory] = useState('');
    const [dependsOnIds, setDependsOnIds] = useState([]);

    // Define mutation, which will refetch results on completion
    const [createSubtask] = useMutation(Mutations.CREATE_SUBTASK,
        {
            onCompleted: () => {
                refetch()
            }
        });

    const subtaskNameOnChangeHandler = ({ target: { value } }) => {
        setSubtaskName(value);
    }

    const categoryOnChangeHandler = ({ target: { value } }) => {
        setCategory(value);
    }
    const dropdownOnChangeHandler = (e, { value }) => {
        setDependsOnIds(value);
    }

    const callCreateSubtask = () => {
        // if all fields are completed
        if (subtaskName && category) {
            createSubtask({
                variables:
                {
                    "ownerId": authenticationContext.user.id,
                    "taskId": activeTaskId,
                    "subtaskName": subtaskName,
                    "category": category,
                    "dependsOnIds": dependsOnIds
                }
            });
            onClose();
        }
    }

    return (
        <Form>
            <Form.Input required={true}
                label={'Subtask name'}
                placeholder={'Subtask name'}
                onChange={subtaskNameOnChangeHandler}
                value={subtaskName} />
            <Form.Input required={true}
                label={'Category'}
                placeholder={'Category'}
                onChange={categoryOnChangeHandler}
                value={category} />
            <Form.Dropdown fluid multiple selection required={true}
                label={'Depends on'}
                placeholder={'Select tasks'}
                options={subtasks}
                onClick={() => refetch()}
                onChange={dropdownOnChangeHandler} />
            <Button type='submit' onClick={callCreateSubtask}>
                Save
            </Button>
            <Button type='close' onClick={onClose}>
                Close
            </Button>
        </Form>
    )
}

export default AddSubtaskModal;