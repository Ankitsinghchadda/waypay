import React, { useState } from "react";
import styles from "../styles/components/UpperCoubntBox.module.scss";
const UpperCountBox = ({ dropdownFirst }) => {
  const [active, setActive] = useState(false);
  return (
    <div className={styles.UpperCountBox}>
      <div className={styles.top_area}>
        <h1>From:</h1>
        <h1>
          Balance: <span>0</span>
        </h1>
      </div>
      <div className={styles.bottom}>
        <input type="text" placeholder="0" />
        <div className={styles.dropdownWrapper}>
          <p>MAX</p>
          <div className={styles.dropdown}>
            {dropdownFirst == true ? (
              <div
                className={styles.top_area}
                onClick={(e) => {
                  setActive(!active);
                }}
              >
                <img src="./logo_2.png" alt="" />
                <p>Waypay</p>
                <img src="./images/caret.svg" alt="" />
              </div>
            ) : (
              <div
                className={styles.top_area}
                onClick={(e) => {
                  setActive(!active);
                }}
              >
                <img src="./images/bnb.svg" alt="" />
                <p>BNB</p>
                <img src="./images/caret.svg" alt="" />
              </div>
            )}

            {active && (
              <ul>
                <li
                  onClick={(e) => {
                    setActive(false);
                  }}
                >
                  <img src="./logo_2.png" alt="" />
                  <p>Waypay</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperCountBox;
