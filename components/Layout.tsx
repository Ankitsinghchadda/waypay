import type { NextPage } from "next";
import SideNav from "./SideNav";
import styles from "../styles/Layout.module.scss";
import Navbar from "./Navbar";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <main className={styles.container}>
      <Navbar />
      <SideNav />
      <div className={styles.container__main}>
        <div className={styles["container__main-right"]}>
          <div
            style={{
              marginTop: "2.4rem",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
