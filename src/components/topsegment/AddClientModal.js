import React, {useState} from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react'

function AddClientModal({ trigger, active, changeModalState }) {

    const [clientName, setClientName] = useState('');
    const [businesType, setbusinesType] = useState('');

    const clientNameOnChangeHandler = (e) => {
        setClientName(e.target.value)
    }

    const businessTypeOnChangeHandler = (e) => {
        setbusinesType(e.target.value)
    }

    const callAddClient = () => {
        console.log("hi")
        return;
    }

    return (
        <Modal trigger={trigger} centered={true} open={active} >
            <Modal.Header>Register</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input required={true}
                        label={'clientName'}
                        placeholder={'Client name'}
                        onChange={clientNameOnChangeHandler}
                        value={clientName} />
                    <Form.Input required={true}
                        label={'businessType'}
                        placeholder={'Business type'}
                        onChange={businessTypeOnChangeHandler}
                        value={businesType} />
                    {'resultMessage()'}
                    <Button type='submit' onClick={callAddClient}>
                        Save
                    </Button>
                    <Button onClick={changeModalState}>
                        Close
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default AddClientModal;