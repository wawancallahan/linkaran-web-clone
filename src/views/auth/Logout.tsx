import React from 'react';
import { Redirect } from 'react-router-dom';

type Props = {

}

const Logout = (props: Props) => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("email");
    localStorage.removeItem("role_id");
    localStorage.removeItem("role_name");
    localStorage.removeItem("roles");

    return (
        <Redirect from="/logout" to="/login" />
    );
}

export default Logout;