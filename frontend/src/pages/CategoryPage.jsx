import style from "../styles/CategoryPage.module.css"

import { Header } from "../components/Header"
import { JobCard } from "../components/JobCard"
import { Footer } from "../components/Footer"

import { client } from "../client/client"

import img from "../assets/blackhole.png"

import { useParams , Link } from "react-router-dom"
import { useEffect, useState } from "react"

export const CategoryPage=()=>{

    const categoryId=useParams().category;

    const [category,setCategory]=useState();

    useEffect(()=>{
        client.get("/category/get/"+categoryId)
            .then(async(res)=>{
                // console.log(res.data)
                setCategory(res.data);
            }).catch((err)=>{
                console.log(err)
            })
    },[]);

    return(
        <div className={style.container}>
           <Header></Header>

           <div className={style.innerContainer}>
                <div className={style.main}>


                    {/* <div className={style.imgContainer}>
                        <p className={style.categoryName}>{category && category.category}</p>
                        <img className={style.img} src={category && category.imageUrl}/>
                    </div> */}

                    <div className={style.text1}>
                        Explore {category && category.category}
                    </div>

                    <div className={style.jobsContainer}>
                        {
                          category && category.jobs.map((item,i)=>{
                            return(
                                <div>
                                    <Link className={style.jobContainer} to={`/job/${item._id}`} key={i}>
                                        <JobCard item={item}></JobCard>
                                    </Link>
                                </div>
                            )
                          })
                        }
                    </div>

                </div>
           </div>

           <hr></hr>
           
           <Footer></Footer>
        </div>
    )
}