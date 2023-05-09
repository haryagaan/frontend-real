import style from "../styles/JobPage.module.css"

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CarouselCard } from "../components/CarouselCard";

import { client } from "../client/client";

import { useParams , Link } from "react-router-dom"
import { useEffect, useState } from "react";

import {BsHouseDoor} from "react-icons/bs"

export const JobPage=()=>{
    const jobId=useParams().job;

    const [job,setJob]=useState();
    const [showFreelancer,setShowFreelancer]=useState(true);
    const [showClient,setShowClient]=useState(false);
    const [freelancerPosts,setFreelancerPosts]=useState([]);
    const [clientPosts,setClientPosts]=useState([]);

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
                        <p className={style.category}>{job && job.category.category}</p>
                    </div>

                    <div className={style.jobNameContainer}>
                        <p className={style.jobName}>{job && job.name}</p>
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
                                <Link to={`/post/freelancer/${post._id}`} className={style.freelancerClientContainer} key={i}>
                                    <CarouselCard post={post}></CarouselCard>
                                </Link>
                            )
                        })

                        :

                        clientPosts && clientPosts.map((post,i)=>{
                            return(
                                <Link to={`/post/client/${post._id}`} className={style.freelancerClientContainer} key={i}>
                                    <CarouselCard post={post}></CarouselCard>
                                </Link>
                            )
                        })
                    }
                </div>

            </div>

            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}