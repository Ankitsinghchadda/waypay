import type { NextPage } from "next";
import BottomCountBox from "../components/BottomCountBox";
import Layout from "../components/Layout";
import UpperCountBox from "../components/UpperCountBox";
import styles from "../styles/pages/Swap.module.scss";
import { useState } from "react";
import Modal from "../components/Modal";
const Swap: NextPage = () => {
  const [dropdownFirst, setDrodownFirst] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout>
      {openModal ? <Modal setOpenModal={setOpenModal} /> : <></>}

      <div className={styles.container}>
        <div className={styles.boxWrapper}>
          <div className={styles.topArea}>
            <div className={styles.leftArea}>
              <h1>Waypay Token</h1>
            </div>
            <div className={styles.rightArea}>
              <img src="./images/refresh.svg" alt="" />

              <img
                onClick={() => {
                  setOpenModal(true);
                }}
                src="./images/settings.svg"
                alt=""
              />
            </div>
          </div>

          <div className={styles.boxes_wrapper_count}>
            <UpperCountBox dropdownFirst={dropdownFirst} />
            <div className={styles.swap_button_wrapper}>
              <button
                onClick={(e) => {
                  setDrodownFirst(!dropdownFirst);
                }}
              >
                <img src="./images/swap.svg" alt="" />
              </button>
            </div>
            <BottomCountBox dropdownFirst={dropdownFirst} />
          </div>

          <div className={styles.buttonWrapper}>
            <div className={styles.count_wrapper}>
              <h1>Slippage Tolerance</h1>
              <p>0.1%</p>
            </div>
            <button>Swap</button>
          </div>
          <ul className={styles.box_list}>
            <li>
              <p>
                Minimum received
                <img src="./images/info.svg" alt="" />
              </p>
              <p>0 {!dropdownFirst ? "Waypay" : "BNB"} </p>
            </li>
            <li>
              <p>
                Price Impact
                <img src="./images/info.svg" alt="" />
              </p>
              <p>0%</p>
            </li>
            <li>
              <p>
                Liquidity Provider Fee
                <img src="./images/info.svg" alt="" />
              </p>
              <p>0% - No Fee</p>
            </li>
            <li>
              <p>
                Route
                <img src="./images/info.svg" alt="" />
              </p>
              {dropdownFirst ? (
                <p>Waypay {`< -- >`} BNB</p>
              ) : (
                <p>BNB {`< -- >`} Waypay</p>
              )}
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Swap;
