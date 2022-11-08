import {useState} from 'react';
import React from 'react';
import { ChildProps } from '../interface/ChildProps';
import { IAuth } from '../interface/IAuth';

export const AuthContext = React.createContext<IAuth>(
    {   
        "loggedIn": false,
        "role": '',
        "username": '',
        "img": '',
        setAuth:() => {}
    });

export const AuthProvider:React.FC<ChildProps> = ({ children }) => {
    const [auth, setAuth] = useState({
        loggedIn: false,
        role: "",
        username : "",
        img:""
    });

    return (
        <AuthContext.Provider
            value={{ 
                ...auth,
                setAuth,
            }}>
            {children}
        </AuthContext.Provider>
    );
};