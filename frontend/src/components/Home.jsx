
import { DataContext } from "../context/DataProvider"
import { useContext, useEffect, useState } from "react"

import { client } from "../client/client"

import style from "../styles/Home.module.css"

import { Header } from "./Header"

import {Footer} from "./Footer"

import { HomePage } from "./Home1";

import { Carousel } from "./Carousel";

import { Category } from "./Category";

import { VideoField } from "./VideoField"

import { Link } from "react-router-dom"

import addCategory from "../assets/addPost.png"

export const Home=()=>{
    const {
        user,
        setUser,
        isAuth,
        setIsAuth
    }=useContext(DataContext);

    const [categories,setCategories]=useState([]);


    useEffect(()=>{

        client.get("/category/getAll")
            .then(async(res)=>{
                // console.log(res.data)
                setCategories(res.data)
            }).catch((err)=>{
                console.log(err)
                if(err.response.data=="Forbidden"){
                    window.location.reload();
                }
            })
    },[])

    return(
        // isAuth?

        <div className={style.container}>
            <Header></Header>
            <div>
                <HomePage></HomePage>
            </div>

            <div>
                <Carousel items={categories && categories}></Carousel>
            </div>

            <hr></hr>
            
            <div className={style.popularFreelancers}>
                Categories
            </div>

            <div className={style.categories}>
                {
                    categories && categories.map((item,i)=>{
                        return(
                            <div>
                                <Link className={style.categoryContainer} key={i} to={`/category/${item._id}`}>
                                    <Category item={item}></Category>
                                </Link>
                            </div>
                        )
                    })
                }

                <Link style={{textDecoration:"none"}} to="/request/category">
                    <div className={style.addCategory}>
                        <div className={style.addCategoryText}>Cant find the category you are looking?</div>

                        <div className={style.addCategoryImgCont}>
                            <img className={style.addCategoryImg} src={addCategory}/>
                        </div>
                    </div>  
                </Link>

            </div>

            <div>
                <VideoField></VideoField>
            </div>

            <Footer></Footer>
        </div>

        // :
        
        // <div>Please login</div>
    )
}