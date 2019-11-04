import React from 'react';
import { Redirect } from 'react-router-dom';

type Props = {

}

const Logout = (props: Props) => {
    return (
        <Redirect from="/logout" to="/login" />
    );
}

export default Logout;