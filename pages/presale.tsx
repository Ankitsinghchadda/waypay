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
import { infuraProvider } from "wagmi/providers/infura";
import Swal from "sweetalert2";

const Presale: NextPage = () => {
  const [totalTokens, setTotalTokens] = useState(0);
  const [noOfTokens, setNoOfTokens] = useState("");
  const [busdPerTokenWei, setBusdPerTokenWei] = useState(null);
  const [busdPerToken, setBusdPerToken] = useState("");
  const [approved, setApproved] = useState(false);
  const [button, setButton] = useState("Approve");
  const [disabled, setDisabled] = useState(false);
  const infuraId = process.env.INFURA_ID;

  useEffect(() => {
    async function load() {
      let provider = new ethers.providers.InfuraProvider("ropsten", infuraId);
      let BUSDcontract = new ethers.Contract(ERC20Address, erc20abi, provider);
      let PreSalecontract = new ethers.Contract(
        PreSaleAddress,
        presaleabi,
        provider
      );
      const busdperTokenString = (await PreSalecontract.busdSalePrice()).toString();
      const busdTokenNum = Number(busdperTokenString);
      const busdTokenParsed = ethers.utils.formatEther(busdperTokenString);
      console.log(ethers.utils.parseEther("1").toString());
      setBusdPerTokenWei(busdperTokenString);
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

  //Approve BUSD token for use
  const handleApproval = async () => {
    if (window.ethereum) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let BUSDcontract = new ethers.Contract(ERC20Address, erc20abi, signer);
      let PreSalecontract = new ethers.Contract(
        PreSaleAddress,
        presaleabi,
        signer
      );

      const address = signer.getAddress();
      try {
        const str = totalTokens.toString();
        const string = ethers.utils.parseEther(str).toString();
        await BUSDcontract.approve(PreSaleAddress, string);
        setDisabled(true);
        BUSDcontract.on("Approval", (owner, spender, value) => {
          console.log(owner, spender, value);
          setApproved(true);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleBuy = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let BUSDcontract = new ethers.Contract(ERC20Address, erc20abi, signer);
    let PreSalecontract = new ethers.Contract(
      PreSaleAddress,
      presaleabi,
      signer
    );
    console.log(ethers.utils.parseEther(noOfTokens.toString()).toString());
    const address = signer.getAddress();
    try {
      await PreSalecontract.purchaseTokenWithBUSD(
        ethers.utils.parseEther(noOfTokens.toString()).toString()
      );
      PreSalecontract.on("PurchaseBUSD", (address, bep20, busd) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          text: "Presale buy sucessful",
          showConfirmButton: false,
          timer: 1500,
          background: "#0b1225",
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToken = async () => {
    const tokenAddress = "0xFA6adcFf6A90c11f31Bc9bb59eC0a6efB38381C6";
    const tokenSymbol = "WAYPAY";
    const tokenDecimal = 18;
    const tokenImage = { waypayIcon };

    //@ts-ignore
    ethereum.request({
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
            {approved ? (
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
            )}
          </div>

          <div className={styles.total__container}>
            <span>Total price</span>
            <span>{Number(totalTokens.toString()).toFixed(2)} BUSD</span>
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
