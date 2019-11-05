import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { signout } from '../data-managers/cookieManager';

class logout extends Component {
    render() {
        signout();

        return <Redirect to="/" />;
    }
}

export default logout;