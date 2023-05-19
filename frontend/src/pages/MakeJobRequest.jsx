import React, { useState } from 'react'

import style from "../styles/MakeJobRequest.module.css"

import { client } from '../client/client';

import { useParams } from 'react-router-dom'

import HashLoader from "react-spinners/HashLoader";

import { useNavigate } from 'react-router-dom';

export const MakeJobRequest = () => {
    const [loading,setLoading]=useState(false);

    const [jobName,setJobName]=useState();

    const [text,setText]=useState();

    const navigate=useNavigate();

    const categoryId=useParams().category;

    // console.log(text , jobName)

    async function MakeJobRequest(){
        const token=localStorage.getItem("token");

        if(token && jobName!=""){
            setLoading(true);
            await client.post("/admin/request/job/"+token+"/"+categoryId , {jobName , text})
                .then(async(res)=>{
                    console.log(res.data);
                    setLoading(false);
                    navigate("/home")
                }).catch((err)=>{
                    console.log(err);
                })
        }
    }

    return (
        <div className={style.container}>
            {
                loading ?

                <HashLoader
                    color={'#7246e5'}
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />

                :

                <div className={style.whiteBox}>
                    <div>
                        Make Category Request
                    </div>

                    <div>
                        <input onChange={(e)=>{setJobName(e.target.value)}} placeholder="Job name ..." className={style.input}/>
                    </div>

                    <textarea onChange={(e)=>{setText(e.target.value)}} className={style.textArea} placeholder='Description...'></textarea>

                    <div>
                        <button onClick={MakeJobRequest} className={style.button}>Submit</button>
                    </div>
                </div>
            }
        </div>
    )
}
