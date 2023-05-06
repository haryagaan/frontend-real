import React from 'react'
import { createContext } from 'react'
import {client} from "../client/client"
import { useState , useEffect } from 'react';

export const DataContext=createContext();

export const DataProvider = (props) => {
    let token=localStorage.getItem("token")

    const [user,setUser]=useState();

    const [isAuth,setIsAuth]=useState(false);

  return (
    <DataContext.Provider value={{user,setUser,isAuth,setIsAuth}}>
        {props.children}
    </DataContext.Provider>
  )
}