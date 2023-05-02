import styles from "../styles/Password.module.css";
import { FaUserAlt } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Password = () => {
  return (
    <>
    <div></div>
      <div className={styles.all}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <Link
              className={styles.navlink}
              to={"/settings"}
              style={{ borderTopLeftRadius: 10 }}
            >
              <div>
                <FaUserAlt className={styles.user}></FaUserAlt>
              </div>
              <div className={styles.text1}>Personal information</div>
            </Link>
            <button className={styles.navlink1} to={"password"}>
              <div>
                <HiLockClosed className={styles.user}></HiLockClosed>
              </div>
              <div className={styles.text1}>Password</div>
            </button>
          </div>
          <div className={styles.main}>
            <h2>Change password</h2>
            <div>
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <div>Current password</div>
                <input className={styles.input} type="text" />
              </div>
            </div>
            <div className={styles.nameInput}>
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <div>New password</div>
                <input className={styles.input} type="text" />
              </div>
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <div>Retype new password</div>
                <input className={styles.input} type="text" />
              </div>
            </div>
          
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className={styles.saveButton}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};