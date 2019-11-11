import React, { useContext, useState } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import { AuthenticationContext } from './providers/AuthenticationProvider';
import RegisterModal from './RegisterModal';
import { register } from './providers/RequestAPI';

function LoginForm() {
    const authentcationContext = useContext(AuthenticationContext);
    const [active, modalActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const REGEX = /already exists/i;

    // register the user and update the user object if successful
    // otherwise display an error in the modal
    const callRegisterEndpoint = async () => {
        let user;
        try {
            user = await register(email, password);
        } catch (error) {
            let msg = error.response.data.message;
            if (REGEX.test(msg)) {
                setErrorMsg(msg)
                setError(true)
            } 
        }
        
        if (user) {
            authentcationContext.setUser(user)

            // switch modal off and clear error if successful
            changeModalState();
            setErrorMsg('')
            setError(false)
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
                                placeholder='Username'/>
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password' />
                            <Button content='Login' primary />
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle' className="loginGridColumn">
                        <RegisterModal
                            data-testid="registerModal"
                            trigger={<Button content='Sign up'
                                icon='signup' size='big'
                                onClick={changeModalState} />}
                            modalActive={active}
                            callRegisterEndpoint={callRegisterEndpoint}
                            password={password}
                            setPassword={setPassword}
                            email={email}
                            setEmail={setEmail}
                            error={error}
                            errorMsg={errorMsg} 
                            />
                    </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
            </Segment>
        </div>
    );
}

export default LoginForm;
