import style from "../styles/PostPage.module.css"

import ReactSimplyCarousel from 'react-simply-carousel';

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Stars } from "../components/Stars"

import {BsHouseDoor} from "react-icons/bs"
import {AiFillLike} from "react-icons/ai"
import {AiFillDislike} from "react-icons/ai"
import {BsFillReplyFill} from "react-icons/bs"

import { client } from "../client/client"

import { DataContext } from "../context/DataProvider";

import { useParams ,Link } from "react-router-dom"
import { useEffect, useState , useContext } from "react"

import HashLoader from "react-spinners/HashLoader";

export const PostPage=()=>{
    const [loading,setLoading]=useState(true);

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const {userId}=useContext(DataContext);

    const type=useParams().type;

    const postId=useParams().post;

    const [post,setPost]=useState();
    const [creator,setCreator]=useState();
    const [liked,setLiked]=useState();
    const [disliked,setDisliked]=useState();

    const [comment,setComment]=useState();
    const [comments,setComments]=useState();

    const [reply,setReply]=useState();
    const [replies,setReplies]=useState();

    const [showReplyIndex,setShowReplyIndex]=useState();

    useEffect(()=>{
            client.get("/post/"+type+"/"+postId)
            .then(async(res)=>{
                // console.log(res.data)
                setLoading(false)
                setPost(res.data.category);
                setCreator(res.data.creator);
            }).catch((err)=>{
                console.log(err)
            })
    },[]);

    useEffect(()=>{
        if(userId && postId){
            client.get("/post/"+type+"/react/"+userId+"/"+postId)
            .then(async(res)=>{
                // console.log(res.data)
                setLiked(res.data.liked);
                setDisliked(res.data.disliked)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },[]);

    useEffect(()=>{
        const token=localStorage.getItem("token");

        if(token){
            client.get("/post/"+type+"/comment/"+postId)
                .then(async(res)=>{
                    // console.log(res.data);
                    setComments(res.data);
                }).catch((err)=>{
                    console.log(err)
                })
        }
    },[])

    async function Like(){
        // console.log(1)
        client.post("/post/"+type+"/like/"+userId+"/"+postId)
            .then(async(res)=>{
                // console.log(res.data)
                window.location.reload()
            }).catch((err)=>{
                console.log(err);
            })
    }

    async function Dislike(){
        // console.log(1)
        client.post("/post/"+type+"/dislike/"+userId+"/"+postId)
        .then(async(res)=>{
            // console.log(res.data)
            window.location.reload()
        }).catch((err)=>{
            console.log(err);
        })
    }

    async function WriteComment(){
        const token=localStorage.getItem("token");

        await client.post("/post/"+type+"/comment/"+token+"/"+postId , {text:comment})
            .then(async(res)=>{
                // console.log(res.data);
                // setComments(res.data)
                window.location.reload()
            }).catch((err)=>{
                console.log(err);
            })
    }

    async function WriteReply(commentId){
        const token=localStorage.getItem("token");

        if(reply!=""){
            await client.post("/comment/reply/"+token+"/"+commentId , {text:reply})
            .then(async(res)=>{
                // console.log(res.data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    async function getReplyComment(id , index){
        await client.get("/comment/get/"+id)
            .then(async(res)=>{
                // console.log(res.data);
                if(showReplyIndex==index){
                    setShowReplyIndex("")
                }else{
                    setShowReplyIndex(index)
                }
                setReplies(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    }


    return (
        <div className={style.container}>
            {
                loading ? 

                <div style={{width:"100vw" , height:"100vh" , display:"flex" , justifyContent:"center" , alignItems:"center"}}>
                    <HashLoader
                        color={'#7246e5'}
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>

                :

                <div>
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
                                    <p>Нийт хандалт ({post && post.totalReacts.length})</p>
                                    <AiFillLike onClick={Like} className={style.like}></AiFillLike>
                                    <p>({post && post.likes.length})</p>
                                    <AiFillDislike onClick={Dislike} className={style.dislike}></AiFillDislike>
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
                                            color: 'black',
                                            cursor: 'pointer',
                                            fontSize: '20px',
                                            height: 30,
                                            lineHeight: 1,
                                            textAlign: 'center',
                                            width: 30, 
                                            backgroundColor: "white",
                                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                                            marginLeft:"8px"
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
                                            color: 'black',
                                            cursor: 'pointer',
                                            fontSize: '20px',
                                            height: 30,
                                            lineHeight: 1,
                                            textAlign: 'center',
                                            width: 30,
                                            backgroundColor: "white",
                                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                                            marginRight:"8px"
                                        },
                                        children: <span>{`<`}</span>,
                                        }}
                                        responsiveProps={[
                                        {
                                            itemsToShow: 1,
                                            itemsToScroll: 1,
                                            minWidth: 2500,
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
                                    <p className={style.commentMainText}>{post && post.mainText}</p>
                                </div>

                                <h2>Comments</h2>

                                <div className={style.commentsContainer}>
                                    <div className={style.commentsInnerContainer}>
                                        <div className={style.scrollComments}>
                                            {
                                                comments=="" ?
                                                    <div style={{display:"flex" , justifyContent:"center" , color:"grey"}}>No comments</div>
                                                :

                                                comments!=null && comments.map((comment,i)=>{
                                                    let creator;
                                                    if(typeof comment.creatorId==="object" && comment.creatorId!==null){
                                                        creator=comment.creatorId;
                                                    }else if(typeof comment.creatorSocialId==="object" && comment.creatorSocialId!==null){
                                                        creator=comment.creatorSocialId;
                                                    }

                                                
                                                    return (
                                                        <div className={style.comment}>
                                                            <Link style={{display:"flex" , textDecoration:"none" , color:"black"}} to={`/profile/`+creator._id}>
                                                                <div className={style.commentCreatorContainer}>
                                                                    <div className={style.commentCreatorImgCont}>   
                                                                        <img className={style.commentCreatorImg} src={creator.imageUrl}/>
                                                                    </div>
                                                                    <p className={style.commentCreatorName}>{creator.firstName} {creator.lastName}</p>
                                                                </div>

                                                                <div className={style.dateContainer}>
                                                                    {comment.createdAt}
                                                                </div>
                                                            </Link>

                                                            <div className={style.commentText}>
                                                                {comment.text}
                                                            </div>

                                                            <div onClick={()=>getReplyComment(comment._id , i)} className={style.clickReplyContainer}>
                                                                <BsFillReplyFill></BsFillReplyFill>
                                                                Replies
                                                            </div>

                                                            <div className={showReplyIndex == i ? style : style.invisible}>

                                                                <div className={style.replyContainer}>

                                                                    {
                                                                        replies==""?

                                                                        <div style={{display:"flex" , justifyContent:"center" , color:"grey"}}>No Replies</div>

                                                                        :

                                                                        replies && replies.map((reply,i)=>{
                                                                            let replyCreator;
                                                                            
                                                                            if(typeof reply.creatorId==="object" && reply.creatorId!==null){
                                                                                replyCreator=reply.creatorId;
                                                                            }else if(typeof reply.creatorSocialId==="object" && reply.creatorSocialId!==null){
                                                                                replyCreator=reply.creatorSocialId;
                                                                            }

                                                                            return(
                                                                                <div className={style.reply}>
                                                                                    <div className={style.replyCreator}>
                                                                                        <div className={style.replyCreatorImgCont}>
                                                                                            <img className={style.replyCreatorImg} src={replyCreator.imageUrl}/>
                                                                                        </div>

                                                                                        <p className={style.replyCreatorName}>
                                                                                            {replyCreator.firstName} {replyCreator.lastName}
                                                                                        </p>

                                                                                        <div className={style.dateContainer}>
                                                                                            {reply.createdAt}
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className={style.commentText}>
                                                                                        {reply.text}
                                                                                    </div>

                                                                                    <hr></hr>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>

                                                                <div className={style.writeReplyContainer}>
                                                                    <input onChange={(e)=>{setReply(e.target.value)}} placeholder="Write a reply..." className={style.writeCommentInput}/>
                                                                    <button onClick={()=>WriteReply(comment._id)} className={style.writeCommentButton}>Reply</button>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className={style.writeCommentContainer}>
                                    <input onChange={(e)=>{setComment(e.target.value)}} placeholder="Write a comment..." className={style.writeCommentInput}/>
                                    <button onClick={WriteComment} className={style.writeCommentButton}>Үүсгэх</button>
                                </div>

                            </div>

                        </div>

                    </div>

                    <hr></hr>
                        
                    <Footer></Footer>

                </div>
            }


        </div>
    )
}