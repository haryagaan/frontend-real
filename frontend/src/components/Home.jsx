
import { DataContext } from "../context/DataProvider"
import { useContext } from "react"

import { useRef } from 'react';

import style from "../styles/Home.module.css"

import { Header } from "./Header"

import {Footer} from "./Footer"

import { HomePage } from "./Home1";

import { Carousel } from "./Carousel";

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
            <div>
                <HomePage></HomePage>
            </div>

            <div>
                <Carousel></Carousel>
            </div>
            <Footer></Footer>
        </div>

        // :
        
        // <div>Please login</div>
    )
}