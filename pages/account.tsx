import type { NextPage } from "next";
import Layout from "../components/Layout";
import styles from "../styles/pages/Account.module.scss";

const account: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.container__1}>
          <div
            className={`${styles.container__card} ${styles["container__card-1"]}`}
          >
            <div>
              <h6>Your Balance</h6>
              <p>$ 0.00</p>
              <p>WayPay</p>
            </div>
          </div>
          <div
            className={`${styles.container__card} ${styles["container__card-1"]}`}
          >
            <div>
              <h6>APY</h6>
              <p>1,175.7%</p>
              <p>Daily ROI 1%</p>
            </div>
          </div>
          <div
            className={`${styles.container__card} ${styles["container__card-1"]}`}
          >
            <div>
              <h6>Next Rebase:</h6>
              <p>0</p>
              <p>You will earn money soon</p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.container__card} ${styles["container__card-2"]}`}
        >
          <ul>
            <li>
              <h6>Current WayPay Price</h6>
              <p>$0.002953</p>
            </li>
            <li>
              <h6>Next Reward Amount</h6>
              <p>$0.002953</p>
            </li>
            <li>
              <h6>Next Reward Amount in USD</h6>
              <p>$0.002953</p>
            </li>
            <li>
              <h6>Max Sale Rate</h6>
              <p>$0.002953</p>
            </li>
            <li>
              <h6>Amount you can sell today</h6>
              <p>$0.002953</p>
            </li>
            <li>
              <h6>ROI (1-DAY Rate) USD</h6>
              <p>$0.002953</p>
            </li>
            <li>
              <h6>ROI (5-DAY Rate) USD</h6>
              <p>$0.002953</p>
            </li>
            <li>
              <h6>ROI (30-DAY Rate) USD</h6>
              <p>$0.002953</p>
            </li>
            <li>
              <h6>ROI (365-DAY Rate) USD</h6>
              <p>$0.002953</p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default account;
