import style from "../styles/PostPage.module.css"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Stars } from "../components/Stars"

import {BsHouseDoor} from "react-icons/bs"

import { client } from "../client/client"

import { useParams ,Link } from "react-router-dom"
import { useEffect, useState } from "react"

import ReactSimplyCarousel from "react-simply-carousel"

export const PostPage=()=>{
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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

    // console.log(post , creator)
    
    return (
        <div className={style.container}>
            <Header></Header>

            <div className={style.main}>
                <div className={style.innerContainer}>
                    <div className={style.categoryContainer}>
                        <BsHouseDoor className={style.houseIcon}></BsHouseDoor>
                        <p className={style.slash}>/</p>
                        <a href={`/category/${post && post.jobId.category._id}`} className={style.category}>{post && post.jobId.category.category}</a>
                        <p className={style.slash}>/</p>
                        <a href={`/job/${post && post.jobId._id}`} className={style.category}>{post && post.jobId.name}</a>
                    </div>
                </div>

                <div className={style.postContainer}>
                    <div className={style.titleContainer}>
                        {post && post.title}
                    </div>

                    <hr></hr>

                    <div className={style.creatorContainer}>
                        <a href={`/profile/${creator && creator._id}`} className={style.creatorImgContainer}>
                            <img className={style.creatorImg} src={creator && creator.imageUrl}/>
                        </a>

                        <a href={`/profile/${creator && creator._id}`} className={style.creatorNameContainer}>
                            {creator && creator.firstName}
                        </a>

                        <a href={`/profile/${creator && creator._id}`} className={style.creatorNameContainer}>
                            {creator && creator.lastName}
                        </a>

                        <div className={style.verticalLine}></div>

                        <div>
                            <Stars creator={creator}></Stars>
                        </div>
                    </div>

                    <hr></hr>

                    <div className={style.postInfoContainer}>
                        <div className={style.postImageContainer}>
                            <img className={style.postImage} src={post && post.imageUrl}/>
                        </div>

                        <div className={style.infoContainer}>
                            <p>{post && post.mainText}</p>
                        </div>
                    </div>

                </div>

            </div>
                
            <Footer></Footer>
        </div>
    )
}