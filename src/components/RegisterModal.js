import React from 'react';
import { Modal,Button, Form } from 'semantic-ui-react'

function RegisterModal(props) {

    return (
        <Modal trigger={ props.trigger } centered={ true } open={ props.modalActive }>
            <Modal.Header>Register</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' />
                    </Form.Field>
                    <Button type='submit' onClick={ props.changeState }>
                        Submit
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default RegisterModal