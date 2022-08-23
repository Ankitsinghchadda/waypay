import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineCalculator, AiOutlineSwap } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineManageAccounts } from "react-icons/md";
import styles from "../styles/components/SideNav.module.scss";
import { pages } from "./pages";
import Image from "next/image";
import { VscGraph } from "react-icons/vsc";

const SideNav: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.container__main}>
        <ul className={styles["container__main-links"]}>
          {pages.map(({ id, pageName, path }) => {
            return (
              <li
                key={id}
                className={`${
                  router.pathname === path
                    ? styles["container__main-links-active"]
                    : ""
                }`}
              >
                {pageName.toUpperCase() === "DASHBOARD" ? (
                  <MdOutlineDashboard size={22} />
                ) : pageName.toUpperCase() === "ACCOUNT" ? (
                  <MdOutlineManageAccounts size={22} />
                ) : pageName.toUpperCase() === "CALCULATOR" ? (
                  <AiOutlineCalculator size={22} />
                ) : pageName.toUpperCase() === "DOCS" ? (
                  <IoMdDocument size={22} />
                ) : pageName.toUpperCase() === "SWAP" ? (
                  <AiOutlineSwap size={22} />
                ) : pageName.toUpperCase() === "STAKING" ? (
                  <MdOutlineDashboard size={22} />
                ) : pageName.toUpperCase() === "PRESALE" ? (
                  <VscGraph size={22} />
                ) : (
                  <MdOutlineDashboard size={22} />
                )}

                <Link href={path}>
                  <a>{pageName}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.logo}>
        <Image
          src={"/logo_2.png"}
          objectFit={"contain"}
          alt="logo"
          width={200}
          height={140}
        />
      </div>
      <footer className={styles.container__footer}>
        <p>WayPay - Stake, Bake, Take ©</p>
      </footer>
    </div>
  );
};

export default SideNav;
