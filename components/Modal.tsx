import React from "react";
import styles from "../styles/components/Modal.module.scss";

function Modal({ setOpenModal }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className={styles.title}>
          <h1>Settings</h1>
        </div>
        <div className={styles.body}>
          <p>General</p>
          <h3>Default Transaction Speed (GWEI)</h3>
          <div className={styles.chooseButton}>
            <button>Standard(5)</button>
            <button>Fast(6)</button>
            <button>Instant(7)</button>
          </div>
          <h3>Slippage Tolerance</h3>

          <div className={styles.chooseButton}>
            <button>0.1%</button>
            <button>0.5%</button>
            <button>1%</button>
          </div>
        </div>
        {/* <div className={styles.footer}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id={styles.cancelBtn}
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      </div>
    </div>
  );
}

export default Modal;
