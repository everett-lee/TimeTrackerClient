import React, { useContext, useState } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import { AuthenticationContext } from './providers/AuthenticationProvider';
import RegisterModal from './RegisterModal';


function LoginForm() {
    const authentcationContext = useContext(AuthenticationContext);
    const [active, modalActive] = useState(false);

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
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                            />

                            <Button content='Login' primary />
                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle' className="loginGridColumn">
                        <RegisterModal 
                            trigger={<Button content='Sign up'
                            icon='signup' size='big' 
                            onClick = { () => changeModalState() }/>}
                            modalActive={ active }
                            changeState={ () => {  changeModalState() } }
                          />
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        </div>
  );
}

export default LoginForm;
