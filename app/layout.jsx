import { Inter, Sofia_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { Providers } from "./GlobalRedux/provider";
import CheckAuth from "./checkAuth";
import { Suspense } from "react";
import LoadingPage from "../components/loading"
import TickerFunc from "../components/ticker"
import { Toaster } from 'sonner';
import Head from 'next/head';
import { Chivo } from "next/font/google"

const inter = Inter({ subsets: ["latin"] });
const lilia = Chivo({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-lilia",
})

export const metadata = {
  title: "4xExChange",
  // description: "4xExChange Finance offers a comprehensive suite of financial services.",
  // url: "https://4xexchange.com",
  // image: "https://4xexchange.com/logogoogle.png",
  // keywords: ["4xexchange", "4xExChange", "finance", "trading", "lending", "staking", "exchange", "4x", "4x exchange", "4x token", "4xtoken", "token"],
  // author: "4xExchange Team",
  // language: "en",
  // og: {
  //   title: "4xExChange | Finance",
  //   description: "4xExChange Finance offers a comprehensive suite of financial services.",
  //   image: "https://4xexchange.com/logogoogle.png",
  //   url: "https://4xexchange.com",
  //   type: "website",
  //   site_name: "4xExChange",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@4xexchange",
  //   title: "4xExChange | Finance",
  //   description: "4xExChange Finance offers a comprehensive suite of financial services.",
  //   image: "https://4xexchange.com/logogoogle.png",
  // },
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        {/* <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1A1A1A" />
        <meta name="author" content={metadata.author} />
        <meta name="language" content={metadata.language} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta property="og:title" content={metadata.og.title} />
        <meta property="og:description" content={metadata.og.description} />
        <meta property="og:image" content={metadata.og.image} />
        <meta property="og:url" content={metadata.og.url} />
        <meta property="og:type" content={metadata.og.type} />
        <meta property="og:site_name" content={metadata.og.site_name} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="canonical" href={metadata.url} /> */}
      </Head>
      <body className={lilia.className}>
        <Toaster richColors />
        <Providers>
          <CheckAuth />
          {/* <TickerFunc /> */}
          <Header />
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
