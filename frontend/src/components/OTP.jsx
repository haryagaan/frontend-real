import React, { useState } from 'react';

import style from '../styles/OTP.module.css';

import { client } from '../client/client';

import OTPInput, { ResendOTP } from 'otp-input-react';

import phoneLogo from '../assets/phone.png';
import { useNavigate } from 'react-router-dom';

export const OTP = ({ id } , {phone}) => {
    const navigate=useNavigate();

    const [OTP, setOTP] = useState('');

    async function verifyCode(code) {
        window.confirmationResult
            .confirm(code)
            .then(async (result) => {
                // User signed in successfully.
                const user = result.user;
                // console.log(user);
                console.log('verification done');

                await client
                    .post('/auth/verify/' + id , {phone})
                    .then(async (res) => {
                        console.log(res.data);
                        //success phone auth
                        navigate("/home")
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                console.log(error);
                console.log('Error');
            });
    }

    if (OTP.length == 6) {
        verifyCode(OTP);
    }

    return (
        <div className={style.phoneCont}>
            <div className={style.phoneInnerCont}>
                <div className={style.logoContainer}>
                    <img src={phoneLogo} className={style.phoneLogo} />
                </div>

                <div className={style.rightCont}>
                    <div className={style.bigText}>Enter OTP we sent you</div>

                    <div className={style.otpCont}>
                        <OTPInput
                            value={OTP}
                            onChange={setOTP}
                            autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
