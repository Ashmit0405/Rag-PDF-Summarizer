import { createContext,useState,useEffect, useCallback } from "react";

export const AuthContext=createContext();

export default function AuthProvider({children}){
    const [user,setUser]=useState(null);
    const [accessToken,setAccessToken]=useState(null);
    const [refreshToken,setRefreshToken]=useState(null);

    const refresh_access=useCallback(async ()=>{
        try {
            const res=await fetch("http://localhost:8000/refresh-token",{
                method: "POST",
                credentials: "include"
            })

            // if(!res.status)
        } catch (error) {
            
        }
    })
}