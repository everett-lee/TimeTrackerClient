import React from 'react';
import { Modal, Button, Form, Message } from 'semantic-ui-react'

function RegisterModal({ callRegisterEndpoint, active, changeModalState, trigger, 
                        password, passwordOnChangeHandler, email, emailOnChangeHandler, 
                        error}) {



    const displayError = () => {
        if (error.length >= 1) {
            return (
            <Message negative>
                <Message.Header>{error}</Message.Header>
            </Message>
            );
        }
    }

    return (
        <Modal trigger={trigger} centered={true} open={active} >
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
                    <Button onClick={changeModalState}>
                        Close
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default RegisterModal