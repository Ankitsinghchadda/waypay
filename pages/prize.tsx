import type { NextPage } from 'next'
import Layout from '../components/Layout'
import styles from '../styles/pages/Prize.module.scss'
import Image from 'next/image'

const prize: NextPage = () => {
	return (
		<Layout>
			<div className={styles.container}>
				<Image
					src={'/prize.png'}
					layout={'fill'}
					alt={'Prize Banner'}
					objectFit={'cover'}
				/>
			</div>
		</Layout>
	)
}

export default prize
