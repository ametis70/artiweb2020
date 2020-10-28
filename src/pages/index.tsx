import Head from 'next/head'
import directus, { login } from '../lib/api'

import Alumnxs from '../components/Alumnxs'
import Festival from '../components/Festival'

const Home: React.FC = ({ data }) => {
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

export async function getServerSideProps() {
  await login()
  const data = await directus.getItems('obras')

  // Pass data to the page via props
  return { props: { data } }
}

export default Home
