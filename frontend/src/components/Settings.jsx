import styles from "../styles/Settings.module.css";
import { FaUserAlt } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Settings = () => {
  return (
    <>
      <div className={styles.all}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <button
              className={styles.navlink}
              style={{ borderTopLeftRadius: 10 }}
            >
              <div>
                <FaUserAlt className={styles.user}></FaUserAlt>
              </div>
              <div className={styles.text1}>Personal information</div>
            </button>
            <Link className={styles.navlink1} to={"/password"}>
              <div>
                <HiLockClosed className={styles.user}></HiLockClosed>
              </div>
              <div className={styles.text1}>Password</div>
            </Link>
          </div>
          <div className={styles.main}>
            <h2>General</h2>
            <div className={styles.nameInput}>
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <div>First Name</div>
                <input className={styles.input} type="text" />
              </div>
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <div>Last Name</div>
                <input className={styles.input} type="text" />
              </div>
            </div>
            <div>
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <div>Country</div>
                <input className={styles.input} type="text" />
              </div>
            </div>
            <h2>Email</h2>
            <input className={styles.inputEmail} type="text" />
            <div className={styles.important}>
              <div
                style={{ fontSize: 20, fontWeight: "bolder", paddingLeft: 10 }}
              >
                !
              </div>
              <div>
                <div>Important!</div>
                <div>
                  For security reasons, if you change your email address, you
                  will not be able to update your withdrawal method for one
                  week.
                </div>
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <button className={styles.saveButton}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};