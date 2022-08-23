import type { NextPage } from "next";
import Layout from "../components/Layout";
import styles from "../styles/pages/Staking.module.scss";

const staking: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.container__heading}>
          <div>
            <h6>WayPay Staking</h6>
            <p>Just stake some tokens to earn</p>
            <p>High APR, low risk.</p>
          </div>
          <p>Total Locked: 234</p>
        </div>
        <div className={styles.container__main}>
          <div className={styles["container__main-1"]}>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3 months</td>
                  <td>0.1% + 0.7% = 0.8%</td>
                </tr>
                <tr>
                  <td>6 months</td>
                  <td>0.1% + 0.7% = 0.8%</td>
                </tr>
                <tr>
                  <td>9 months</td>
                  <td>0.1% + 0.7% = 0.8%</td>
                </tr>
                <tr>
                  <td>12 months</td>
                  <td>0.1% + 0.7% = 0.8%</td>
                </tr>
              </tbody>
            </table>
            <div className={styles["container__main-details"]}>
              <div>
                <h6>WayPay Profit</h6>
                <p>$</p>
              </div>
              <div>
                <h6>WayPay Locked</h6>
                <p>$</p>
              </div>
              <div>
                <h6>Unlocks in</h6>
                <p>- days</p>
              </div>
            </div>
            <div className={styles["container__main-1-buttons"]}>
              <button>Claim Reward</button>
              <button>Withdraw</button>
            </div>
          </div>
          <div className={styles["container__main-2"]}>
            <div className={styles["container__main-2-balance"]}>
              <label htmlFor="balance">
                Balance: <span>0</span>
              </label>
              <input type="text" id="balance" />
              <div>
                <p>25%</p>
                <p>50%</p>
                <p>75%</p>
                <p>MAX</p>
              </div>
            </div>
            <div className={styles["container__main-2-duration"]}>
              <h6>Add Duration</h6>
              <div>
                <p>3 Months</p>
                <p>6 Months</p>
                <p>9 Months</p>
                <p>12 Months</p>
              </div>
            </div>
            <div className={styles["container__main-2-pool"]}>
              <h5>Enable Pool</h5>
              <button>Enable</button>
            </div>
          </div>
          <div className={styles["container__main-3"]}>
            <div className={styles["container__main-3-overview"]}>
              <h5>WayPay Overview</h5>
              <div>
                <div>
                  <p>WayPay to lock</p>
                  <p>0</p>
                </div>
                <div>
                  <p>APY</p>
                  <p>0.00</p>
                </div>
                <div>
                  <p>Duration</p>
                  <p>720 days</p>
                </div>
                <div>
                  <p>Unlocked on</p>
                  <p>Fri Jul 05 2024</p>
                </div>
                <div>
                  <p>Expected ROI</p>
                  <p>$0.0</p>
                </div>
              </div>
              <button>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default staking;
