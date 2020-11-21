import Hero from '../components/Hero'
import SEO from '../components/SEO'

const Home: React.FC = () => {
  return (
    <>
      <SEO />
      <Hero />
    </>
  )
}

export default Home

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
