import React, { useEffect, useRef, useState } from 'react'
import style from "../styles/Signup.module.css"

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

export const Signup = () => {
    const [logoSmall,setLogoSmall]=useState(false);
    const code=localStorage.getItem("code");

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [firstname,setFirstname]=useState();
    const [lastname,setLastname]=useState();

    const [togglePassword,setTogglePassword]=useState(true);

    const [error,setError]=useState();
    const [emailErr,setEmailErr]=useState();
    const [passwordErr,setPasswordErr]=useState();
    const [firstnameErr,setFirstnameErr]=useState();
    const [lastnameErr ,setLastnameErr]=useState(); 

    const toastSuccess = (string) => toast.success(string);

    const toastError= (string) => toast.error(string);

    function changePassword(){
        setTogglePassword(prev=>!prev);
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

            client.post("/auth/social/create", {
                email,
                displayName,
                imageUrl,
                socialUid,
                socialType: "Facebook",
                role:{user:code}
            }).then(async (res) => {
                console.log(res.data);
                toastSuccess("Created!!");
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

            client.post("/auth/social/create", {
                displayName,
                email,
                imageUrl,
                socialUid,
                socialType: "Google",
                role:{user:code}
            }).then(async (res) => {
                console.log(res.data)
                toastSuccess("Created!!");
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
        await client.post("/auth/signup", {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            role:{user:code}
        }).then(async (res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err.response.data)
            setError(err.response.data)
            toastError(err.response.data)
        })
    }

    useEffect(()=>{
        if(error!=null){
            if(error=="Fill in all the forms"){
                setEmailErr(true)
                setPasswordErr(true)
                setFirstnameErr(true)
                setLastnameErr(true)
            }else if(error=="Email already exists" || error=="Invalid email") {
                setEmailErr(true)
                setPasswordErr(false)
                setFirstnameErr(false)
                setLastnameErr(false)
            }else if(error=="Password must be longer than 6 characters and less than 30 characters") {
                setEmailErr(false)
                setPasswordErr(true)
                setFirstnameErr(false)
                setLastnameErr(false)
            }else if(error=="Lastname must be longer than 2 characters and less than 30 characters"){
                setEmailErr(false);
                setPasswordErr(false);
                setFirstnameErr(false);
                setLastnameErr(true)
            }else if(error=="Firstname must be longer than 2 characters and less than 30 characters"){
                setEmailErr(false);
                setPasswordErr(false);
                setFirstnameErr(true);
                setLastnameErr(false)
            }
        }
    },[error])

    return (
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
                    <div className={style.bigText}>Create an account</div>

                    <div className={style.socialContainer}>
                        <div onClick={facebookAuth} className={style.facebook}>
                            <AiFillFacebook className={style.Icon}></AiFillFacebook>
                            <div className={style.socialText}>Continue with Facebook</div>
                        </div>

                        <div onClick={googleAuth} className={style.google}>
                            <FcGoogle className={style.Icon}></FcGoogle>
                            <div className={style.socialTextBlack}>Continue with Google</div>
                        </div>

                        <div className={style.apple}>
                            <AiFillApple className={style.Icon}></AiFillApple>
                            <div className={style.socialText}>Continue with Apple</div>
                        </div>
                    </div>

                    <div className={style.lineContainer}>
                        <div className={style.line}></div>
                        <div className={style.lineText}>Or</div>
                        <div className={style.line}></div>
                    </div>

                    <div className={style.signupContainer}>
                        <input value={firstname} onChange={e=>setFirstname(e.target.value)} className={style.input} placeholder="Firstname"/>
                        <input value={lastname} onChange={e=>setLastname(e.target.value)} className={style.input}  placeholder='Lastname'/>
                        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className={style.input}  placeholder='Email'/>
                        <div className={style.passwordContainer}>
                            <input type={togglePassword ? "password" : "text"} value={password} onChange={e=>setPassword(e.target.value)} className={style.inputPassword}  placeholder='Password'/>

                            <div onClick={changePassword} className={style.eyeIconContainer}>
                               <AiFillEye className={togglePassword ? style.eyeShow : style.eyeHide}></AiFillEye>
                               <AiFillEyeInvisible className={togglePassword ? style.eyeHide : style.eyeShow}></AiFillEyeInvisible>
                            </div>

                        </div>
                        <div className={style.checkboxContainer}>
                            <input type='checkbox'/>
                            <div className={style.termsandpolicytext}>
                                By creating an account, you agree to MEET's terms of Service and Privacy Policy
                            </div>
                        </div>
                    </div>

                    <div className={style.buttonContainer}>
                        <button onClick={Signup} className={style.button}>Create your account</button>
                    </div>

                    <div className={style.lineContainer}>
                        <div className={style.lineLong}></div>
                    </div>

                    <div className={style.loggedinContainer}>
                        <div className={style.text}>Are you already registered?</div>
                        <Link to="/login">Login</Link>
                    </div>
                </div>

            </div>

            <div className={style.rightSide}>

            </div>
        </div>
    )
}