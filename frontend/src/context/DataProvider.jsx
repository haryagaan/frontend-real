import React from 'react'
import { createContext } from 'react'
import {client} from "../client/client"
import { useState , useEffect } from 'react';

export const DataContext=createContext();

export const DataProvider = (props) => {
    let token=localStorage.getItem("token")

    const [user,setUser]=useState();

    const [userId,setUserId]=useState();

    const [isAuth,setIsAuth]=useState(false);

    useEffect(()=>{
      client.post("/user/return/id/"+token)
        .then(async(res)=>{
          setUserId(res.data);
        }).catch((err)=>{
          console.log(err);
        })
    },[])

  return (
    <DataContext.Provider value={{user , setUser , isAuth , setIsAuth , userId , setUserId}}>
        {props.children}
    </DataContext.Provider>
  )
}