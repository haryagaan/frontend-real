import style from "../styles/JobPage.module.css"

import { DataContext } from "../context/DataProvider";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CarouselCard } from "../components/CarouselCard";

import { client } from "../client/client";

import { useParams , Link } from "react-router-dom"
import { useEffect, useState , useContext } from "react";

import {BsHouseDoor} from "react-icons/bs" 
import {BsArrowReturnLeft} from "react-icons/bs"

import addPostImg from "../assets/addPost.png"

export const JobPage=()=>{

    const {userId}=useContext(DataContext)

    const jobId=useParams().job;

    const [job,setJob]=useState();
    const [showFreelancer,setShowFreelancer]=useState(true);
    const [showClient,setShowClient]=useState(false);
    const [freelancerPosts,setFreelancerPosts]=useState([]);
    const [clientPosts,setClientPosts]=useState([]);

    const [createPost,setCreatePost]=useState(false);
    const [title,setTitle]=useState();
    const [mainText,setMainText]=useState();
    const [price,setPrice]=useState();
    const [postImageBase64,setPostImageBase64]=useState([]);

    useEffect(()=>{
        client.get("/job/get/"+jobId)
            .then(async(res)=>{
                // console.log(res.data);
               setJob(res.data);
            }).catch((err)=>{
                console.log(err)
            })
    },[]);

    useEffect(()=>{
        client.get("/job/get/freelancer/"+jobId)
            .then(async(res)=>{
                // console.log(res.data);
                setFreelancerPosts(res.data);
            }).catch((err)=>{ 
                console.log(err);
            })
    },[]);


    function Freelancer(){
        setShowFreelancer(true);
        setShowClient(false);

        client.get("/job/get/freelancer/"+jobId)
        .then(async(res)=>{
            // console.log(res.data);
            setFreelancerPosts(res.data);
        }).catch((err)=>{ 
            console.log(err);
        })
    }

    function Client(){
        setShowFreelancer(false);
        setShowClient(true);

        client.get("/job/get/client/"+jobId)
        .then(async(res)=>{
            // console.log(res.data);
            setClientPosts(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    function toggleCreatePost(){
        setCreatePost(prev=>!prev);
    }

    function uploadPostImage(event){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            if(postImageBase64.length<=3){
                setPostImageBase64((postImageBase64)=>[...postImageBase64 , reader.result]);
            }
        };
        reader.onerror = (error) => {
          console.log("upload image error:", error);
        };
    }
    

    async function post(){
        if(showFreelancer==true && showClient==false){
            await client.post("/post/freelancer/"+userId+"/"+jobId,
                {title , mainText, base64:postImageBase64 , price}
            ).then(async(res)=>{
                console.log(res.data);
                window.location.reload();
            }).catch((err)=>{
                console.log(err)
            })
        }else if(showFreelancer==false && showClient==true){
            await client.post("/post/client/"+userId+"/"+jobId,
                {title , mainText, base64:postImageBase64 , price}
            ).then(async(res)=>{
                console.log(res.data);
                window.location.reload()
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    console.log(postImageBase64)

    function hideCreatePost(){
        setCreatePost(false)
        // console.log(1)
    }

    return(
        <div className={style.container}>
            <div>
                <Header></Header>
            </div>

            <div className={style.main}>
                <div className={style.innerContainer}>
                    <div className={style.categoryContainer}>
                        <BsHouseDoor className={style.houseIcon}></BsHouseDoor>
                        <p className={style.slash}>/</p>
                        <a href={`/category/${job && job.category._id}`} className={style.category}>{job && job.category.category}</a>
                    </div>

                    <div className={style.jobNameContainer}>
                        <p className={style.jobName}>{job && job.name}</p>

                        <div onClick={toggleCreatePost} className={style.addPostContainer}>
                            <button className={style.addPostButton}>Create post</button>
                        </div>

                    </div>

                    <div className={style.modeContainer}>
                        <div onClick={Freelancer} className={style.modeFreelancer}>
                            <p>Freelancer</p>
                        </div>

                        <div onClick={Client} className={style.modeClient}>
                            <p>Client</p>
                        </div>
                    </div>
                </div>

                <div className={style.postContainer}>
                    {
                        showFreelancer ?

                        freelancerPosts && freelancerPosts.map((post,i)=>{
                            return(
                                <div className={style.freelancerClientContainer}>
                                    <Link to={`/post/freelancer/${post._id}`} className={style.freelancerClient} key={i}>
                                        <CarouselCard post={post}></CarouselCard>
                                    </Link>
                                </div>
                            )
                        })

                        :

                        clientPosts && clientPosts.map((post,i)=>{
                            return(
                                <div className={style.freelancerClientContainer}>
                                    <Link to={`/post/client/${post._id}`} className={style.freelancerClient} key={i}>
                                        <CarouselCard post={post}></CarouselCard>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

            <div>
                <Footer></Footer>
            </div>

            <div className={createPost ? style.createPostContainer : style.createPostContainerInvisible}>
                <div className={style.innerCreatePostContainer}>
                    <div className={style.whitePost}>
                        <div className={style.whitePostTop}>
                            <BsArrowReturnLeft onClick={hideCreatePost} className={style.returnIcon}></BsArrowReturnLeft>
                            <h1>Create a post</h1>
                        </div>
                        <input onChange={(e)=>{setTitle(e.target.value)}} className={style.createPostInput} placeholder="Title..."/>
                        <textarea onChange={(e)=>{setMainText(e.target.value)}} placeholder="Main text..."></textarea>
                        <input className={style.createPostFile} onChange={uploadPostImage} type="file"/>
                        <div>   
                            {
                                postImageBase64 && postImageBase64.map((imageSrc,i)=>{
                                    return(
                                        <img key={i} style={{width:"auto" , height:"100px"}} src={imageSrc && imageSrc}/>
                                    )
                                })
                            }
                        </div>
                        <div style={{display:"flex" , flexDirection:"row"}}>
                            <h4>Your money</h4>
                            <input onChange={(e)=>{setPrice(e.target.value)}} type="number" min="1" step="any" className={style.createPostInputMoney} placeholder="Money..."/>
                        </div>
                        <button onClick={post} className={style.createPostButton}>Create</button>
                    </div>
                </div>
            </div>


        </div>
    )
}