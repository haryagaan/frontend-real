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

import HashLoader from "react-spinners/HashLoader";

export const Login = () => {
    const {
        isAuth,
        setIsAuth
    }=useContext(DataContext);

    const [loading,setLoading]=useState(false);

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

                setLoading(true);

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
                        setLoading(false);
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

                setLoading(true);

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
                        setLoading(false);
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
        // setLoading(true);
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
            if(!err){
                setLoading(true);
            }
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
                        Нэвтрэх
                    </div>

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

                    <div className={style.login}>
                        <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Имэйл' className={emailErr ? style.inputErr : style.input}/>

                        <div className={allErr || emailErr ? style.errDivVisible : style.errDivInvisible}>{allErr ? "Энэ талбар шаардлагатай" : emailErr ? "Хэрэглэгч олдсонгүй" : ""}</div>

                        <div className={style.passwordContainer}>
                            <input type={togglePassword ? "password" : "text"} value={password} onChange={e=>setPassword(e.target.value)} placeholder='Нууц үг' className={passwordErr ? style.inputPasswordErr : style.inputPassword}/>

                            <div onClick={changePassword} className={style.eyeIconContainer}>
                               <AiFillEye className={togglePassword ? style.eyeShow : style.eyeHide}></AiFillEye>
                               <AiFillEyeInvisible className={togglePassword ? style.eyeHide : style.eyeShow}></AiFillEyeInvisible>
                            </div>

                            <div className={allErr || passwordErr ? style.errDivVisible : style.errDivInvisible}>{allErr ? "Энэ талбар шаардлагатай" : passwordErr ? "Нууц үг буруу" : ""}</div>
                        </div>

                    </div>

                    <div className={style.forgotPasswordCont}>
                        <Link className={style.forgotPassword} to="/password">Нууц үгээ мартсан?</Link>
                    </div>

                    <div className={style.buttonContainer}>
                        <button onClick={Login} className={style.button}>Нэвтрэх</button>
                    </div>

                    <div className={style.lineContainer}>
                        <div className={style.lineLong}></div>
                    </div>

                    <div className={style.loggedinContainer}>
                        <div className={style.text}>Та MEET бүртгэл үүсгээгүй байна уу?</div>
                        <Link to="/signup">Бүртгүүлэх</Link>
                    </div>

                </div>

            </div>
        </div>

        : isVerified==false ?

        <Verification user={user}></Verification>

        : <div>Welcome</div>
    )
};
