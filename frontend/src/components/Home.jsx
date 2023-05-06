
import { DataContext } from "../context/DataProvider"
import { useContext } from "react"

import style from "../styles/Home.module.css"

import { Header } from "./Header"

import {Footer} from "./Footer"

export const Home=()=>{
    const {
        user,
        setUser,
        isAuth,
        setIsAuth
    }=useContext(DataContext);

    return(
        // isAuth?

        <div className={style.container}>
            <Header></Header>
            home
            <Footer></Footer>
        </div>

        // :
        
        // <div>Please login</div>
    )
}