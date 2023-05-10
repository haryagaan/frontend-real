import style from "../styles/PostPage.module.css"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Stars } from "../components/Stars"

import {BsHouseDoor} from "react-icons/bs"

import { client } from "../client/client"

import { useParams ,Link } from "react-router-dom"
import { useEffect, useState } from "react"


export const PostPage=()=>{
    const type=useParams().type;

    const postId=useParams().post;

    const [post,setPost]=useState();
    const [creator,setCreator]=useState();

    useEffect(()=>{
        client.get("/post/"+type+"/"+postId)
            .then(async(res)=>{
                console.log(res.data)
                setPost(res.data.category);
                setCreator(res.data.creator);
            }).catch((err)=>{
                console.log(err)
            })
    },[]);

    console.log(post , creator)
    
    return (
        <div className={style.container}>
            <Header></Header>

            <div className={style.main}>
                <div className={style.innerContainer}>
                    <div className={style.categoryContainer}>
                        <BsHouseDoor className={style.houseIcon}></BsHouseDoor>
                        <p className={style.slash}>/</p>
                        <p className={style.category}>{post && post.jobId.category.category}</p>
                        <p className={style.slash}>/</p>
                        <p className={style.category}>{post && post.jobId.name}</p>
                    </div>
                </div>

                <div className={style.postContainer}>
                    <div className={style.titleContainer}>
                        {post && post.title}
                    </div>

                    <hr></hr>

                    <div className={style.creatorContainer}>
                        <div className={style.creatorImgContainer}>
                            <img className={style.creatorImg} src={creator && creator.imageUrl}/>
                        </div>

                        <div className={style.creatorNameContainer}>
                            {creator && creator.firstName}
                        </div>

                        <div className={style.creatorNameContainer}>
                            {creator && creator.lastName}
                        </div>

                        <div className={style.verticalLine}> </div>

                        <div>
                            <Stars></Stars>
                        </div>
                    </div>

                    <hr></hr>

                </div>

            </div>
                
            <Footer></Footer>
        </div>
    )
}