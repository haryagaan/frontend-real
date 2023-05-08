import styles from "../styles/Header.module.css";
import React, { useEffect, useRef, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { BsFillChatDotsFill } from "react-icons/bs";
import { TbMoodSmileBeam } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import logo from "../assets/logo.png";
import logoCut from "../assets/logoCut.png";


import { Link } from "react-router-dom";

export const Header = () => {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef(null);

  const handleScroll = (elTopOffset, elHeight) => {
    var yoff = window.pageYOffset;
    // console.log(elTopOffset);
    // console.log(elHeight);
    if (yoff > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
      // console.log(sticky.isSticky);
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
  const [showDropdown4, setShowDropdown4] = useState(false);

  const handleButtonClick1 = () => {
    setShowDropdown1(!showDropdown1);
    setShowDropdown2(false);
    setShowDropdown3(false);
    setShowDropdown4(false);
  };
  const handleButtonClick2 = () => {
    setShowDropdown2(!showDropdown2);
    setShowDropdown1(false);
    setShowDropdown3(false);
    setShowDropdown4(false);
  };
  const handleButtonClick3 = () => {
    setShowDropdown3(!showDropdown3);
    setShowDropdown1(false);
    setShowDropdown2(false);
    setShowDropdown4(false);
  };
  const handleButtonClick4 = () => {
    setShowDropdown4(!showDropdown4);
    setShowDropdown1(false);
    setShowDropdown2(false);
    setShowDropdown3(false);
  };

  return (
    <>
      <div
        className={sticky.isSticky ? styles.navbar1Sticky : styles.navbar1}
        ref={headerRef}
      >
        <div className={styles.container}>
          <a href="/" style={{ display: "flex", gap: 10 }}>
            <img src={logo} className={styles.logo} />
            <img src={logoCut} className={styles.logoCut} />
          </a>

          <div className={styles.drop1}>
            <button>
              <ImSearch
                className={styles.icon}
                onClick={handleButtonClick4}
              ></ImSearch>
            </button>
            {showDropdown4 && (
              <div className={styles.input}>
                <input
                  type="text"
                  placeholder="What service are you looking for today?"
                ></input>
              </div>
            )}
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
                      <a href="/" className={styles.a}>
                        View all
                      </a>
                    </div>
                    <hr />
                    <div className={styles.message}>
                      <div>No notifications</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <a href="/nofications" className={styles.dropRes2}>
          <BsFillBellFill className={styles.icon}></BsFillBellFill>
            </a>
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
                      <a href="/" className={styles.a}>
                        View all
                      </a>
                    </div>
                    <hr />
                    <div className={styles.message}>
                      <div>No messages</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <a href="/messages" className={styles.dropRes1}>
              <BsFillChatDotsFill
                className={styles.icon}
              ></BsFillChatDotsFill>
            </a>
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
                        {/* <div>My account</div> */}
                        <Link to="/profile">My profile</Link>
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