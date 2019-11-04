import React from 'react'
import {Button, Segment, Form } from 'semantic-ui-react'

function LoginForm() {
  return (
    <Segment>
        <Form>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Email/username' />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' />
            </Form.Field>
            <Form.Field>
                <Button>Submit</Button>
                <Button>Register</Button>
            </Form.Field>
        </Form>
    </Segment>
  );
}

export default LoginForm;
