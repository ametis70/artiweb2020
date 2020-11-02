import SEO from '../components/SEO'
import Hero from '../components/Hero'
import dynamic from 'next/dynamic'

const Home: React.FC = () => {
  return (
    <>
      <SEO />
      <Hero />
    </>
  )
}

export default Home

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
