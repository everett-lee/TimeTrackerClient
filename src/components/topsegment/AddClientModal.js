import React, { useState } from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react'

function AddClientModal({ }) {

    const [clientName, setClientName] = useState('');
    const [businessType, setbusinessType] = useState('');

    const clientNameOnChangeHandler = (e) => {
        setClientName(e.target.value)
    }

    const businessTypeOnChangeHandler = (e) => {
        setbusinessType(e.target.value)
    }

    const callAddClient = () => {
        console.log(clientName, businessType)
        return;
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
            {'resultMessage()'}
            <Button type='submit' onClick={callAddClient}>
                Save
            </Button>
        </Form>
    )
}

export default AddClientModal;