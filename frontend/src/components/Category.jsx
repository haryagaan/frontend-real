import style from "../styles/Category.module.css"

import img from "../assets/blackhole.png"

import { useParams } from "react-router-dom"

export const Category=({item})=>{

    return(
        <div className={style.category}>
           <div >
                <img className={style.img} src={item.imageUrl}/>
           </div>

           <div>
                <p className={style.name}>{item.category}</p>
           </div>

           <div>
                <p>Jobs {item.totalJobs}</p>
           </div>
        </div>
    )
}