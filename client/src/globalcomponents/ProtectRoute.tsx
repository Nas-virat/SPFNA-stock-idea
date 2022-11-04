import React from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';

interface Props {
    children: JSX.Element[] | JSX.Element
  }

const ProtectRoute : React.FC<Props> = ({ children }) => {

    const { loggedIn } = React.useContext(AuthContext);

    return (
        <>
            {loggedIn !== true ? <Navigate to="/login" /> : children}
        </>
    );
};

export default ProtectRoute;

