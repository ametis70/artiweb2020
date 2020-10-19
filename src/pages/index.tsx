import Head from 'next/head'

import Alumnxs from '../components/Alumnxs'
import Festival from '../components/Festival'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Artimañas 2020</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Festival />
      <Alumnxs />
    </>
  )
}

export default Home
