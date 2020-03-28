import React from 'react';
import LoginForm from '../components/LoginForm.js';
import { register, authenticate } from '../components/providers/ApiActions';
import {render, fireEvent, cleanup} from '@testing-library/react';

const mockToken = 'token';
const mockUser = { id: 30, token: mockToken};
authenticate.mockImplementation((username, password) => Promise.resolve(mockUser));

afterEach(cleanup);


jest.mock('../components/providers/ApiActions.js');


test('Shows register modal when "sign up" is clicked', () => {
    const { queryByText, getByText } = render(<LoginForm />);
    
    // at first the modal is not present 
    expect(queryByText(/register/i)).toBeNull();

    fireEvent.click(getByText('Sign up'));

    // the modal appears in the DOM after sign up is clicked 
    expect(getByText(/register/i).textContent).toBe('Register');
});


test('Api called when "login" clicked', () => {
    const { getAllByPlaceholderText, getByText } = render(<LoginForm />);
    
    // insert username
    let elements = getAllByPlaceholderText('Username');
    let input = elements[0];
    fireEvent.change(input, { target: { value: 'test' } });

    // insert password
    elements = getAllByPlaceholderText('Password');
    input = elements[0];
    fireEvent.change(input, { target: { value: 'testing' } });

    fireEvent.click(getByText('Login'));

    expect(authenticate).toBeCalled();
});



