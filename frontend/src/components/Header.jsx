import styles from "../styles/Header.module.css";
import React, { useEffect, useRef, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { BsFillChatDotsFill } from "react-icons/bs";
import { TbMoodSmileBeam } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import logo from "../assets/1.png";

export const Header = () => {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef(null);

  const handleScroll = (elTopOffset, elHeight) => {
    var yoff = window.pageYOffset;
    console.log(elTopOffset);
    console.log(elHeight);
    if (yoff > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
      console.log(sticky.isSticky);
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  useEffect(() => {
    var header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height);
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  

  const handleButtonClick1 = () => {
    setShowDropdown1(!showDropdown1);
    setShowDropdown2(false);
    setShowDropdown3(false);
  };
  const handleButtonClick2 = () => {
    setShowDropdown2(!showDropdown2);
    setShowDropdown1(false);
    setShowDropdown3(false);
  };
  const handleButtonClick3 = () => {
    setShowDropdown3(!showDropdown3);
    setShowDropdown1(false);
    setShowDropdown2(false);
  };

  return (
    <>
      <div
        className={sticky.isSticky ? styles.navbar1Sticky : styles.navbar1}
        ref={headerRef}
      >
        <div className={styles.container}>
          <div style={{ display: "flex", gap: 10 }}>
            <img src={logo} className={styles.logo} />
            <h3>This is not logo</h3>
          </div>

          <div className={styles.drop1}>
            <input
              type="text"
              placeholder="What service are you looking for today?"
            ></input>
            <button>
              <ImSearch className={styles.icon2}></ImSearch>
            </button>
          </div>
          <div className={styles.drop2}>
            <button onClick={handleButtonClick1}>
              <BsFillBellFill className={styles.icon}></BsFillBellFill>
            </button>
            {showDropdown1 && (
             <div className={styles.messages}>
             <div>
               <div>
                 <div className={styles.view}>
                   <div>Notifications</div>
                   <a href="/" className={styles.a}>View all</a>
                 </div>
                 <hr />
                 <div className={styles.message}>
                   <div>NO NOTIFICATIONS</div>
                 </div>
               </div>
             </div>
           </div>
            )}
          </div>
          <div className={styles.drop3}>
            <button onClick={handleButtonClick2}>
              <BsFillChatDotsFill className={styles.icon}></BsFillChatDotsFill>
            </button>
            {showDropdown2 && (
              <div className={styles.messages}>
                <div>
                  <div>
                    <div className={styles.view}>
                      <div>Messages</div>
                      <a href="/" className={styles.a}>View all</a>
                    </div>
                    <hr />
                    <div className={styles.message}>
                      <div>NO MESSAGES</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className={styles.drop4}>
              <button onClick={handleButtonClick3}>
                <TbMoodSmileBeam className={styles.icon1}></TbMoodSmileBeam>
              </button>
              {showDropdown3 && (
                <div className={styles.settings}>
                  <div className={styles.set}>
                    <div>
                      <h4>Account name</h4>
                      <hr />
                      <div className={styles.accName1}>
                        <div>My account</div>
                        <div>My profile</div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h4>Find work</h4>
                      <div className={styles.accName2}>
                        <div>Work as freelance</div>
                        <div>Find Projects</div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h4>Help</h4>
                      <div>Help center</div>
                    </div>
                    <hr />
                    <a href="/" className={styles.logout}>
                      Log out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};