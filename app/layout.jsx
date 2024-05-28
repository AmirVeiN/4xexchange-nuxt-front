import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { Providers } from "./GlobalRedux/provider";
import CheckAuth from "./checkAuth";
import { Suspense } from "react";
import LoadingPage from "../components/loading"
import TickerFunc from "../components/ticker"
import { Toaster } from 'sonner';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "4xExChange",
  description: "4xExChange Finance offers a comprehensive suite of financial services.",
  url: "https://4xexchange.com", // Full URL of the webpage
  image: "https://4xexchange.com/logogoogle.png", // Image representing the webpage content
  keywords: ["4xexchange", "4xExChange", "finance", "trading", "lending", "staking", "exchange", "4x", "4x exchange", "4x token", "4xtoken", "token"], // Relevant keywords for search engines
  // Social Media Metadata (Optional)
  // og: {
  //   title: "4xexchange | Finance",
  //   description: "4xExChange Finance offers a comprehensive suite of financial services.",
  //   image: "https://4xexchange.com/logo.png",
  //   url: "https://4xexchange.com",
  //   type: "website",
  //   site_name: "4xexchange",
  // },
  // twitter: {
  //   title: "4xexchange | Finance",
  //   description: "4xExChange Finance offers a comprehensive suite of financial services.",
  //   image: "https://4xexchange.com/logo.png",
  //   url: "https://4xexchange.com",
  //   card: "summary",
  // },
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <meta name="description" content="4xExChange Finance offers a comprehensive suite of financial services." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1A1A1A" />
        <meta name="author" content="4xExchange Team" />
        <meta name="language" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@4xexchange" /> <meta name="twitter:title" content="4xExChange | Finance" />
        <meta name="twitter:description" content="4xExChange Finance offers a comprehensive suite of financial services." />
        <meta name="twitter:image" content="https://4xexchange.com/logogoogle.png" />
      </Head>
      <body className={inter.className}>
        <Toaster richColors />
        <Providers>
          <CheckAuth />
          <TickerFunc />
          <Header />
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
