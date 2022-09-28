import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import "animate.css";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState<boolean>(false);
  const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </MoralisProvider>
      </>
    );
  }
}

export default MyApp;
