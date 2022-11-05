import React from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';

import { ChildProps } from '../interface/ChildProps';


const ProtectRoute : React.FC<ChildProps> = ({ children }) => {

    const { loggedIn } = React.useContext(AuthContext);

    return (
        <>
            {loggedIn !== true ? <Navigate to="/login" /> : children}
        </>
    );
};

export default ProtectRoute;

