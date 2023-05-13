import style from "../styles/JobPage.module.css"

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CarouselCard } from "../components/CarouselCard";

import { client } from "../client/client";

import { useParams , Link } from "react-router-dom"
import { useEffect, useState } from "react";

import {BsHouseDoor} from "react-icons/bs" 

import addPostImg from "../assets/addPost.png"

export const JobPage=()=>{
    const jobId=useParams().job;

    const [job,setJob]=useState();
    const [showFreelancer,setShowFreelancer]=useState(true);
    const [showClient,setShowClient]=useState(false);
    const [freelancerPosts,setFreelancerPosts]=useState([]);
    const [clientPosts,setClientPosts]=useState([]);

    const [createPost,setCreatePost]=useState(false);

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

    // console.log(showFreelancer , showClient)
    // console.log(job)

    function toggleCreatePost(){
        // console.log(1)
        setCreatePost(prev=>!prev);
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
                            <p>Create post</p>
                            <img src={addPostImg} className={style.addPostImage}/>
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

            

            <div className={createPost ? style.createPostContainer : style.categoryContainerInvisible}>
                <div className={style.createPost}>
                    <div className={style.createPostMain}>
                        a
                    </div> 
                </div>
            </div>

        </div>
    )
}