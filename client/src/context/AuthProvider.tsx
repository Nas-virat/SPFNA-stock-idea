import {useState} from 'react';
import React from 'react';

export interface IAuth {
    loggedIn: boolean;
    role: string;
    username : string;
    img : string;
    setAuth : React.Dispatch<React.SetStateAction<{
    loggedIn: boolean;
    role: string;
    username: string;
    img: string;
    }>>
}

interface Props {
    children: JSX.Element[] | JSX.Element
  }

export const AuthContext = React.createContext<IAuth>({"loggedIn":false, "role":'',"username":'',"img":'',setAuth:()=>{}});

export const AuthProvider:React.FC<Props> = ({ children }) => {
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