import style from "../styles/Profile.module.css"
import { Header } from "./Header"

import {AiFillStar} from "react-icons/ai"
import {BsFillTelephoneFill} from "react-icons/bs"
import {BsFacebook} from "react-icons/bs"
import {BsInstagram} from "react-icons/bs"
import {HiLocationMarker} from "react-icons/hi"
import {BiUserPin} from "react-icons/bi"
import {FcGoogle} from "react-icons/fc"

import { Link, useParams } from "react-router-dom"

import editLogo from "../assets/editProfileImg.png"
import galleryLogo from "../assets/addGalleryImg.webp"
import saveLogo from "../assets/save.jpg"
import {AiFillLike} from "react-icons/ai"
import {AiFillDislike} from "react-icons/ai"

import { ToastContainer, toast } from 'react-toastify';

import { client } from "../client/client"
import { useEffect, useState , useContext } from "react"

import { DataContext } from "../context/DataProvider"


export const Profile=()=>{
    const {userId}=useContext(DataContext);

    const id=useParams().id;

    const [user,setUser]=useState();

    const toastWarning = (string) => toast.warning(string);

    // const token=localStorage.getItem("token");

    useEffect(()=>{
        client.get("/user/"+id)
            .then(async(res)=>{
                // console.log(res.data.user);
                setUser(res.data.user)
            }).catch((err)=>{
                console.log(err)
            })
    },[]);

    async function Like(){
        await client.post("/user/like/"+userId+"/"+id)
            .then(async(res)=>{
                console.log(res.data);
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
                if(err.response.data=="You cant Like to your own profile"){
                    toastWarning(err.response.data)
                }
            })
    }

    async function Dislike(){
        await client.post("/user/dislike/"+userId+"/"+id)
            .then(async(res)=>{
                console.log(res.data);
                window.location.reload();
            }).catch((err)=>{
                console.log(err);
                if(err.response.data=="You cant dislike to your own profile"){
                    toastWarning(err.response.data)
                }
            })
    }

    return(
        <div className={style.container}>

            <Header></Header>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                />
            <ToastContainer />

            <div className={style.main}>
                <div className={style.leftSide}>
                    <div className={style.imgContainer}>
                         <img src={user && user.imageUrl} className={style.profileImg}/>
                    </div>

                    <hr></hr>

                    <div className={style.nameContainer}>
                            <p className={style.name}>
                                <p style={{marginRight:"8px"}}>{user && user.firstName}</p>
                                <p>{user && user.lastName}</p>
                            </p>

                            <div className={style.reactContainer}>
                                <div style={{display:"flex" , alignItems:"center"}}>
                                    <AiFillLike onClick={Like} className={style.like}></AiFillLike>
                                    ({user &&user.likes.length})
                                </div>

                                <div style={{display:"flex" , alignItems:"center" , marginLeft:"20px"}}>
                                    <AiFillDislike onClick={Dislike} className={style.dislike}></AiFillDislike>
                                    ({user && user.dislikes.length})
                                </div>
                            </div>

                            <div className={style.ratingContainer}>
                                <AiFillStar className={style.ratingIcon}></AiFillStar>
                                <p className={style.rating}>{user && user.likes.length!=0 ? parseInt(user.likes.length*10/user.totalReacts.length) : 0}</p>
                                <p>({user && user.totalReacts.length})</p>
                            </div>
                    </div>
                    
                    <hr></hr>

                    <div className={style.memberContainer}>
                        <div className={style.locationContainer}>
                            <HiLocationMarker className={style.Icon1}></HiLocationMarker>

                            <p className={style.text1}>
                                From
                            </p>

                            <p className={style.text2}>
                                Mongolia
                            </p>

                        </div>

                        <div className={style.locationContainer}>
                            <BiUserPin className={style.Icon1}></BiUserPin>

                            <p className={style.text1}>
                                Joined at
                            </p>

                            <p className={style.text2}>
                                May 2023
                            </p>
                        </div>
                    </div>

                    <hr></hr>

                    <div className={style.socialContainer}>
                       <div className={style.socialEl}>
                            <BsFacebook className={style.socialIconFb}></BsFacebook>
                            <p className={style.socialText}>{user && user.facebookInfo}</p>
                       </div>
                       <div className={style.socialEl}>
                            <BsInstagram className={style.socialIconInsta}></BsInstagram>
                            <p className={style.socialText}>{user && user.instagramInfo}</p>
                       </div>
                       <div className={style.socialEl}>
                            <FcGoogle className={style.socialIconInsta}></FcGoogle>
                            <p className={style.socialText}>{user && user.googleInfo}</p>
                       </div>
                       <div className={style.socialEl}>
                            <BsFillTelephoneFill className={style.socialIconPhone}></BsFillTelephoneFill>
                            <p className={style.socialText}>{user && user.phoneInfo}</p>
                       </div>
                    </div>


                </div>


                <div className={style.rightSide}>
                    <div className={style.text3}>About me</div>

                    <div className={style.picContainer}>
                        {
                            user && user.galleryUrls.map((item , i)=>{
                                return(
                                    <img className={style.pic} src={item}/>
                                )
                            })
                        }

                    </div>
                    

                    <div className={style.infoContainer}>
                        <div className={style.infoText}>
                            <div>{user && user.infoText}</div>
                        </div>
                    </div>

                    <div className={style.jobContainer}>
                        <p className={style.jobText}>Jobs</p>
                        
                        <div className={style.jobList}>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}