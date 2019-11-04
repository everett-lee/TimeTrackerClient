import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthenticationProvider } from './components/providers/AuthenticationProvider';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <AuthenticationProvider>
        <App />
    </AuthenticationProvider>
    ,
    document.getElementById('root')
);

