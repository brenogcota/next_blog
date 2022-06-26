import HeadSEO from 'components/Head'
import Main from 'components/Main'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <HeadSEO />

      <Main />
    </div>
  )
}

export default Home
