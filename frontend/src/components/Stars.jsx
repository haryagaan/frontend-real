import style from "../styles/Stars.module.css"

import {AiFillStar} from "react-icons/ai"

export const Stars=({creator})=>{

    console.log(creator)
    return(
        <div className={style.container}>
            <AiFillStar className={style.star}></AiFillStar>
            <AiFillStar className={style.star}></AiFillStar>
            <AiFillStar className={style.star}></AiFillStar>
            <AiFillStar className={style.star}></AiFillStar>
            <AiFillStar className={style.star}></AiFillStar>
            <p className={style.rating}>{creator && creator.rating}</p>
            <p>({creator && creator.ratingCount})</p>
        </div>
    )
}