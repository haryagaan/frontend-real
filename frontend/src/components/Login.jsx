import style from '../styles/Login.module.css';
import { Verification } from './Verification';

import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiMail } from 'react-icons/hi';
import { BiErrorCircle } from 'react-icons/bi';

import { client } from '../client/client';

import { useEffect, useRef, useState } from 'react';

import { signInWithPopup } from 'firebase/auth';
import { auth, providerFacebook, providerGoogle } from '../firebaseConfig/firebaseConfig';

import { AiFillGoogleCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { BsTelephoneFill } from 'react-icons/bs';

export const Login = () => {
    const [user, setUser] = useState();
    const [isVerified, setIsVerified] = useState();

    const email = useRef();
    const password = useRef();

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
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
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function Login() {
        await client
            .post('/auth/login', { email: email.current.value, password: password.current.value })
            .then(async (res) => {
                console.log(res.data);
                localStorage.setItem("token" , res.data.token);

                await client.post("/decode")
                    .then(async(res)=>{
                        console.log(res.data)
                    }).catch((err)=>{
                        console.log(err)
                    })

                // setUser(res.data.user);
                // setIsVerified(res.data.isVerified);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data);
            });
    }

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        // console.log(errors)
        if (errors == 'Fill in all forms') {
            setEmailError(true);
            setPasswordError(true);
        }

        if (errors == 'Couldnt find user') {
            setEmailError(true);
            setPasswordError(false);
        }

        if (errors == 'Password incorrect') {
            setEmailError(false);
            setPasswordError(true);
        }
    }, [errors]);

    console.log(isVerified);

    return isVerified == null ? (
        <div className={style.container}>
            <div className={style.innerContainer}>
                <div className={style.login}>
                    <div className={style.textBig}>Login</div>

                    <div className={style.inputContainer}>
                        <div className={style.inputEl}>
                            <input ref={email} placeholder="Email" className={style.input} />
                            <div className={style.eyeIconContainer}>
                                <HiMail className={style.icon}></HiMail>
                            </div>
                        </div>

                        <div className={emailError ? style.errorContainer : ''}>
                            {emailError ? (
                                <div>
                                    <BiErrorCircle></BiErrorCircle>
                                    Couldnt find user
                                </div>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className={style.inputEl}>
                            <input
                                ref={password}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className={style.input}
                            />
                            <button className={style.eyeIconContainer} onClick={togglePassword}>
                                <div className={style.icon}>
                                    {showPassword ? (
                                        <AiOutlineEye></AiOutlineEye>
                                    ) : (
                                        <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                                    )}
                                </div>
                            </button>
                        </div>

                        <div className={passwordError ? style.errorContainer : ''}>
                            {passwordError ? (
                                <div>
                                    <BiErrorCircle></BiErrorCircle>
                                    Password incorrect
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>

                    <div className={style.buttonContainer}>
                        <button onClick={Login} className={style.button}>
                            Login
                        </button>
                    </div>

                    <div className={style.lineContainer}>
                        <div className={style.line}></div>
                        <div className={style.lineText}>Or</div>
                        <div className={style.line}></div>
                    </div>

                    <div className={style.socialContainer}>
                        <div className={style.socialInnerContainer}>
                            <BsFacebook className={style.facebookIcon} onClick={facebookAuth}></BsFacebook>

                            <AiFillGoogleCircle className={style.googleIcon} onClick={googleAuth}></AiFillGoogleCircle>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : isVerified == false ? (
        <Verification user={user}></Verification>
    ) : (
        <div>Enter</div>
    );
};
