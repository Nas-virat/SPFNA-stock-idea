

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