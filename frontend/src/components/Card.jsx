import React from "react";
import styles from "../styles/Card.module.css";
import profile from "../assets/profile.png";
import { AiFillStar } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
export const Card = () => {
  const [more, setMore] = useState(false);
  const Readmore = () => {
    setMore(!more);
    console.log(more);
  };
  return (
    <div className={styles.main}>
      <div className={styles.card} style={{ height: more ? "auto" : "auto" }}>
        <div className={styles.mainColumn}>
          <div className={styles.row}>
            <img
              src={profile}
              style={{
                width: "82px",
                height: "82px",
                marginRight: "40px",
              }}
            ></img>
            <div className={styles.column}>
              <h2 className={styles.font}>Aldaraa</h2>
              <p className={styles.font}>Software engineer</p>
              <div className={styles.row}>
                <AiFillStar className={styles.star}></AiFillStar>
                <AiFillStar className={styles.star}></AiFillStar>
                <AiFillStar className={styles.star}></AiFillStar>
                <AiFillStar className={styles.star}></AiFillStar>
                <AiFillStar className={styles.star}></AiFillStar>
              </div>
            </div>
          </div>
          <p>
            Arquitecto con 4 años de experiencia en proyectos arquitectónicos de
            diversas escalas en distintos países. Soy creativa, versátil,
            adaptable y determinada.
            <span
              className={styles.more}
              onClick={Readmore}
              style={{ display: more ? "none" : "inline" }}
            >
              {" "}
              ...View more
            </span>
            <span
              style={{
                display: more ? "inline" : "none",
              }}
            >
              Durante el desarrollo de mi carrera he logrado trabajar en
              diversas áreas de la Arquitectura, tanto comercial, como
              residencial. De pequeña escala como reforma de apartamentos,
              mediana escala como locales comerciales y gran escala como hoteles
              y residencias, participando de manera activa en toda las etapas
              del proyecto, desde la concepción de la idea hasta ejecución de la
              obra. Manejo AutoCAD, Revit, SkecthUp, Lumion, VRAY y Adobe(Ps,
              Ai, Id)
            </span>
            <span
              className={styles.more}
              onClick={Readmore}
              style={{ display: more ? "inline" : "none" }}
            >
              {" "}
              View less
            </span>
          </p>
        </div>
        <div className={styles.mainColumn2}>
          <Button variant="light" className={styles.button}>
            Холбогдох
          </Button>
          <p>Дуусгасан ажил:</p>
        </div>
      </div>
    </div>
  );
};