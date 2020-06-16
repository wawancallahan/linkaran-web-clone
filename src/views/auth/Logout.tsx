import * as React from 'react';
import { Redirect } from 'react-router-dom';

const Logout: React.FC = () => {
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