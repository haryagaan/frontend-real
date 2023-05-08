import React, { useState } from 'react';
import style from '../styles/Verification.module.css';

import { Phone } from './Phone';

import { BsTelephoneFill } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';

import { client } from '../client/client';

import verifyImg from '../assets/verify.png';

export const Verification = ({ user }) => {
    const [phone, setPhone] = useState(false);

    // console.log(user);

    function verifyPhone() {
        setPhone((prev) => !prev);
    }

    async function verifyEmail() {
        await client
            .post('/email/send/' + user._id)
            .then(async (res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return phone == false ? (
        <div className={style.verContainer}>
            <div className={style.verInnerContainer}>
                <div className={style.logoCont}>
                    <img className={style.logo} src={verifyImg} />
                </div>

                <div className={style.rightCont}>
                    <div className={style.verBigText}>Choose a verification method</div>

                    <div className={style.verIconContainer}>
                        <div onClick={verifyPhone} className={style.verIconEl}>
                            <div className={style.phoneIconCont}>
                                <BsTelephoneFill className={style.phoneIcon}></BsTelephoneFill>
                            </div>

                            <div className={style.verIconText}>By phone number</div>
                        </div>

                        <div onClick={verifyEmail} className={style.verIconEl}>
                            <div className={style.emailIconCont}>
                                <TfiEmail></TfiEmail>
                            </div>

                            <div className={style.verIconText}>By email</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <Phone id={user._id}></Phone>
        </div>
    );
};
