import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import metaMaskIcon from "../../assets/images/meta-mask-icon.svg";
import busdIcon from "../../assets/images/busd.png";
import waypayIcon from "../../assets/images/waypay.png";
import referalIcon from "../../assets/images/referral.png";
import Layout from "../../components/Layout";
import styles from "../../styles/pages/Presale.module.scss";
import { ethers } from "ethers";
import {
  ERC20Address,
  PreSaleAddress,
  BUSDAddress,
} from "../../Config/Config.js";
import erc20abi from "../../ABI/erc20.json";
import presaleabi from "../../ABI/presale.json";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import BUSDabi from "../../ABI/BUSD.json";

const Presale: NextPage = () => {
  const [totalTokens, setTotalTokens] = useState(0);
  const [noOfTokens, setNoOfTokens] = useState("");
  const [busdPerTokenWei, setBusdPerTokenWei] = useState(null);
  const [busdPerToken, setBusdPerToken] = useState("");
  const { chainId, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account } =
    useMoralis();

  // console.log(chainId);
  const router = useRouter();
  const { reffered } = router.query;

  const { runContractFunction: busdPrice } = useWeb3Contract({
    abi: presaleabi,
    contractAddress: PreSaleAddress,
    functionName: "busdSalePrice",
  });
  const { runContractFunction: purchaseMethod } = useWeb3Contract({
    abi: presaleabi,
    contractAddress: PreSaleAddress,
    functionName: "saleMethod",
  });

  const { runContractFunction: purchaseTokenWithBUSD } = useWeb3Contract({});
  const { runContractFunction: updateSaleMethod } = useWeb3Contract({});
  const { runContractFunction: approve } = useWeb3Contract({});

  // console.log(busdPerTokenWei);
  // console.log(busdPerToken);
  async function load() {
    await busdPrice({
      onSuccess: (bnbPrice: any) => {
        const bnbperTokenPriceWei = parseInt(bnbPrice).toString();
        const bnbTokenParsed = ethers.utils.formatEther(bnbperTokenPriceWei);
        console.log({ bnbperTokenPriceWei, bnbTokenParsed });
        setBusdPerTokenWei(bnbperTokenPriceWei);
        setBusdPerToken(bnbTokenParsed);
      },
      onError: (e) => {
        console.log({ e });
      },
    });
  }

  const enable_Web3 = async () => {
    await enableWeb3();
  };
  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      enable_Web3();
    }
    load();
  }, [isWeb3Enabled, isWeb3EnableLoading]);

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

  //

  const handleBuy = async () => {
    console.log(ethers.utils.parseEther(totalTokens.toString()).toString());
    const approveOption = {
      abi: BUSDabi,
      contractAddress: BUSDAddress,
      functionName: "approve",
      params: {
        _spender: PreSaleAddress,
        _value: ethers.utils.parseEther(totalTokens.toString()),
      },
    };
    const option: any = {
      abi: presaleabi,
      contractAddress: PreSaleAddress,
      functionName: "purchaseTokenWithBUSD",
      // msgValue: ethers.utils.parseEther(totalTokens.toString()).toString(),
      params: {
        baseAmount: ethers.utils.parseEther(noOfTokens.toString()).toString(),
        _referralAddress: reffered,
      },
    };
    const option2 = {
      abi: presaleabi,
      contractAddress: PreSaleAddress,
      functionName: "updateSaleMethod",
      params: {
        sMethod: 1,
      },
    };

    await approve({
      params: approveOption,
      onSuccess: async () => {
        console.log("approved Successfully");
        if ((await purchaseMethod()) == 1) {
          await purchaseTokenWithBUSD({
            params: option,
            onSuccess: () => {
              alert("Successfull");
            },
            onError: (e) => {
              alert(e["data"].message);
            },
          });
        } else {
          await updateSaleMethod({ params: option2 });
          await purchaseTokenWithBUSD({
            params: option,
            onSuccess: () => {
              alert("Successfull");
            },
            onError: (e) => {
              alert(e["data"].message);
            },
          });
        }
      },
      onError: (e) => {
        console.log(e);
      },
    });
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

  const handleUseReferral = () => {
    navigator.clipboard.writeText(
      `https://waypay-three.vercel.app/presale/${account}`
    );
    alert(
      `Copied to clipboard: https://waypay-three.vercel.app/presale/${account} `
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Buy Presale Tokens</h2>
          <p>{busdPerToken} BUSD / 1 WAYPAY</p>
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
          </div>

          <div className={styles.total__container}>
            <div>
              <img
                src=".././images/binance-dash.png"
                className={styles.binance}
              />
            </div>
            <span>Total price</span>
            <span>{Number(totalTokens.toString()).toFixed(3)} BUSD</span>
            <div>
              <img
                src=".././images/waypay_dash.png"
                className={styles.token_img}
              />
            </div>
          </div>
          <div className={styles.addButton_container}>
            <button onClick={handleAddToken} className={styles.add__token__btn}>
              <span>Add token to</span>
              <div className={styles.img}>
                <Image src={metaMaskIcon} alt="meta-mask" />
              </div>
            </button>
            <button
              onClick={handleUseReferral}
              className={styles.add__token__btn}
            >
              <span>Use Referral</span>
              <div className={styles.img}>
                <Image src={referalIcon} alt="meta-mask" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Presale;
