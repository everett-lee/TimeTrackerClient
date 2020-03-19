import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form } from 'semantic-ui-react'
import { AuthenticationContext } from '../../providers/AuthenticationProvider';

import Mutations from '../../../graphql/Mutations'

function AddClientModal({ onClose }) {
    const authenticationContext = useContext(AuthenticationContext);

    const [clientName, setClientName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [location, setLocation] = useState('');

    const [createClient] = useMutation(Mutations.CREATE_CLIENT);

    const clientNameOnChangeHandler = ({ target: { value } }) => {
        setClientName(value)
    }

    const businessTypeOnChangeHandler = ({ target: { value } }) => {
        setBusinessType(value)
    }

    const locationOnChangeHandler = ({ target: { value } }) => {
        setLocation(value)
    }

    const callCreateClient = () => {
        // if all fields are completed
        if (clientName && businessType && location) {
            createClient({
                variables:
                {
                    'ownerId': authenticationContext.user.id,
                    'clientName': clientName,
                    'businessType': businessType,
                    'location': location
                }
            });

            onClose();
        }
    }

    return (
        <Form>
            <Form.Input required={true}
                label={'Client name'}
                placeholder={'Client name'}
                onChange={clientNameOnChangeHandler}
                value={clientName} />
            <Form.Input required={true}
                label={'Business Type'}
                placeholder={'Business type'}
                onChange={businessTypeOnChangeHandler}
                value={businessType} />
            <Form.Input required={true}
                label={'Location'}
                placeholder={'Location'}
                onChange={locationOnChangeHandler}
                value={location} />
            <Button type='submit' onClick={callCreateClient}>
                Save
            </Button>
            <Button type='close' onClick={onClose}>
                Close
            </Button>
        </Form>
    )
}

export default AddClientModal;