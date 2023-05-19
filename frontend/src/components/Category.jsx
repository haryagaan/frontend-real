import style from "../styles/Category.module.css"

import img from "../assets/blackhole.png"

import { useParams } from "react-router-dom"

export const Category=({item})=>{

    return(
        <a href={`/category/${item && item._id}`} className={style.category}>
           <div className={style.imgParent}>
                <img className={style.img} src={item && item.imageUrl}/>
           </div>

           <div className={style.nameContainer}>
                <p className={style.name}>{item &&item.category}</p>

                {/* <p className={style.job}>Jobs: {item && item.totalJobs}</p> */}
           </div>
        </a>
    )
}