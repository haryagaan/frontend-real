import style from "../styles/ClientOrFreelancer.module.css";
import worker from "../assets/worker.gif";
import codeImg from "../assets/image.jpeg";
import team from "../assets/team.jpeg";
export const Client = () => {
  return (
    <div className={style.home}>
      <div className={style.main}>
        <div className={style.column1}>
          <h1 className>Ажлын шинэ эринд</h1>
          <span className={style.title}>тавтай морил.</span>
          <p className={style.font1}>
            Бид хамгийн сайн ажилчдыг шилдэг компаниудад холбодог.
          </p>
          <div className={style.row}>
            <div className={style.button1}>чөлөөт ажилчнаар элсэх</div>
            <div className={style.button2}>ажилчин авах</div>
          </div>
        </div>
        <div className={style.column2}>
          <img className={style.img} src={worker}></img>
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
                <button className={style.button1}>Бүртгүүлэх</button>
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
  );
};