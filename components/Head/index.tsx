import Head from "next/head";
import config from "production.json";

const HeadSEO = () => {
  return (
    <Head>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta property="og:url" content={config.url} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content={config.image} />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
      ></link>
    </Head>
  );
};

export default HeadSEO;
