import style from "../styles/MyProfile.module.css"
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

import { client } from "../client/client"
import { useEffect, useState } from "react"

export const MyProfile=()=>{
    const id=useParams().id;

    const [base64,setBase64]=useState();

    const [user,setUser]=useState();

    const [editInfo,setEditInfo]=useState(false);

    const [editSocial,setEditSocial]=useState(false);

    const [editInfoInput,setEditInfoInput]=useState();

    const [facebookInfoInput,setFacebookInfoInput]=useState();

    const [instagramInfoInput,setInstagramInfoInput]=useState();

    const [googleInfoInput,setGoogleInfoInput]=useState();

    const [phoneInfoInput,setPhoneInfoInput]=useState();

    const [freelancerPosts,setFreelancerPosts]=useState([]);

    const [clientPosts,setClientPosts]=useState([]);
   
    function uploadProfilePic(event) {
        // console.log(event)
        const token=localStorage.getItem("token");

        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          //console.log(reader.result); //base64 encoded string

          client.post("/user/image/profile/"+token , {base64:reader.result})
            .then(async(res)=>{
                // console.log(res.data);
                window.location.reload();
            }).catch((err)=>{
                console.log(err)
            })
            //   setUploadImgs((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = (error) => {
          console.log("upload image error:", error);
        };
    }

    function uploadGalleryPic(event) {
        // console.log(event)
        const token=localStorage.getItem("token");

        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          //console.log(reader.result); //base64 encoded string
          client.post("/user/image/gallery/"+token , {base64:reader.result})
            .then(async(res)=>{
                window.location.reload();
            }).catch((err)=>{
                console.log(err)
            })
            //   setUploadImgs((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = (error) => {
          console.log("upload image error:", error);
        };
    }

    useEffect(()=>{
        client.get("/user/"+id)
            .then(async(res)=>{
                // console.log(res.data.user);
                setClientPosts(res.data.postClients)
                setFreelancerPosts(res.data.postFreelancers)
                setUser(res.data.user)
            }).catch((err)=>{
                console.log(err)
            })
    },[]);

    async function handleEditInfo(){
        if(editInfo==true){
            const token=localStorage.getItem("token");

            await client.post("/user/change/info/"+token , {
                info:editInfoInput,
                facebook:facebookInfoInput,
                instagram:instagramInfoInput,
                google:googleInfoInput,
                phone:phoneInfoInput
            })
            .then(async(res)=>{
                // console.log(res.data)
                window.location.reload();
            }).catch((err)=>{
                console.log(err)
            })
        }
        setEditInfo(prev=>!prev);
        setEditSocial(prev=>!prev);
    }

    // console.log(editInfoInput)

    return(
        <div className={style.container}>
            <Header></Header>
            <div className={style.main}>
                <div className={style.leftSide}>
                    <div className={style.imgContainer}>
                         <img src={user && user.imageUrl} className={style.profileImg}/>

                         <div className={style.profileImgUpload}>
                            <label for="file-input">
                                <img className={style.editProfileImg} src={galleryLogo}/>
                            </label>

                            <input id="file-input" type="file" onChange={uploadProfilePic} />
                        </div>

                    </div>

                    <hr></hr>

                    <div className={style.nameContainer}>
                            <p className={style.name}>
                                <p style={{marginRight:"8px"}}>{user && user.firstName}</p>
                                <p>{user && user.lastName}</p>
                            </p>

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
                                {user && user.createdAt.slice(0,10)}
                            </p>
                        </div>
                    </div>

                    <hr></hr>

                    <div className={style.socialContainer}>
                       <div className={style.socialEl}>
                            <BsFacebook className={style.socialIconFb}></BsFacebook>
                            {
                                editSocial ? 

                                <input className={style.infoInput} onChange={(e)=>{setFacebookInfoInput(e.target.value)}} />

                                :

                                <p className={style.socialText}>{user && user.facebookInfo}</p>
                            }
                            <img onClick={handleEditInfo} style={{marginLeft:"10px"}}  className={style.editProfileImg} src={editSocial ? saveLogo : editLogo}/> 
                       </div>
                       <div className={style.socialEl}>
                            <BsInstagram className={style.socialIconInsta}></BsInstagram>
                            {
                                editSocial ? 

                                <input className={style.infoInput} onChange={(e)=>{setInstagramInfoInput(e.target.value)}} />

                                :

                                <p className={style.socialText}>{user && user.instagramInfo}</p>
                            }
                            <img onClick={handleEditInfo} style={{marginLeft:"10px"}}  className={style.editProfileImg} src={editSocial ? saveLogo : editLogo}/> 
                       </div>
                       <div className={style.socialEl}>
                            <FcGoogle className={style.socialIconInsta}></FcGoogle>
                            {
                                editSocial ? 

                                <input className={style.infoInput} onChange={(e)=>{setGoogleInfoInput(e.target.value)}} />

                                :

                                <p className={style.socialText}>{user && user.googleInfo}</p>
                            }
                            <img onClick={handleEditInfo} style={{marginLeft:"10px"}}  className={style.editProfileImg} src={editSocial ? saveLogo : editLogo}/> 
                       </div>
                       <div className={style.socialEl}>
                            <BsFillTelephoneFill className={style.socialIconPhone}></BsFillTelephoneFill>
                            {
                                editSocial ? 

                                <input className={style.infoInput} onChange={(e)=>{setPhoneInfoInput(e.target.value)}} />

                                :

                                <p className={style.socialText}>{user && user.phoneInfo}</p>
                            }
                            <img onClick={handleEditInfo} style={{marginLeft:"10px"}}  className={style.editProfileImg} src={editSocial ? saveLogo : editLogo}/> 
                       </div>
                    </div>


                </div>


                <div className={style.rightSide}>
                    <div className={style.text3}>About me</div>

                    <div className={style.picContainer}>
                        {
                            user && user.galleryUrls.map((item , i)=>{
                                return(
                                    <img key={i} className={style.pic} src={item}/>
                                )
                            })
                        }

                        <div className={style.galleryContainer}>
                            <label for="file-input1">
                                <img className={style.galleryImg} src={galleryLogo}/>
                            </label>

                            <input id="file-input1" type="file" onChange={uploadGalleryPic} />
                        </div>  

                    </div>
                    

                    <div className={style.infoContainer}>
                        <div className={style.infoText}>
                            <div className={editInfo ? style.invisible : ""}>{user && user.infoText}</div>

                            <input onChange={(e)=>setEditInfoInput(e.target.value)} className={editInfo ? style.infoInput : style.invisible}/>
                        </div>

                        <div className={style.editInfoContainer}>
                            <img onClick={handleEditInfo} className={style.editProfileImg} src={editInfo ? saveLogo : editLogo}/>
                        </div>
                    </div>

                    <div className={style.jobContainer}>
                        <p className={style.jobText}>Freelancer posts made by me</p>
                        
                        <div className={style.jobList}>
                            {
                                freelancerPosts && freelancerPosts.length==0?

                                <div>No freelancerPosts</div>

                                :

                                freelancerPosts && freelancerPosts.map((post,i)=>{
                                    return(
                                        <Link key={i} to={`/post/freelancer/${post._id}`} className={style.post}>
                                            <div>
                                                <img className={style.postImg} src={post.imageUrl[0]}/>
                                            </div>

                                            <div>
                                                <p>{post.title}</p>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                        <p className={style.jobText}>Client posts made by me</p>

                        <div className={style.jobList}>
                            {
                                clientPosts && clientPosts.length==0 ?

                                <div>No client posts</div>

                                :

                                clientPosts && clientPosts.map((post,i)=>{
                                    return(
                                        <Link key={i} to={`/post/client/${post._id}`} className={style.post}>
                                            <div>
                                                <img className={style.postImg} src={post.imageUrl[0]}/>
                                            </div>

                                            <div>
                                                <p>{post.title}</p>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}