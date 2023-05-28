import { useState , useContext, useRef } from "react";
import style from "../styles/Home1.module.css";
import { AiOutlineSearch } from "react-icons/ai";

// import { DataContext } from "../context/DataProvider";
import { Link } from "react-router-dom";

// import SyncLoader from "react-spinners/SyncLoader"


export const HomePage = () => {
  // const {
  //   providerCategories
  // }=useContext(DataContext);

  // const [loading,setLoading]=useState(false);

  // const [categories,setCategories]=useState([]);

  // if(providerCategories){
  //   setCategories(providerCategories);
  // }

  const [showDropdown,setShowDropdown]=useState(false);

  const [input,setInput]=useState();

  const dropdown=useRef([])

  function ShowDropdown(){
    // providerCategories && providerCategories.map((category,i)=>{
    //   if(input!=null){
    //     if(input[0]==category.category[0] || input[0].toUpperCase()==category.category[0]){
    //       dropdown.current=[]
    //       dropdown.current.push(category)
    //     }
    //   }else if(input==null){
    //     dropdown.current=[];
    //     dropdown.current=providerCategories;
    //   }
    // })

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
            <div className={style.searchDiv}>
              <input
                onChange={(e)=>{setInput(e.target.value)}}
                className={style.input}
                placeholder="Өөрт хэрэгтэй үйлчилгээг хайна уу..."
              ></input>

              {
                showDropdown ?

                <div className={style.dropdown}>
                  {/* {
                    providerCategories && providerCategories.map((category,i)=>{
                      return(
                        <Link to={`/category/${category._id}`} className={style.dropdownEl}>
                          <div className={style.dropdownCategory}>
                            <img className={style.dropdownImg} src={category.imageUrl}/>
                            {category.category}
                          </div>
                          <hr></hr>
                        </Link>
                      )
                    })
                  } */}
                </div>

                :

                <div></div>
              }
            </div>

            <div onClick={ShowDropdown} className={style.button}>
              <AiOutlineSearch className={style.searchIcon}></AiOutlineSearch>
            </div>
          </div>
          <div className={style.row}>
            <p className={style.font}>Алдартай:</p>
            <div style={{display:"flex" , width:"50vw" , overflowX:"auto"}}>
              {/* <div className={style.butt}>{providerCategories && providerCategories[0].category}</div>
              <div className={style.butt}>{providerCategories && providerCategories[1].category}</div>
              <div className={style.butt}>{providerCategories && providerCategories[2].category}</div>
              <div className={style.butt}>{providerCategories && providerCategories[3].category}</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};