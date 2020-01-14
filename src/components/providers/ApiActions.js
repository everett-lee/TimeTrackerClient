import axios from 'axios';

/**
 * For making calls to register and/or authenticate with
 * the server in order to get JWT.
 */

const server = 'http://localhost:8080';

function register(email, password) {
    // send post request to register endpoint with
    // email and password in body 
    const response = axios.post(server + '/register', {email, password})
        .then(res => res.data)

    return response
}

function authenticate(email, password) {
    // send post request to autenticate endpoint with
    // email and password in body 
    const response = axios.post(server + '/authenticate', {email, password})
        .then(res => res.data)

    return response
}

export { register, authenticate }