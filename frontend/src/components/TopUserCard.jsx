import style from '../styles/CarouselCard.module.css';
import React, { useRef, useState } from 'react';

import { BsStarFill } from 'react-icons/bs';
import { BsList } from 'react-icons/bs';
import { VscHeartFilled } from 'react-icons/vsc';
import { HiPlus } from 'react-icons/hi';
import {MdOutlineAttachMoney} from "react-icons/md"
import {AiFillStar} from "react-icons/ai"

export const TopUserCard = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    console.log(user)

    return (
        <>
        
            <div className={style.card}>
                {/* img */}
                <a className={style.imgBtn}>
                    {/* ene img deer post image urliig bichne */}
                    <img src={user && user.user.imageUrl} alt="..." className={style.image} />
                </a>
                {/* title */}
                {/* <div className={style.title}>
                    <div className={style.profileImgCont}>
                        <img src="" className={style.profileImg}></img>
                    </div>
                    <div className={style.titleTxt}>{}</div>
                </div> */}
                {/* intro */}
                <div className={style.cardBody}>
                    <h1 className={style.bodyTitle}>
                        <a className={style.bodyPr}>{}</a>
                    </h1>
                </div>

                <div className={style.priceContainer}>
                   <p>{user && user.user.firstName}</p>
                </div>

                {/* review */}
                <div className={style.review}>
                    <div className={style.rating}>
                        <BsStarFill className={style.starIcon}></BsStarFill>
                        <p>{}</p>
                        <span>({})</span>
                    </div>
                    <div></div>
                </div>
                {/* footer */}
                <div className={style.footer}>
                    <div className={style.list}>
                        {}
                        <AiFillStar className={style.heartIcon}></AiFillStar>
                    </div>
                </div>
            </div>
        </>
    );
};