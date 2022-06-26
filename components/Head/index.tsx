import Head from 'next/head'
import config from 'production.json'

const HeadSEO = () => {
  return (
    <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  );
}

export default HeadSEO;