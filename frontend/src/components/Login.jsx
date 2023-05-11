import style from '../styles/Login.module.css';

import logo from "../assets/logo.png"

import { Link, useNavigate } from 'react-router-dom';

import { Verification } from './Verification';

import {AiFillFacebook} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import {AiFillApple} from "react-icons/ai"
import {AiFillEye} from "react-icons/ai"
import {AiFillEyeInvisible} from "react-icons/ai"

import { client } from '../client/client';

import { useEffect, useRef, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { signInWithPopup } from 'firebase/auth';
import { auth, providerFacebook, providerGoogle } from '../firebaseConfig/firebaseConfig';

import { DataContext } from "../context/DataProvider"
import { useContext } from "react"

export const Login = () => {
    const {
        isAuth,
        setIsAuth
    }=useContext(DataContext);

    const navigate=useNavigate()


    const [user,setUser]=useState();
    const [isVerified,setIsVerified]=useState();



    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    const [togglePassword , setTogglePassword]=useState(true); 

    const [err,setErr]=useState();
    const [allErr,setAllErr]=useState(false);
    const [emailErr,setEmailErr]=useState(false);
    const [passwordErr,setPasswordErr]=useState(false);

    const toastSuccess = (string) => toast.success(string);

    const toastError= (string) => toast.error(string);

    function changePassword(){
        setTogglePassword(prev=>!prev);
    }

    function facebookAuth() {
        signInWithPopup(auth, providerFacebook)
            .then((result) => {
                const base = result.user.providerData[0];

                const displayName = base.displayName;
                const email = base.email;
                const imageUrl = base.photoURL;
                const socialUid = base.uid;

                client
                    .post('/auth/social/create', {
                        email,
                        displayName,
                        imageUrl,
                        socialUid,
                        socialType: 'Facebook',
                    })
                    .then(async (res) => {
                        // console.log(res.data);
                        localStorage.setItem("token" , res.data.token)
                        // localStorage.setItem("id",res.data.id);
                        navigate("/home")
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                        toastError(err.response.data)
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function googleAuth() {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                const base = result.user.providerData[0];

                const displayName = base.displayName;
                const email = base.email;
                const imageUrl = base.photoURL;
                const socialUid = base.uid;

                client
                    .post('/auth/social/create', {
                        displayName,
                        email,
                        imageUrl,
                        socialUid,
                        socialType: 'Google',
                    })
                    .then(async (res) => {
                        // console.log(res.data);
                        // localStorage.setItem("id",res.data.id);
                        localStorage.setItem("token" , res.data.token)
                        navigate("/home")
                    })
                    .catch((err) => {
                        console.log(err);
                        toastError(err.response.data)
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function Login() {
       await client.post("/auth/login" , {email , password})
        .then(async(res)=>{
            // console.log(res.data)
            localStorage.setItem("token", res.data.token)
            // localStorage.setItem("id",res.data.id)
            setIsAuth(true);
            setUser(res.data.user)
            setIsVerified(res.data.isVerified);
            if(res.data.isVerified==true){
                navigate("/home")
            }
        }).catch((err)=>{
            // console.log(err)
            // console.log(err.response.data)
            setErr(err.response.data);
            toastError(err.response.data)
        })
    }

    useEffect(()=>{
        if(err!=null){
            if(err=="Fill in all forms"){
                setAllErr(true);
                setEmailErr(true);
                setPasswordErr(true);
            }else if(err=="Couldnt find user"){
                setAllErr(false);
                setEmailErr(true);
                setPasswordErr(false);
            }else if(err=="Password incorrect"){
                setAllErr(false);
                setEmailErr(false);
                setPasswordErr(true);
            }
        }
    },[err])

    // console.log(isAuth)

    return (
        isVerified ==null ?
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

            <div className={style.innerContainer}>

                <div className={style.logoContainer}>
                    <img src={logo} className={style.logo}/>
                </div>

                <div className={style.main}>

                    <div className={style.bigText}>
                        Login
                    </div>

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

                    <div className={style.login}>
                        <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className={emailErr ? style.inputErr : style.input}/>

                        <div className={allErr || emailErr ? style.errDivVisible : style.errDivInvisible}>{allErr ? "This field is required" : emailErr ? "Couldn't find user" : ""}</div>

                        <div className={style.passwordContainer}>
                            <input type={togglePassword ? "password" : "text"} value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' className={passwordErr ? style.inputPasswordErr : style.inputPassword}/>

                            <div onClick={changePassword} className={style.eyeIconContainer}>
                               <AiFillEye className={togglePassword ? style.eyeShow : style.eyeHide}></AiFillEye>
                               <AiFillEyeInvisible className={togglePassword ? style.eyeHide : style.eyeShow}></AiFillEyeInvisible>
                            </div>

                            <div className={allErr || passwordErr ? style.errDivVisible : style.errDivInvisible}>{allErr ? "This field is required" : passwordErr ? "Password incorrect" : ""}</div>
                        </div>

                    </div>

                    <div className={style.forgotPasswordCont}>
                        <Link className={style.forgotPassword} to="/password">Forgot your password?</Link>
                    </div>

                    <div className={style.buttonContainer}>
                        <button onClick={Login} className={style.button}>Login</button>
                    </div>

                    <div className={style.lineContainer}>
                        <div className={style.lineLong}></div>
                    </div>

                    <div className={style.loggedinContainer}>
                        <div className={style.text}>Still haven’t created a MEET account?</div>
                        <Link to="/signup">Signup</Link>
                    </div>

                </div>

            </div>
        </div>

        : isVerified==false ?

        <Verification user={user}></Verification>

        : <div>Welcome</div>
    )
};
