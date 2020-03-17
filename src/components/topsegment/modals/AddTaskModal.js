import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form } from 'semantic-ui-react'
import { AuthenticationContext } from '../../providers/AuthenticationProvider';

import Mutations from '../../../graphql/Mutations'

function AddTaskModal({ onClose, activeClientId }) {
    const authenticationContext = useContext(AuthenticationContext);

    const [taskName, setTaskName] = useState('');
    const [createTask] = useMutation(Mutations.CREATE_TASK);

    const taskNameOnChangeHandler = ({ target: { value } }) => {
        setTaskName(value);
    }

    const callCreateTask = () => {
        // if all fields are completed
        if (taskName) {
            createTask({
                variables:
                {
                    "ownerId": authenticationContext.user.id,
                    "taskName": taskName,
                    "clientId": activeClientId
                }
            });

            onClose();
        }
    }

    return (
        <Form>
            <Form.Input required={true}
                label={'Task name'}
                placeholder={'Task name'}
                onChange={taskNameOnChangeHandler}
                value={taskName} />
            <Button type='submit' onClick={callCreateTask}>
                Save
            </Button>
            <Button type='close' onClick={onClose}>
                Close
            </Button>
        </Form>
    )
}

export default AddTaskModal;