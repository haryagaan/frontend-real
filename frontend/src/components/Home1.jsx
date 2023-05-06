import style from "../styles/Home1.module.css";
import { AiOutlineSearch } from "react-icons/ai";
export const HomePage = () => {
  return (
    <div className={style.home}>
      <div className={style.bckgrnd}>
        <div className={style.col1}>
          <h1 className={style.title}>
            Find the right{" "}
            <span className={style.title2}>freelance service</span>, right away
          </h1>
          <div className={style.row}>
            <input
              className={style.input}
              placeholder="Өөрт хэрэгтэй үйлчилгээг хайна уу..."
            ></input>
            <div className={style.button}>
              <AiOutlineSearch className={style.searchIcon}></AiOutlineSearch>
            </div>
          </div>
          <div className={style.row}>
            <p className={style.font}>Popular:</p>
            <div className={style.butt}>Website design</div>
            <div className={style.butt}>Word press</div>
            <div className={style.butt}>Logo design</div>
            <div className={style.butt}>AI services</div>
          </div>
        </div>
      </div>
    </div>
  );
};