import type { NextPage } from "next";
import styles from "../styles/components/Navbar.module.scss";
import Image from "next/image";
import { NavbarState } from "../atom/Navbar";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import { pages } from "./pages";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { SiTelegram } from "react-icons/si";
import metaWalletIcon from "../assets/images/meta-wallet-icon.svg";
import { useState, useEffect } from "react";
import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useChain } from "react-moralis";
// import {switch}

// const bnbTestnetChain = [{id : 97, name: "Smart Chain - Testnet", network: "Smart Chain - Testnet", nativeCurrency : {
//   name: "Binance Coin",
//   symbol: "BNB",
//   decimals: 18
// }, rpcUrls: {public:"https://bsc-dataseed.binance.org"}, testnet : true}]

export const YourApp = () => {
  return <ConnectButton />;
};

const Navbar: NextPage = () => {
  const [navState, setNavState] = useRecoilState<boolean>(NavbarState);
  const router: NextRouter = useRouter();

  const { isWeb3Enabled, chainId, enableWeb3, isWeb3EnableLoading } =
    useMoralis();
  const { switchNetwork } = useChain();

  // useEffect(() => {
  //   if (isWeb3Enabled && chainId != "0x61") {
  //     switchNetwork("0x61");
  //   }
  //   if (!isWeb3Enabled && !isWeb3EnableLoading) {
  //     enableWeb3();
  //   }
  // }, [isWeb3Enabled, isWeb3EnableLoading, chainId]);

  useEffect(() => {
    if (isWeb3Enabled && chainId != "0x61") {
      switchNetwork("0x61");
    }
  }, [chainId, isWeb3Enabled]);

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.container__logo}
          onClick={() => router.push("/")}
        >
          <div>
            <Image
              src={"/logo-white.png"}
              layout={"fill"}
              objectFit={"contain"}
              alt={"WayPay Logo"}
            />
          </div>
        </div>
        <div className={styles.nav__left}>
          <div className={styles.social__icons}>
            <a href="https://twitter.com/WayPay">
              <BsTwitter fontSize="1.5rem" color="white" />
            </a>
            <a href="https://discord.gg/8b5FPPF3dh">
              <FaDiscord fontSize="1.5rem" color="white" />
            </a>
            {/* <a href="#">
              <MdFacebook fontSize="1.5rem" color="white" />
            </a> */}
            <a href="https://t.me/WayPayprotocol">
              <SiTelegram fontSize="1.5rem" color="white" />
            </a>
          </div>
          <ConnectButton moralisAuth={false} />
        </div>
        <div
          onClick={() => {
            setNavState(!navState);
          }}
          className={`${styles.container__hamburger} ${
            navState ? styles["container__hamburger-open"] : ""
          }`}
        >
          <div className={styles["container__hamburger-1"]}></div>
          <div className={styles["container__hamburger-2"]}></div>
          <div className={styles["container__hamburger-3"]}></div>
        </div>
      </div>

      <div
        className={`${styles.container__main} ${
          navState ? styles["container__main-open"] : ""
        }`}
      >
        <ul>
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
                <Link href={path}>
                  <a onClick={() => setNavState(false)}>{pageName}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
