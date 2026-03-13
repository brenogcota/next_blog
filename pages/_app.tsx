import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header';
import { ThemeProvider } from "next-themes";
import { darkTheme } from 'stitches.config';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { LocaleProvider } from 'context/locale';
import Footer from 'components/Footer';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isResumePage = router.pathname === '/resume';
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        value={{
          light: "light",
          dark: darkTheme.className
      }}>
        <LocaleProvider>
          {!isResumePage && <Header />}
          <Component {...pageProps} />
          {!isResumePage && <Footer />}
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}export default MyApp
