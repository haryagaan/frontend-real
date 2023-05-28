import style from "../styles/ClientOrFreelancer.module.css";
import worker from "../assets/worker.gif";
import codeImg from "../assets/image.jpeg";
import team from "../assets/team.jpeg";

import logo from "../assets/logo.png"

import { Link } from "react-router-dom";


import { useNavigate } from "react-router-dom";


export const Client = () => {

  const navigate=useNavigate();

  function SignupFreelancer(){
    navigate("/signup")
    localStorage.setItem("code" , 300)
  }

  function SignupClient(){
    navigate("/signup")
    localStorage.setItem("code" , 200)
  }

  return (
    <div className={style.container}>

    <div className={style.header}>
      <div className={style.headerImgDiv}>
        <img src={logo} className={style.headerLogo}/>
      </div>

      <div className={style.headerTextDiv}>
        <Link to="/login" className={style.headerText}>Нэвтрэх</Link>
      </div>
    </div>

    <div className={style.home}>
      <div className={style.main}>
        <div className={style.column1}>
          <p className={style.title1}>Ажлын шинэ эринд</p>
          <span className={style.title}>тавтай морил</span>
          <p className={style.font1}>
            Бид хамгийн сайн ажилчдыг шилдэг компаниудад холбодог
          </p>
          <div className={style.row}>
            <div onClick={SignupFreelancer} className={style.button1}>Чөлөөт ажилчнаар элсэх</div>
            <div onClick={SignupClient} className={style.button2}>Ажилчин авах</div>
          </div>
        </div>
        <div className={style.column2s}>
          <img className={style.img} src={worker}/>
        </div>
      </div>
      <div className={style.main2}>
        <h1 className={style.biggestH}>Бодит . Ажил. Болсон.</h1>
        <div className={style.backgrnd}>
          <div className={style.team}>
            <div
              className={style.main}
              style={{ height: "450px", marginBottom: "100px" }}
            >
              <div className={style.teamCol}>
                <img className={style.img2} src={codeImg}></img>
                <img className={style.img3} src={team}></img>
              </div>
              <div
                className={style.column2}
                // style={{ alignItems: "flex-start" }}
              >
                <h1 className={style.h}>
                  Чиний ур чадвар бол зөвхөн чинийх. Үүнийгээ өөийнхөө төлөө
                  зөвөөр ашиглаарай
                </h1>
                <p className={style.font1}>
                  Бидэнтэй нэгдсэнээр өөртөө цоо шинэ боломжуудыг олж аваарай
                </p>
                <Link className={style.button1}>Бүртгүүлэх</Link>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.col}>
                <div className={style.line}></div>
                <p className={style.font2} style={{ fontSize: "20px" }}>
                  Урт хугацааны ажлууд
                </p>
              </div>
              <div className={style.col}>
                <div
                  className={style.line}
                  style={{ border: "5px solid #7246e5" }}
                ></div>
                <p className={style.font2} style={{ fontSize: "20px" }}>
                  Найдвартай үйлчилгээ
                </p>
              </div>
              <div className={style.col}>
                <div
                  className={style.line}
                  style={{ border: "5px solid #e5c152" }}
                ></div>
                <p className={style.font2} style={{ fontSize: "20px" }}>
                  Харилцаа холбоо
                </p>
              </div>
              <div className={style.col}>
                <div
                  className={style.line}
                  style={{ border: "5px solid #ff699d" }}
                ></div>
                <p className={style.font2
                } style={{ fontSize: "20px" }}>
                  Түргэн шуурхай
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};