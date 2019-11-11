import React from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react'

function RegisterModal({ callRegisterEndpoint, modalActive, trigger, password, setPassword,
                         email, setEmail, error, errorMsg }) {

    const emailOnChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordOnChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const displayError = () => {
        if (error) {
            return (
            <Message negative>
                <Message.Header>{errorMsg}</Message.Header>
            </Message>
            );
        }
    }

    return (
        <Modal trigger={trigger} centered={true} open={modalActive}>
            <Modal.Header>Register</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input required={true}
                        label={'username'}
                        placeholder={'Username'}
                        onChange={emailOnChangeHandler}
                        value={email} />
                    <Form.Input required={true}
                        label={'password'}
                        placeholder={'Password'}
                        type={'password'}
                        value={password}
                        onChange={passwordOnChangeHandler} />
                    {displayError()}
                    <Button type='submit' onClick={callRegisterEndpoint}>
                        Submit
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default RegisterModal