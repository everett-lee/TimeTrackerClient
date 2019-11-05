import React from 'react';
import LoginForm from '../components/LoginForm.js';
import {render, fireEvent, cleanup} from '@testing-library/react';

afterEach(cleanup)

test('Shows register modal when register clicked', () => {
    const { queryByText, getByText } = render(<LoginForm />);
    
    // at first the modal is not present 
    expect(queryByText(/register/i)).toBeNull();

    fireEvent.click(getByText("Sign up"))

    // the modal appears in the DOM after sign up is clicked 
    expect(getByText(/register/i).textContent).toBe('Register');
});


