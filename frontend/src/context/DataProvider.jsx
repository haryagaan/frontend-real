import React from 'react'
import { createContext } from 'react'
import {client} from "../client/client"
import { useState , useEffect } from 'react';

export const DataContext=createContext();

export const DataProvider = (props) => {
    let token=localStorage.getItem("token")

    const [user,setUser]=useState();

    const [userId,setUserId]=useState();

    const [topUsers,setTopUsers]=useState([])

    const [isAuth,setIsAuth]=useState(false);

    useEffect(()=>{
      if(token){
        client.post("/user/return/id/"+token)
        .then(async(res)=>{
          setUserId(res.data);
        }).catch((err)=>{
          console.log(err);
        })
      }
    },[])

    useEffect(()=>{
      if(token){
        client.get("/user/")
          .then(async(res)=>{
            // console.log(res.data);
            setTopUsers(res.data)
          }).catch((err)=>{
            console.log(err);
          })
      }
    },[])

  return (
    <DataContext.Provider value={{user , setUser , isAuth , setIsAuth , userId , setUserId , topUsers , setTopUsers}}>
        {props.children}
    </DataContext.Provider>
  )
}