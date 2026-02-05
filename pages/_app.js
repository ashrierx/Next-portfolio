import '@styles/globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import Head from 'next/head';

function Application({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ashley Judah - SWE</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default Application
