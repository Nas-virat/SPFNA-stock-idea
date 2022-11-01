import {useState} from 'react';
import React from 'react';

export interface IAuth {
    loggedIn: boolean;
    role: string;
    logIn: () => void;
    logOut: () => void;
}

interface Props {
    children: JSX.Element[] | JSX.Element
  }

export const AuthContext = React.createContext<IAuth>({"loggedIn":false, "role":'', "logIn":() => {}, "logOut":() => {}});

export const AuthProvider:React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState({
        loggedIn: false,
        role: ""
    });

    const logIn = () => {
        setAuth(prevState => ({
            ...prevState,
            loggedIn: true
        }));
    };

    const logOut = () => {
        setAuth(prevState => ({
            ...prevState,
            loggedIn: false
        }));
    };

    return (
        <AuthContext.Provider
            value={{ 
                ...auth,
                logIn,
                logOut
            }}>
            {children}
        </AuthContext.Provider>
    );
};