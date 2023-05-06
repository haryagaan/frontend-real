import style from "../styles/MyProfile.module.css"
import { Header } from "./Header"

import {AiFillStar} from "react-icons/ai"

export const MyProfile=()=>{
    return(
        <div className={style.container}>
            <Header></Header>

            <div className={style.main}>
                <div className={style.leftSide}>
                    <div className={style.profileImgContainer}>
                        <img className={style.profileImg} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp3DxP80ArpRzsB0XWBG9Ow5GeuefbLrUHw&usqp=CAU"/>
                    </div>

                    <div className={style.nameContainer}>
                        <p>Arron</p>
                        <p>Smith</p>
                    </div>

                    <div className={style.editProdfileCont}>
                        <button className={style.button}>Edit profile</button>
                    </div>

                    <div className={style.ratingCont}>
                        <p className={style.ratingText}>Rating:</p>

                        <div className={style.rating}>
                            <AiFillStar className={style.ratingIcon}></AiFillStar>
                            <p className={style.ratingNumber}>5</p>
                            <p className={style.ratingNumber}>(12)</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}