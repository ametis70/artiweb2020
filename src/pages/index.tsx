import IndexNav from '../components/IndexNav'
import SEO from '../components/SEO'

const Home: React.FC = () => {
  return (
    <>
      <SEO />
      <IndexNav />
    </>
  )
}

export default Home

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
