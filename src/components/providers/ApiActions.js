import axios from 'axios';

/**
 * For making calls to register and/or authenticate with
 * the server in order to get JWT.
 */
const server = 'https://newtimetracker-272513.appspot.com';

function register(email, password) {
    // Send post request to register endpoint with
    // email and password in body 
    const response = axios.post(server + '/register', {email, password})
        .then(res => res.data);

    return response;
}

function authenticate(email, password) {
    // Send post request to authenticate endpoint with
    // email and password in body 
    const response = axios.post(server + '/authenticate', {email, password})
        .then(res => res.data);

    return response;
}

export { register, authenticate }