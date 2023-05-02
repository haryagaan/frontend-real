import React, { useEffect, useRef, useState } from 'react'
import style from "../styles/Signup.module.css"

import { client } from '../client/client'


import { BiErrorCircle } from "react-icons/bi"
import { AiOutlineEye } from "react-icons/ai"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { HiMail } from "react-icons/hi"

import { AiFillGoogleCircle } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { BsTelephoneFill } from "react-icons/bs"

import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"
import { auth, app, providerFacebook, providerGoogle } from "../firebaseConfig/firebaseConfig"
import { async } from '@firebase/util'

export const Signup = () => {

    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const [checkbox, setCheckbox] = useState(false);

    const [errorMessage, setErrorMessage] = useState();
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const phoneNumber = useRef();
    const otp = useRef();

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "normal",
                    callback: (response) => {
                        console.log(response)
                        onSignInSubmit();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    function onSignInSubmit() {
        onCaptchVerify();

        const phoneNumber = "+97699507342";

        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult)
                console.log("otp sent")
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log("error msg not sent");
                console.log(error)
            });
    }

    // function verifyCode() {
    //     const otpInput = "123456";

    //     window.confirmationResult.confirm(otpInput).then(async (result) => {
    //         // User signed in successfully.
    //         const user = result.user;
    //         console.log(user)
    //         console.log("verification done")
    //         // ...
    //     }).catch((error) => {
    //         console.log(error)
    //         console.log("Error")
    //     });
    // }


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
                socialType: "Facebook"
            }).then(async (res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
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
                displayName, email, imageUrl, socialUid, socialType: "Google"
            }).then(async (res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })

        }).catch((err) => {
            console.log(err)
        })
    }


    async function Signup() {
        await client.post("/auth/signup", {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
        }).then(async (res) => {
            console.log(res.data);
        }).catch((err) => {
            // console.log(err.response.data)
            setErrorMessage(err.response.data);
        })
    }

    function changeCheckboxValue() {
        setCheckbox(!checkbox)
    }

    useEffect(() => {
        if (errorMessage != null) {
            // console.log(errorMessage)
            if (errorMessage == "Fill in all the forms") {
                setFirstnameError(true);
                setLastnameError(true);
                setEmailError(true);
                setPasswordError(true);
            }

            if (errorMessage == "Firstname must be longer than 2 characters and less than 30 characters") {
                setFirstnameError(true);
                setLastnameError(false);
                setEmailError(false);
                setPasswordError(false);
            }

            if (errorMessage == "Lastname must be longer than 2 characters and less than 30 characters") {
                setFirstnameError(false);
                setLastnameError(true);
                setEmailError(false);
                setPasswordError(false);
            }

            if (errorMessage == "Invalid email" || errorMessage == "Email already exists") {
                setFirstnameError(false);
                setLastnameError(false);
                setEmailError(true);
                setPasswordError(false);
            }

            if (errorMessage == "Password must be longer than 6 characters and less than 30 characters") {
                setFirstnameError(false);
                setLastnameError(false);
                setEmailError(false);
                setPasswordError(true);
            }
        }
    }, [errorMessage]);

    return (
        <div className={style.container}>
            <div className={style.innerContainer}>
                <div className={style.rightSide}>
                    <div className={style.box}>
                        <div className={style.textBig}>Signup</div>

                        <div className={style.namesContainer}>
                            <div className={style.inputContainer}>
                                <div className={style.name}>Firstname</div>
                                <input ref={firstName} placeholder='Firstname' className={firstnameError ? style.inputErr : style.input} />
                                <BiErrorCircle className={firstnameError ? style.errIcon : style.errIconInvisible}></BiErrorCircle>
                            </div>

                            <div className={style.inputContainer}>
                                <div className={style.name}>Lastname</div>
                                <input ref={lastName} placeholder='Lastname' className={lastnameError ? style.inputErr : style.input} />
                                <BiErrorCircle className={lastnameError ? style.errIcon : style.errIconInvisible}></BiErrorCircle>
                            </div>
                        </div>

                        <div className={style.emailContainer}>
                            <div className={style.inputContainerEmail}>
                                <div className={style.name}>Email</div>
                                <div className={style.inputCont}>
                                    <input ref={email} type="email" placeholder='Email' className={emailError ? style.inputEmailErr : style.inputEmail} />
                                </div>
                                <BiErrorCircle className={emailError ? style.errIconEmail : style.errIconInvisible}></BiErrorCircle>
                            </div>
                        </div>

                        <div className={style.emailContainer}>
                            <div className={style.inputContainerEmail}>
                                <div className={style.name}>Password</div>
                                <input ref={password} type={checkbox ? "text" : "password"} placeholder='Password' className={passwordError ? style.inputEmailErr : style.inputEmail} />
                                <BiErrorCircle className={passwordError ? style.errIconEmail : style.errIconInvisible}></BiErrorCircle>
                            </div>
                        </div>

                        <div className={style.checkboxContainer}>
                            <input onClick={changeCheckboxValue} type="checkbox" />
                            <div className={style.checkboxText}>
                                Show password
                            </div>
                        </div>

                        <div id='recaptcha-container'>
                        </div>

                        {/* <div>
                            <input ref={phoneNumber} />
                            <button onClick={onSignInSubmit}>Send</button>
                        </div> */}

                        <div className={errorMessage != null ? style.errContainer : style}>
                            {errorMessage && errorMessage}
                        </div>

                        <div className={style.buttonContainer}>
                            <button className={style.button} onClick={Signup}>Signup</button>
                        </div>

                        <div className={style.lineContainer}>
                            <div className={style.line} />
                            <div className={style.lineText}>Or</div>
                            <div className={style.line} />
                        </div>

                        <div className={style.socialContainer}>
                            <div className={style.socialInnerContainer}>
                                <BsFacebook className={style.facebookIcon} onClick={facebookAuth}></BsFacebook>

                                <AiFillGoogleCircle className={style.googleIcon} onClick={googleAuth}></AiFillGoogleCircle>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={style.leftSide}>

                </div>
            </div>
        </div>
    )
}