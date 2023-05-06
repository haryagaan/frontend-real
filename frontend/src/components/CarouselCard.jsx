import style from '../styles/CarouselCard.module.css';
import React, { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { BsList } from 'react-icons/bs';
import { VscHeartFilled } from 'react-icons/vsc';
import { HiPlus } from 'react-icons/hi';

export const CarouselCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <>
            <div className={style.card}>
                {/* img */}
                <a className={style.imgBtn}>
                    <img src="https://picsum.photos/400/300" alt="..." className={style.image} />
                </a>
                {/* title */}
                <div className={style.title}>
                    <div className={style.profileImgCont}>
                        <img className={style.profileImg}></img>
                    </div>
                    <div className={style.titleTxt}>eveeelin</div>
                </div>
                {/* intro */}
                <div className={style.cardBody}>
                    <h1 className={style.bodyTitle}>
                        <a className={style.bodyPr}>I will design pro, minimal product catalog, magazine</a>
                    </h1>
                </div>
                {/* review */}
                <div className={style.review}>
                    <div className={style.rating}>
                        <BsStarFill className={style.starIcon}></BsStarFill>
                        5.0
                        <span>(66)</span>
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