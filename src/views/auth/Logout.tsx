import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { removeStorage } from '../../services/auth';

const Logout: React.FC = () => {
    removeStorage();

    return (
        <Redirect from="/logout" to="/login" />
    );
}

export default Logout;