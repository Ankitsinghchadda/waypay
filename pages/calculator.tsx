import type { NextPage } from "next";
import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/pages/Calculator.module.scss";

const Calculator: NextPage = () => {
  const [amount, setAmount] = useState("");
  const [apy, setApy] = useState("");
  const [purchase, setPurchase] = useState("");
  const [price, setPrice] = useState("");
  const [stakingDuration, setStakingDuration] = useState(1);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.est__inputs__container}>
          <h2>Estimated Inputs</h2>
          <div className={styles.inputs__container}>
            <div className={styles.first__row}>
              <div>
                <p>WAYPAY AMOUNT</p>
                <div>
                  <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => {
                      if (e.target.value !== "0") {
                        setAmount(e.target.value);
                      }
                    }}
                  />
                  <span>MAX</span>
                </div>
              </div>
              <div>
                <p>APY</p>
                <div>
                  <input
                    style={{ color: "white" }}
                    type="text"
                    value="5,000%"
                    disabled
                  />
                  {/* <select value={apy} onChange={(e) => setApy(e.target.value)}>
                    <option value="" disabled>
                      5,000%
                    </option> */}
                  {/* <option value="1">5,000%</option>
                    <option value="2">99,999%</option>
                    <option value="3">199,999%</option>
                    <option value="4">399,999%</option> */}
                  {/* </select> */}
                </div>
              </div>
              <div>
                <p>WAYPAY PRICE AT PURCHASE ($)</p>
                <div>
                  <input
                    type="number"
                    placeholder="0"
                    value={purchase}
                    onChange={(e) => {
                      if (e.target.value !== "0") {
                        setPurchase(e.target.value);
                      }
                    }}
                  />
                  <span>CURRENT</span>
                </div>
              </div>
              <div>
                <p>FUTURE WAYPAY PRICE ($)</p>
                <div>
                  <input
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) => {
                      if (e.target.value !== "0") {
                        setPrice(e.target.value);
                      }
                    }}
                  />
                  <span>CURRENT</span>
                </div>
              </div>
            </div>
            <div className={styles.second__row}>
              <p>STAKING DURATION ( {stakingDuration} DAY )</p>
              <input
                type="range"
                value={stakingDuration}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > 0) {
                    setStakingDuration(value);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.est__returns__container}>
          <h2>Estimated Returns</h2>
          <div className={styles.returns__container}>
            <div>
              <p>YOUR INITIAL INVESTMENT</p>
              <span>$0</span>
            </div>
            <div>
              <p>YOUR CURRENT WEALTH</p>
              <span>$0.00</span>
            </div>
            <div>
              <p>WAYPAY REWARDS EST.</p>
              <span>0.00 WAYPAY</span>
            </div>
            <div>
              <p>POTENTIAL RETURN</p>
              <span>$0</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
