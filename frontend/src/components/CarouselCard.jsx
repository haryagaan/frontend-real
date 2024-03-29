import style from '../styles/CarouselCard.module.css';
import React, { useRef, useState } from 'react';

// import ReactSimplyCarousel from 'react-simply-carousel';

import { BsStarFill } from 'react-icons/bs';
import { BsList } from 'react-icons/bs';
import { VscHeartFilled } from 'react-icons/vsc';
import { HiPlus } from 'react-icons/hi';
import {MdOutlineAttachMoney} from "react-icons/md"

export const CarouselCard = ({post}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const creator=useRef();

    if(post.creatorId!=null && post!=undefined){
        creator.current=post.creatorId
    }else if(post.creatorSocialId!=null && post!=undefined){
        creator.current=post.creatorSocialId
    }

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    // console.log(post)



    return (
        <>
        
            <div className={style.card}>
                {/* img */}
                <a className={style.imgBtn}>
                    {/* ene img deer post image urliig bichne */}
                    <img src={post && post.imageUrl[0]} alt="..." className={style.image} />
                </a>
                {/* title */}
                <div className={style.title}>
                    <div className={style.profileImgCont}>
                        <img src={creator && creator.current.imageUrl} className={style.profileImg}></img>
                    </div>
                    <div className={style.titleTxt}>{creator && creator.current.firstName}</div>
                </div>
                {/* intro */}
                <div className={style.cardBody}>
                    <h1 className={style.bodyTitle}>
                        <a className={style.bodyPr}>{post.title}</a>
                    </h1>
                </div>

                <div className={style.priceContainer}>
                    <p>{post.price}</p>
                    <p>Tugrug</p>
                    {/* <MdOutlineAttachMoney></MdOutlineAttachMoney> */}
                </div>

                {/* review */}
                <div className={style.review}>
                    <div className={style.rating}>
                        <BsStarFill className={style.starIcon}></BsStarFill>
                        <p>{post.likes.length ? post && parseFloat(post.likes.length*5/post.totalReacts.length) : 0}</p>
                        <span>({post && post.totalReacts.length})</span>
                    </div>
                    <div></div>
                </div>
                {/* footer */}
                <div className={style.footer}>
                    <div className={style.list}>
                        <div className={style.dropdown}>
                            <button className={style.listButton} onClick={() => setIsOpen(!isOpen)}>
                                <BsList className={style.listIcon}></BsList>
                            </button>
                            {isOpen && (
                                <div className={style.dropdownMenu}>
                                    <div className={style.menu}>
                                        <button className={style.btn}>
                                            <div className={style.cont}>
                                                <VscHeartFilled
                                                    className={`${style.heartIcon} ${style.iconPadding}`}
                                                ></VscHeartFilled>
                                                <span className={style.txt}>My first list</span>
                                            </div>
                                        </button>
                                        <button className={style.btn}>
                                            <div>
                                                <HiPlus  className={`${style.plusIcon} ${style.iconPadding}`}></HiPlus>
                                                <span className={style.txt}>Create list</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <VscHeartFilled className={style.heartIcon}></VscHeartFilled>
                    </div>
                </div>
            </div>
        </>
    );
};