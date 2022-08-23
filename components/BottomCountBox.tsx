import React, { useState } from "react";
import styles from "../styles/components/UpperCoubntBox.module.scss";
const BottomCountBox = ({ dropdownFirst }) => {
  const [active, setActive] = useState(false);
  return (
    <div className={styles.UpperCountBox}>
      <div className={styles.top_area}>
        <h1>To:</h1>
        <h1>
          Balance: <span>0</span>
        </h1>
      </div>
      <div className={styles.bottom}>
        <input type="text" placeholder="0" />
        <div className={styles.dropdownWrapper}>
          <div className={styles.dropdown}>
            {dropdownFirst == 1 ? (
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
            ) : (
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
            )}

            {active && (
              <ul>
                <li
                  onClick={(e) => {
                    setActive(false);
                  }}
                >
                  <img src="./images/bnb.svg" alt="" />
                  <p>BNB</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCountBox;
