import React, { useEffect, useRef, useState } from 'react'
import style from "../styles/Signup.module.css"

import { useNavigate } from 'react-router-dom'

import logo from "../assets/logo.png"
import logoCut from "../assets/logoCut.png"

import {AiFillFacebook} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import {AiFillApple} from "react-icons/ai"
import {AiFillEye} from "react-icons/ai"
import {AiFillEyeInvisible} from "react-icons/ai"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { client } from '../client/client'

import {Link} from "react-router-dom"

import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"
import { auth, app, providerFacebook, providerGoogle } from "../firebaseConfig/firebaseConfig"

import { DataContext } from "../context/DataProvider"
import { useContext } from "react"

import HashLoader from "react-spinners/HashLoader";

export const Signup = () => {
    const {
        user,
        setUser,
        isAuth,
        setIsAuth
    }=useContext(DataContext);

    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const [logoSmall,setLogoSmall]=useState(false);
    const code=localStorage.getItem("code");

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [firstname,setFirstname]=useState();
    const [lastname,setLastname]=useState();

    const [togglePassword,setTogglePassword]=useState(true);
    const [checkbox,setCheckbox]=useState(false);

    const [error,setError]=useState();
    const [allErr,setAllErr]=useState(false);
    const [emailErr,setEmailErr]=useState(false);
    const [emailExistErr,setEmailExistErr]=useState(false);
    const [passwordErr,setPasswordErr]=useState(false);
    const [firstnameErr,setFirstnameErr]=useState(false);
    const [lastnameErr ,setLastnameErr]=useState(false); 

    const toastSuccess = (string) => toast.success(string);

    const toastError= (string) => toast.error(string);

    function changePassword(){
        setTogglePassword(prev=>!prev);
    }

    function toggleCheckbox(){
        setCheckbox(prev=>!prev);
    }

    window.addEventListener("resize" , (event)=>{
        if(event.currentTarget.innerWidth<=800){
            setLogoSmall(true)
        }else{
            setLogoSmall(false)
        }
    });

    function facebookAuth() {
        signInWithPopup(auth, providerFacebook).then((result) => {
            const base = result.user.providerData[0];

            const displayName = base.displayName;
            const email = base.email;
            const imageUrl = base.photoURL;
            const socialUid = base.uid;

            setLoading(true);

            client.post("/auth/social/create", {
                email,
                displayName,
                imageUrl,
                socialUid,
                socialType: "Facebook",
                role:code
            }).then(async (res) => {
                // console.log(res.data);
                setLoading(false);
                localStorage.setItem("token" , res.data.token)
                navigate("/home")
                toastSuccess("Success!!");
            }).catch((err) => {
                console.log(err);
                setError(err.response.data)
                toastError(err.response.data)
            })

        }).catch((err) => {
            console.log(err);
        })
    }

    function googleAuth() {
        signInWithPopup(auth, providerGoogle).then((result) => {
            const base = result.user.providerData[0];

            const displayName = base.displayName;
            const email = base.email;
            const imageUrl = base.photoURL;
            const socialUid = base.uid;

            setLoading(true)

            client.post("/auth/social/create", {
                displayName,
                email,
                imageUrl,
                socialUid,
                socialType: "Google",
                role:code
            }).then(async (res) => {
                // console.log(res.data)
                setLoading(false)
                localStorage.setItem("token" , res.data.token)
                navigate("/home")
                toastSuccess("Success!!");
            }).catch((err) => {
                console.log(err)
                setError(err.response.data)
                toastError(err.response.data)
            })

        }).catch((err) => {
            console.log(err)
        })
    }


    async function Signup() {
        if(checkbox==true){
            await client.post("/auth/signup", {
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password,
                role:code
            }).then(async (res) => {
                toastSuccess("Created");
                setLoading(false)
                localStorage.removeItem("code");
                navigate("/login");
                // console.log(res.data);
            }).catch((err) => {
                if(!err){
                    setLoading(true);
                }
                // console.log(err.response.data)
                setError(err.response.data)
                toastError(err.response.data)
            })
        }else{
            toastError("Манай нөхцөл, болзлыг зөвшөөрнө үү?");
        }
    }

    useEffect(()=>{
        if(error!=null){
            if(error=="Fill in all the forms"){
                setAllErr(true);
                setEmailExistErr(false);
                setEmailErr(false);
                setPasswordErr(false)
                setFirstnameErr(false)
                setLastnameErr(false)
            }else if(error=="Email already exists") {
                setAllErr(false);
                setEmailExistErr(true);
                setEmailErr(false);
                setPasswordErr(false)
                setFirstnameErr(false)
                setLastnameErr(false)
            }else if(error=="Password must be longer than 6 characters and less than 30 characters") {
                setAllErr(false);
                setEmailExistErr(false);
                setEmailErr(false);
                setPasswordErr(true)
                setFirstnameErr(false)
                setLastnameErr(false)
            }else if(error=="Lastname must be longer than 2 characters and less than 30 characters"){
                setAllErr(false);
                setEmailExistErr(false);
                setEmailErr(false);
                setPasswordErr(false)
                setFirstnameErr(false)
                setLastnameErr(true)
            }else if(error=="Firstname must be longer than 2 characters and less than 30 characters"){
                setAllErr(false);
                setEmailExistErr(false);
                setEmailErr(false);
                setPasswordErr(false)
                setFirstnameErr(true)
                setLastnameErr(false)
            }else if(error=="Invalid email"){
                setAllErr(false);
                setEmailExistErr(false);
                setEmailErr(true);
                setPasswordErr(false)
                setFirstnameErr(false)
                setLastnameErr(false)
            }
        }
    },[error])

    return (
        <div>
            {
                loading ?
                <div style={{width:"100vw" , height:"100vh" , display:"flex" , justifyContent:"center" ,alignItems:"center"}}>
                    <HashLoader
                    color={'#7246e5'}
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                </div>
                :
                <div className={style.container}>
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

                    <div className={style.leftSide}>

                        <div className={style.header}>
                            <div className={style.logoDiv}>
                                <img className={logoSmall ? style.logoSmall : style.logo} src={logoSmall ? logoCut : logo}/>
                            </div>
                        </div>

                        <div className={style.main}>
                            <div className={style.bigText}>Бүртгүүлэх</div>

                            <div className={style.socialContainer}>
                                <div onClick={facebookAuth} className={style.facebook}>
                                    <AiFillFacebook className={style.Icon}></AiFillFacebook>
                                    <div className={style.socialText}>Facebook-ээр нэвтрэх</div>
                                </div>

                                <div onClick={googleAuth} className={style.google}>
                                    <FcGoogle className={style.Icon}></FcGoogle>
                                    <div className={style.socialTextBlack}>Google-ээр нэвтрэх</div>
                                </div>

                                <div className={style.apple}>
                                    <AiFillApple className={style.Icon}></AiFillApple>
                                    <div className={style.socialText}>Apple-ээр нэвтрэх</div>
                                </div>
                            </div>

                            <div className={style.lineContainer}>
                                <div className={style.line}></div>
                                <div className={style.lineText}>Эсвэл</div>
                                <div className={style.line}></div>
                            </div>

                            <div className={style.signupContainer}>
                                <input value={firstname} onChange={e=>setFirstname(e.target.value)} className={ allErr || firstnameErr ? style.inputErr : style.input} placeholder="Нэр"/>
                                <div className={firstnameErr || allErr ? style.errDivVisible : style.errDivInvisible}>{allErr ? "Энэ талбар шаардлагатай" : firstnameErr ? "Нэр нь 2 тэмдэгтээс урт, 30 тэмдэгтээс бага байх ёстой" : ""}</div>
                                <input value={lastname} onChange={e=>setLastname(e.target.value)} className={allErr || lastnameErr ? style.inputErr : style.input} placeholder='Овог'/>
                                <div className={lastnameErr || allErr ? style.errDivVisible : style.errDivInvisible}>{allErr ? "Энэ талбар шаардлагатай" : lastnameErr ? "Овог нь 2 тэмдэгтээс урт, 30 тэмдэгтээс бага байх ёстой" : ""}</div>
                                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className={allErr || emailErr || emailExistErr ? style.inputErr : style.input}  placeholder='Имэйл'/>
                                <div className={emailExistErr || allErr || emailErr ? style.errDivVisible : style.errDivInvisible}>{allErr ? "Энэ талбар шаардлагатай" : emailErr ? "Хүчингүй и-мэйл" : emailExistErr ? "Имэйл аль хэдийн бүртгэгдсэн байна" : ""}</div>
                                <div className={style.passwordContainer}>
                                    <input type={togglePassword ? "password" : "text"} value={password} onChange={e=>setPassword(e.target.value)} className={allErr || passwordErr ? style.inputPasswordErr : style.inputPassword}  placeholder='Нууц үг'/>

                                    <div onClick={changePassword} className={style.eyeIconContainer}>
                                    <AiFillEye className={togglePassword ? style.eyeShow : style.eyeHide}></AiFillEye>
                                    <AiFillEyeInvisible className={togglePassword ? style.eyeHide : style.eyeShow}></AiFillEyeInvisible>
                                    </div>
                                </div>
                                <div className={passwordErr || allErr ? style.errDivVisible : style.errDivInvisible}>{ allErr ? "Энэ талбар шаардлагатай" : passwordErr ? "Password must be longer than 6 characters and less than 30 characters" : ""}</div>

                                <div onClick={toggleCheckbox} className={style.checkboxContainer}>
                                    <input className={style.checkbox} type='checkbox'/>
                                    <div className={style.termsandpolicytext}>
                                    Бүртгэл үүсгэснээр та MEET-н Үйлчилгээний нөхцөл болон Нууцлалын бодлогыг зөвшөөрч байна
                                    </div>
                                </div>

                            </div>

                            <div className={style.buttonContainer}>
                                <button onClick={Signup} className={style.button}>Бүртгүүлэх</button>
                            </div>

                            <div className={style.lineContainer}>
                                <div className={style.lineLong}></div>
                            </div>

                            <div className={style.loggedinContainer}>
                                <div className={style.text}>Та аль хэдийн бүртгүүлсэн үү?</div>
                                <Link to="/login">Нэвтрэх</Link>
                            </div>
                        </div>

                    </div>

                    <div className={style.rightSide}>

                    </div>
                </div>
            }
        </div>
    )
}