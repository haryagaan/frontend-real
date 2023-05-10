import style from "../styles/Stars.module.css"

import {AiFillStar} from "react-icons/ai"

export const Stars=()=>{
    return(
        <div className={style.container}>
            <AiFillStar className={style.star}></AiFillStar>
            <AiFillStar className={style.star}></AiFillStar>
            <AiFillStar className={style.star}></AiFillStar>
            <AiFillStar className={style.star}></AiFillStar>
            <AiFillStar className={style.star}></AiFillStar>
            <p className={style.rating}>4.9</p>
            <p>(662)</p>
        </div>
    )
}