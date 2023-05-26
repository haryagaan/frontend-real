import { useState } from "react";
import style from "../styles/Home1.module.css";
import { AiOutlineSearch } from "react-icons/ai";
export const HomePage = () => {
  const [showDropdown,setShowDropdown]=useState(false);

  const [input,setInput]=useState();

  function ShowDropdown(){
    console.log(1)

    setShowDropdown(prev=>!prev);
  }

  return (
    <div className={style.home}>
      <div className={style.bckgrnd}>
        <div className={style.col1}>
          <h1 className={style.title}>
            Зөв чөлөөт үйлчилгээг , {" "}
            <span className={style.title2}>хурдан</span> олоорой
          </h1>
          <div className={style.row}>
            <div>
              <input
                onChange={(e)=>{setInput(e.target.value)}}
                className={style.input}
                placeholder="Өөрт хэрэгтэй үйлчилгээг хайна уу..."
              ></input>

              {
                showDropdown ?

                <div className={style.dropdown}>
                  dropdown
                </div>

                :

                <div></div>
              }
            </div>

            <div onClick={ShowDropdown} className={style.button}>
              <AiOutlineSearch className={style.searchIcon}></AiOutlineSearch>
            </div>
          </div>
          {/* <div className={style.row}>
            <p className={style.font}>Popular:</p>
            <div className={style.butt}>Website design</div>
            <div className={style.butt}>Word press</div>
            <div className={style.butt}>Logo design</div>
            <div className={style.butt}>AI services</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};