import { categories } from "../constants";
import { about } from "../constants";
import { comminity } from "../constants";
import { support } from "../constants";
import { more } from "../constants";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";

import { DataContext } from "../context/DataProvider"

import { useContext, useEffect, useState } from "react"

import styles from "../styles/Footer.module.css";

import { Link } from "react-router-dom";

export const Footer = () => {
  const {
    providerCategories
  }=useContext(DataContext);

  // console.log(providerCategories)

  return (
    <>
      <div className={styles.all}>
        <div className={styles.top}>
          <div className={styles.deed}>
            <div className={styles.column}>
              <div style={{ display: "flex" }} className={styles.title1}>
                <h4>Ангилал</h4>
                <div className={styles.svgContainer}>
                  <IoMdArrowDropdown className={styles.drop}/>
                </div>
              </div>

              {providerCategories && providerCategories.map((category , i) => (
                <Link to={`/category/${category._id}`} key={i} className={styles.text}>{category.category}</Link>
              ))}
            </div>
            <div className={styles.column}>
              <div style={{ display: "flex" }} className={styles.title2}>
                <h4>MEET-ийн тухай</h4>
                <div className={styles.svgContainer}>
                  <IoMdArrowDropdown className={styles.drop}/>
                </div>
              </div>

              {about.map((ab , i) => (
                <div key={i} className={styles.text}>{ab}</div>
              ))}
            </div>
            <div className={styles.column}>
              <div style={{ display: "flex" }} className={styles.title3}>
                <h4>Дэмжлэг</h4>
                <div className={styles.svgContainer}>
                  <IoMdArrowDropdown className={styles.drop}/>
                </div>
              </div>

              {support.map((sup,i) => (
                <div key={i} className={styles.text}>{sup}</div>
              ))}
            </div>
          </div>
          <div className={styles.dood}>
            <div className={styles.column}>
              <div style={{ display: "flex" }} className={styles.title4}>
                <h4>Нийгэмлэг</h4>
                <div className={styles.svgContainer}>
                  <IoMdArrowDropdown className={styles.drop}/>
                </div>
              </div>

              {comminity.map((com,i) => (
                <div key={i} className={styles.text}>{com}</div>
              ))}
            </div>
            <div className={styles.column}>
              <div style={{ display: "flex" }} className={styles.title5}>
                <h4>Бидний тухай дэлгэрэнгүй</h4>
                <div className={styles.svgContainer}>
                  <IoMdArrowDropdown className={styles.drop}/>
                </div>
              </div>
              {more.map((mor,i) => (
                <div key={i} className={styles.text}>{mor}</div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.bottom}>
          <div className={styles.social}>
            <AiOutlineTwitter className={styles.icon} />
            <BsFacebook className={styles.icon} />
            <AiFillLinkedin className={styles.icon} />
            <BsPinterest className={styles.icon} />
            <BsInstagram className={styles.icon} />
          </div>
        </div>
      </div>
    </>
  );
};