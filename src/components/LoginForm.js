import React, { useContext, useState } from 'react';
import { Button, Divider, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { AuthenticationContext } from './providers/AuthenticationProvider';
import RegisterModal from './RegisterModal';
import { register, authenticate } from './providers/RequestAPI';

function LoginForm() {
    const authentcationContext = useContext(AuthenticationContext);

    const [active, modalActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalErrorMsg, setModalErrorMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const emailOnChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordOnChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    // register the user and update the user object if successful
    // otherwise display an error in the modal
    const callRegisterEndpoint = async () => {
        let user;
        let msg;

        if (email === '' || password === '') {
            return;
        }

        try {
            user = await register(email, password);
        } catch (error) {
            // response from server
            if (error.response) {
                msg = error.response.data.message;
                // server not reached
            } else {
                msg = 'Unable to reach server'
            }
            setModalErrorMsg(msg)
        }

        if (user) {
            // switch modal off and clear error if successful
            changeModalState();
            setModalErrorMsg('')
        }
    }

    const callAuthenticateEndpoint = async () => {
        let msg;
        let user;

        if (email === '' || password === '') {
            return;
        }

        try {
            user = await authenticate(email, password);
            console.log(user)
        } catch (error) {
            // response from server
            if (error.response) {
                msg = error.response.data.message;
                // server not reached
            } else {
                msg = 'Unable to reach server'
            }
            setErrorMsg(msg)
        }

        if (user) {
            // clear error message
            authentcationContext.setUser(user);
            authentcationContext.setAuthenticated(true);
            setErrorMsg('')
        }
    }

    const displayError = () => {
        if (errorMsg.length >= 1) {
            return (
                <Message negative>
                    <Message.Header>{errorMsg}</Message.Header>
                </Message>
            );
        }
    }

    const changeModalState = () => {
        modalActive(!active)
    }

    return (
        <div className="loginDiv">
            <Segment placeholder className="loginSegment">
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column className="loginGridColumn">
                        <Form>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='Username'
                                placeholder='Username'
                                value={email}
                                onChange={emailOnChangeHandler} />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                                value={password}
                                onChange={passwordOnChangeHandler} />
                            <Button content='Login' primary
                                onClick={callAuthenticateEndpoint} />
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle' className="loginGridColumn">
                        <RegisterModal
                            data-testid="registerModal"
                            trigger={<Button content='Sign up'
                                icon='signup' size='big'
                                onClick={changeModalState} />}
                            active={active}
                            callRegisterEndpoint={callRegisterEndpoint}
                            password={password}
                            passwordOnChangeHandler={passwordOnChangeHandler}
                            email={email}
                            emailOnChangeHandler={emailOnChangeHandler}
                            error={modalErrorMsg}
                            changeModalState={changeModalState}
                        />
                    </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
                {displayError()}
            </Segment>
        </div>
    );
}

export default LoginForm;
