import React, { createContext } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
export const AuthContext= createContext()
import Cookies from "js-cookie";

export const AuthContextProvider=({children})=>{
    // const [authUser, setAuthUser] = useState(JSON.parse(Cookies.get('jwt-Token')||localStorage.getItem("ChatApp User Info")) || null);
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("ChatApp User Info")) || null);
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}


export const useAuthContext = () => {
	return useContext(AuthContext);
};