import type { NextPage } from 'next'
import styles from '../styles/components/Navbar.module.scss'
import Image from 'next/image'
import { NavbarState } from '../atom/Navbar'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { pages } from './pages'
import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'
import { FaDiscord } from 'react-icons/fa'
import { MdFacebook } from 'react-icons/md'
import { SiTelegram } from 'react-icons/si'
import metaWalletIcon from '../assets/images/meta-wallet-icon.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useAccount
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

// const infuraId = "573c0833f357434cb3684454b757de77";

    const { chains, provider } = configureChains(
    [chain.ropsten],
    [publicProvider(),]
)
const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })


  export const YourApp = () => {
    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
					<div className={styles.containerWallet}>
						<div className={styles.nav__left}>
							<div className={styles.btn}>
								<button onClick={openConnectModal}>
									<span className={styles.icon}>
										<Image src={metaWalletIcon} alt="meta wallet" />
									</span>
								<span>Connect Wallet</span>
								</button>
							</div>
						</div>
					</div>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <div className={styles.containerWallet}>
						        <div className={styles.nav__left}>
							      <div className={styles.btn}>
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                    </div>
                    </div>
                    </div>
                  );
                }
  
                return (
                  <div className='desktop:w-6 laptop:w-6 mobile:w-4' style={{ display: 'flex', gap: 5 }}>
                    <button
                      onClick={openAccountModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <picture>
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 20, height: 20}}
                           
                            />
                            </picture>
                          )}
                        </div>
                      )}

                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  };

const Navbar: NextPage = () => {
	const [navState, setNavState] = useRecoilState<boolean>(NavbarState)
	const router: NextRouter = useRouter()

	return (
		<>
			<div className={styles.container}>
				<div className={styles.container__logo} onClick={() => router.push('/')} >
					<div>
						<Image
							src={'/logo-white.png'}
							layout={'fill'}
							objectFit={'contain'}
							alt={'WayPay Logo'}
						/>
					</div>
				</div>
						<div className={styles.nav__left}>
							<div className={styles.social__icons}>
								<a href="#">
								<BsTwitter color="white" />
								</a>
								<a href="#">
								<FaDiscord color="white" />
								</a>
								<a href="#">
								<MdFacebook color="white" />
								</a>
								<a href="#">
								<SiTelegram color="white" />
								</a>
							</div>
					
						<WagmiConfig client={wagmiClient}>
                        <RainbowKitProvider chains={chains} 
                        theme={darkTheme({
                          accentColor: 'hsl(211, 100%, 51%)',
                          accentColorForeground: 'black',
                          borderRadius: 'large',
                          fontStack: 'system',
                        })}>
                        <YourApp/>
                        </RainbowKitProvider>
                        </WagmiConfig>
	
						</div>
						<div
						onClick={() => {
						setNavState(!navState)
						}}
						className={`${styles.container__hamburger} ${
						navState ? styles['container__hamburger-open'] : ''
						}`}
						>
						<div className={styles['container__hamburger-1']}></div>
						<div className={styles['container__hamburger-2']}></div>
						<div className={styles['container__hamburger-3']}></div>
						</div>
						</div>
						<div
							className={`${styles.container__main} ${
							navState ? styles['container__main-open'] : ''
								}`}
							>
							<ul>
							{pages.map(({ id, pageName, path }) => {
							return (
							<li
								key={id}
								className={`${
									router.pathname === path
										? styles['container__main-links-active']
										: ''
								}`}
							>
								<Link href={path}>
									<a onClick={() => setNavState(false)}>{pageName}</a>
								</Link>
							</li>
						)
							})}
						</ul>
				</div>
		</>
	)
}

export default Navbar