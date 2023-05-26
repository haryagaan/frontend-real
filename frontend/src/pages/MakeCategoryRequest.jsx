import React, { useState , useEffect } from 'react'

import style from "../styles/MakeCategoryRequest.module.css"

import { client } from '../client/client'

import HashLoader from "react-spinners/HashLoader";

import { useNavigate } from 'react-router-dom';

export const MakeCategoryRequest = () => {
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const [category,setCategory]=useState();
    const [text,setText]=useState();

    async function SubmitCategory(){
        const token=localStorage.getItem("token");

        setLoading(true);

        if(token){
            await client.post("/admin/request/category/"+token , {category ,text })
                .then(async(res)=>{
                    setLoading(false);
                    navigate("/home")
                    console.log(res.data);
                }).catch((err)=>{
                    console.log(err)
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
                        Биднээс оруулахыг хүссэн ажлын ангилал
                    </div>

                    <div>
                        <input onChange={(e)=>{setCategory(e.target.value)}} placeholder="Ажлын ангилалын нэр ..." className={style.input}/>
                    </div>

                    <textarea className={style.textArea} onChange={(e)=>{setText(e.target.value)}} placeholder='Тодорхойлолт...'></textarea>

                    <div>
                        <button onClick={SubmitCategory} className={style.button}>Илгээх</button>
                    </div>
                </div>
            }
        </div>
    )
}
