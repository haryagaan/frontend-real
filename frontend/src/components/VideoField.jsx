import style from "../styles/VideoField.module.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
// import ReactPlayer from "react-player";

export const VideoField = () => {
  const VideoPath = "https://youtu.be/mZ5hnNRBFsc";
  return (
    <div className={style.field}>
      <div className={style.mainRow}>
        <div className={style.column1}>
          <h1>Давуу тал? Бүх зүйл нь</h1>
          <div className={style.row}>
            <AiOutlineCheckCircle className={style.icon}></AiOutlineCheckCircle>
            <p className={style.title}>Өөрийн алтан цагаа бүү алд</p>
          </div>
          <p className={style.text}>
            Та манай веб сайтаас өөрийн хүссэн чөлөөт ажилчныг олоорой
          </p>
          <div className={style.row}>
            <AiOutlineCheckCircle className={style.icon}></AiOutlineCheckCircle>
            <p className={style.title}>Ажлыг хурдан, чанартай гүйцэгтэх</p>
          </div>

          <p className={style.text}>
            Та өөрийн төслөө хамгийн шилдэг чөлөөт ажилчанд өгснөөр найдвартай
            үйлчилгээг танд үзүүлэх болно.
          </p>
          <div className={style.row}>
            <AiOutlineCheckCircle className={style.icon}></AiOutlineCheckCircle>
            <p className={style.title}>Үнэлгээ өгөх систем</p>
          </div>

          <p className={style.text}>
            Чөлөөт ажилчанг та хийсэн ажлаар нь дүгнэх боломжтой
          </p>
          <div className={style.row}>
            <AiOutlineCheckCircle className={style.icon}></AiOutlineCheckCircle>
            <p className={style.title}>24/7 үйлчилгээ</p>
          </div>

          <p className={style.text}>
            Хэрэг болсон үедээ цаг үлдэлгүй бидэнтэй шууд холбогдоорой
          </p>
        </div>
        <div className={style.column2}>
          <iframe
            className={style.video}
            src="https://www.youtube.com/embed/mZ5hnNRBFsc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};