import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header';
import { ThemeProvider } from "next-themes";
import { darkTheme } from 'stitches.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      value={{
        light: "light",
        dark: darkTheme.className
    }}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
