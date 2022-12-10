import React from 'react';
import { Navigate } from 'react-router-dom';

import { ChildProps } from '../interface/ChildProps';


const ProtectRoute : React.FC<ChildProps> = ({ children }) => {

    const loggedIn = localStorage.getItem('user') ? true : false;

    return (
        <>
            {loggedIn !== true ? <Navigate to="/login" /> : children}
        </>
    );
};

export default ProtectRoute;

