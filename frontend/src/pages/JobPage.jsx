import style from "../styles/JobPage.module.css"

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CarouselCard } from "../components/CarouselCard";

import { client } from "../client/client";

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import {BsHouseDoor} from "react-icons/bs"

export const JobPage=()=>{
    const jobId=useParams().job;

    const [job,setJob]=useState();
    const [showFreelancer,setShowFreelancer]=useState(true);
    const [showClient,setShowClient]=useState(false);

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
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            })
    },[])

    function Freelancer(){
        if(showFreelancer==false){
            setShowFreelancer(true);
            setShowClient(false);
        }
    }

    function Client(){
        if(showClient==false){
            setShowFreelancer(false);
            setShowClient(true);
        }
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
                        <p className={style.category}>{job && job.category.category}</p>
                    </div>

                    <div className={style.jobNameContainer}>
                        <p className={style.jobName}>{job && job.name}</p>
                    </div>

                    <div className={style.modeContainer}>
                        <div className={style.modeFreelancer}>
                            <p>Freelancer</p>
                        </div>

                        <div className={style.modeClient}>
                            <p>Client</p>
                        </div>
                    </div>
                </div>

                <div className={style.postContainer}>
                    {/* {
                        showFreelancer ? 

                        job && job.freelancerPosts.map((item,i)=>{
                            return(
                                <div key={i} className={style.freelancerContainer}>
                                    <CarouselCard></CarouselCard>
                                </div>
                            )
                        })

                        :

                        job && job.freelancerPosts.map((item,i)=>{
                            return(
                                <div key={i}>
                                    <CarouselCard></CarouselCard>
                                </div>
                            )
                        })

                    } */}
                </div>

            </div>

            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}