import style from "../styles/PostPage.module.css"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

import {BsHouseDoor} from "react-icons/bs"

import { client } from "../client/client"

import { useParams ,Link } from "react-router-dom"
import { useEffect, useState } from "react"

export const PostPage=()=>{
    const type=useParams().type;

    const postId=useParams().post;

    const [category,setCategory]=useState();
    const [creator,setCreator]=useState();

    useEffect(()=>{
        client.get("/post/"+type+"/"+postId)
            .then(async(res)=>{
                // console.log(res.data)
                setCategory(res.data.category.jobId);
                setCreator(res.data.creator)
            }).catch((err)=>{
                console.log(err)
            })
    },[]);

    console.log(category , creator)
    
    return (
        <div className={style.container}>
            <Header></Header>

                <div className={style.main}>
                    <div className={style.categoryContainer}>
                        <BsHouseDoor className={style.houseIcon}></BsHouseDoor>
                        <p className={style.slash}>/</p>
                        <p className={style.category}>{}</p>
                        <p className={style.slash}>/</p>
                        <p className={style.category}>{}</p>
                    </div>
                </div>
                
            <Footer></Footer>
        </div>
    )
}