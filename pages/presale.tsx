import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import metaMaskIcon from "../assets/images/meta-mask-icon.svg";
import busdIcon from "../assets/images/busd.png";
import waypayIcon from "../assets/images/waypay.png";
import Layout from "../components/Layout";
import styles from "../styles/pages/Presale.module.scss";
import { ethers } from "ethers";
import { ERC20Address, PreSaleAddress } from "../Config/Config.js";
import erc20abi from "../ABI/erc20.json";
import presaleabi from "../ABI/presale.json";
import Swal from "sweetalert2";
import {
  useWeb3Contract,
  useWeb3ExecuteFunction,
  useMoralis,
} from "react-moralis";

const Presale: NextPage = () => {
  const [totalTokens, setTotalTokens] = useState(0);
  const [noOfTokens, setNoOfTokens] = useState("");
  const [busdPerTokenWei, setBusdPerTokenWei] = useState(null);
  const [busdPerToken, setBusdPerToken] = useState("");
  const [approved, setApproved] = useState(false);
  const [button, setButton] = useState("Approve");
  const [disabled, setDisabled] = useState(false);
  const infuraId = process.env.INFURA_ID;
  const { chainId, enableWeb3, isWeb3Enabled } = useMoralis();

  console.log(chainId);

  const { runContractFunction: bnbSalePrice } = useWeb3Contract({
    abi: presaleabi,
    contractAddress: PreSaleAddress,
    functionName: "bnbSalePrice",
  });
  const { runContractFunction: purchaseMethod } = useWeb3Contract({
    abi: presaleabi,
    contractAddress: PreSaleAddress,
    functionName: "saleMethod",
  });

  const { runContractFunction: purchaseTokenWithBNB } = useWeb3Contract({});
  const { runContractFunction: updateSaleMethod } = useWeb3Contract({});

  console.log(busdPerTokenWei);
  console.log(busdPerToken);

  useEffect(() => {
    async function load() {
      if (!isWeb3Enabled) {
        await enableWeb3();
      }
      const bnbperTokenPriceWei = parseInt((await bnbSalePrice()).toString());
      const busdTokenParsed = await ethers.utils.formatEther(
        bnbperTokenPriceWei
      );
      console.log({ bnbperTokenPriceWei, busdTokenParsed });
      setBusdPerTokenWei(bnbperTokenPriceWei);
      setBusdPerToken(busdTokenParsed);
    }
    load();
  }, []);

  const onInputChanges = (value: string) => {
    setNoOfTokens(value);

    setTotalTokens(Number(busdPerToken) * parseInt(value));
  };

  const handleMinusBtnClick = () => {
    if (noOfTokens === "" || noOfTokens === "0") {
      setTotalTokens(0);
      return;
    }

    if (noOfTokens === "1") {
      setNoOfTokens("");
      setTotalTokens(0);
      return;
    }

    const tokens = parseInt(noOfTokens) - 1;
    setNoOfTokens(tokens.toString());
    setTotalTokens(tokens * Number(busdPerToken));
  };

  const handlePlusBtnClick = () => {
    if (noOfTokens === "") {
      setNoOfTokens("1");
      setTotalTokens(Number(busdPerToken));
      return;
    }

    const tokens = parseInt(noOfTokens) + 1;
    setNoOfTokens(tokens.toString());
    setTotalTokens(tokens * Number(busdPerToken));
  };

  console.log({ totalTokens });

  const handleBuy = async () => {
    const option = {
      abi: presaleabi,
      contractAddress: PreSaleAddress,
      functionName: "purchaseTokenWithBNB",
      msgValue: (totalTokens * 10 ** 18).toString(),
      params: {
        baseAmount: ethers.utils.parseEther(noOfTokens.toString()).toString(),
      },
    };
    const option2 = {
      abi: presaleabi,
      contractAddress: PreSaleAddress,
      functionName: "updateSaleMethod",
      params: {
        sMethod: 2,
      },
    };
    if ((await purchaseMethod()) == 2) {
      await purchaseTokenWithBNB({ params: option });
    } else {
      await updateSaleMethod({ params: option2 });
      handleBuy();
    }
  };

  const handleAddToken = async () => {
    const tokenAddress = ERC20Address;
    const tokenSymbol = "WAYPAY";
    const tokenDecimal = 18;
    const tokenImage = { waypayIcon };

    //@ts-ignore
    ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: 18,
            image: "https://i.ibb.co/CwW0h28/waypay.png",
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log("Waypay successfully added to wallet!");
        } else {
          throw new Error("Something went wrong.");
        }
      })
      .catch(console.error);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <img src="./images/binance-dash.png" className={styles.binance} />
          <img src="./images/waypay_dash.png" className={styles.token_img} />
          <h2>Buy Presale Tokens</h2>
          <p>{busdPerToken} / 1 WAYPAY</p>
          <div className={styles.input}>
            <button onClick={handleMinusBtnClick}>
              <AiOutlineMinus size={10} />
            </button>
            <input
              type="number"
              name="quantity"
              placeholder="0"
              value={noOfTokens}
              onChange={(e) => {
                if (e.target.value !== "0") {
                  onInputChanges(e.target.value);
                }
              }}
            />
            <button onClick={handlePlusBtnClick}>
              <AiOutlinePlus size={10} />
            </button>
          </div>
          <div>
            <button onClick={handleBuy} className={styles.approve__btn}>
              Buy
            </button>
            {/* {approved ? (
              <button onClick={handleBuy} className={styles.approve__btn}>
                Buy
              </button>
            ) : disabled ? (
              <button
                onClick={handleApproval}
                className={styles.disapprove__btn}
                disabled={disabled}
              >
                Approve
              </button>
            ) : (
              <button
                onClick={handleApproval}
                className={styles.approve__btn}
                disabled={disabled}
              >
                Approve
              </button>
            )} */}
          </div>

          <div className={styles.total__container}>
            <span>Total price</span>
            <span>{Number(totalTokens.toString()).toFixed(10)} BNB</span>
          </div>
          <button onClick={handleAddToken} className={styles.add__token__btn}>
            <span>Add token to</span>
            <div className={styles.img}>
              <Image src={metaMaskIcon} alt="meta-mask" />
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Presale;
