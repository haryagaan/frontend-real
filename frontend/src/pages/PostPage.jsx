import style from "../styles/PostPage.module.css"

import ReactSimplyCarousel from 'react-simply-carousel';

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Stars } from "../components/Stars"

import {BsHouseDoor} from "react-icons/bs"
import {AiFillLike} from "react-icons/ai"
import {AiFillDislike} from "react-icons/ai"

import { client } from "../client/client"

import { DataContext } from "../context/DataProvider";

import { useParams ,Link } from "react-router-dom"
import { useEffect, useState , useContext } from "react"


export const PostPage=()=>{
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const {userId}=useContext(DataContext);

    const type=useParams().type;

    const postId=useParams().post;

    const [post,setPost]=useState();
    const [creator,setCreator]=useState();
    const [liked,setLiked]=useState();
    const [disliked,setDisliked]=useState();

    useEffect(()=>{
            client.get("/post/"+type+"/"+userId+"/"+postId)
            .then(async(res)=>{
                console.log(res.data)
                setPost(res.data.category);
                setCreator(res.data.creator);
                setLiked(res.data.liked);
                setDisliked(res.data.disliked);
            }).catch((err)=>{
                console.log(err)
            })
    },[]);



    async function Like(){
        client.post("/post/"+type+"/like/"+userId+"/"+postId)
            .then(async(res)=>{
                console.log(res.data)
                setLiked(1111)
                // window.location.reload()
            }).catch((err)=>{
                console.log(err);
            })
    }

    async function Dislike(){
        client.post("/post/"+type+"/dislike/"+userId+"/"+postId)
        .then(async(res)=>{
            console.log(res.data)
            setDisliked(111)
            // window.location.reload()
        }).catch((err)=>{
            console.log(err);
        })
    }
    
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

                        <div className={style.likeContainer}>
                            <p>Total ({post && post.totalReacts.length})</p>
                            <AiFillLike onClick={Like} className={liked==-1 ? style.neutral : style.like}></AiFillLike>
                            <p>({post && post.likes.length})</p>
                            <AiFillDislike onClick={Dislike} className={disliked==-1 ? style.neutral : style.dislike}></AiFillDislike>
                            <p>({post && post.dislikes.length})</p>
                        </div>
                    </div>

                    <hr></hr>

                    <div className={style.postInfoContainer}>
                        <div className={style.postImageContainer}>
                            {/* <img className={style.postImage} src={post && post.imageUrl}/> */}
                            <ReactSimplyCarousel
                                activeSlideIndex={activeSlideIndex}
                                onRequestChange={setActiveSlideIndex}
                                itemsToShow={1}
                                itemsToScroll={1}
                                forwardBtnProps={{
                                //here you can also pass className, or any other button element attributes
                                style: {
                                    alignSelf: 'center',
                                    background: 'black',
                                    border: 'none',
                                    borderRadius: '50%',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    height: 30,
                                    lineHeight: 1,
                                    textAlign: 'center',
                                    width: 30, 
                                    backgroundColor: "#7246e5"
                                },
                                children: <span>{`>`}</span>,
                                }}
                                backwardBtnProps={{
                                //here you can also pass className, or any other button element attributes
                                style: {
                                    alignSelf: 'center',
                                    background: 'black',
                                    border: 'none',
                                    borderRadius: '50%',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    height: 30,
                                    lineHeight: 1,
                                    textAlign: 'center',
                                    width: 30,
                                    backgroundColor: "#7246e5"
                                },
                                children: <span>{`<`}</span>,
                                }}
                                responsiveProps={[
                                {
                                    itemsToShow: 1,
                                    itemsToScroll: 1,
                                    minWidth: 300,
                                },
                                ]}
                                speed={400}
                                easing="linear"
                            >
                                {
                                   post && post.imageUrl.map((src,i)=>{
                                    return(
                                        <img className={style.postImage} src={src}/>
                                    )
                                   })
                                }
                            </ReactSimplyCarousel>
                        </div>

                        <div className={style.infoContainer}>
                            <p>{post && post.mainText}</p>
                        </div>
                    </div>

                </div>

            </div>

            <hr></hr>
                
            <Footer></Footer>
        </div>
    )
}