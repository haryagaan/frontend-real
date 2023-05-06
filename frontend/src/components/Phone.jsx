import React, { useState } from 'react';
import style from '../styles/Phone.module.css';

import { client } from '../client/client';

import OTPInput, { ResendOTP } from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth, app, providerFacebook, providerGoogle } from '../firebaseConfig/firebaseConfig';

import phoneLogo from '../assets/phone.png';

import { OTP } from './OTP';

export const Phone = ({ id }) => {
    const [phone, setPhone] = useState('');
    const [goToOTP, setGoToOTP] = useState(false);

    console.log(id);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'normal',
                    callback: (response) => {
                        console.log(response);
                        onSignInSubmit();
                    },
                    'expired-callback': () => {},
                },
                auth,
            );
        }
    }

    function onSignInSubmit(phoneNumber) {
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;

                console.log(confirmationResult);

                setGoToOTP(true);

                console.log('otp sent');
            })
            .catch((error) => {
                console.log('error msg not sent');
                console.log(error);
            });
    }


    function phoneCheck() {
        if (phone.length == 11) {
            const phoneNumber = '+' + phone;

            onSignInSubmit(phoneNumber);
        }
    }

    phoneCheck();


    return goToOTP ? (
        <OTP id={id}></OTP>
    ) : (
        <div className={style.phoneCont}>
            <div className={style.phoneInnerCont}>
                <div className={style.logoContainer}>
                    <img className={style.phoneLogo} src={phoneLogo} />
                </div>

                <div className={style.rightCont}>
                    <div className={style.bigText}>Please enter your phone</div>

                    <div className={style.phoneInput}>
                        <PhoneInput country={'mn'} regions={'asia'} enableAreaCodes={true} onChange={setPhone} />
                    </div>

                    <div className={style.captcha} id="recaptcha-container"></div>
                </div>
            </div>
        </div>
    );
};
