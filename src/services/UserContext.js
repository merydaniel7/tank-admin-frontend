import React, {useState, useEffect, createContext} from 'react';
import cookie from 'react-cookies';


export const UserContext = createContext();

export const UserInfoProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(cookie.load("Authorization"));    
    const [userName, setUserName] = useState(cookie.load("username"));
    const [loginOrLogoutTriggered, setLoginOrLogoutTriggered] = useState(false);

    useEffect(() => {
        if (cookie.load("Authorization")){
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setLoginOrLogoutTriggered(false);        
    }, [loginOrLogoutTriggered])
    
    return (
        <UserContext.Provider value={{isLoggedIn, setLoginOrLogoutTriggered, userName, setUserName}}>
            {props.children}
        </UserContext.Provider>
    );
}