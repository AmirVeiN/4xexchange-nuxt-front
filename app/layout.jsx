import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { Providers } from "./GlobalRedux/provider";
import CheckAuth from "./checkAuth";
import { Suspense } from "react";
import LoadingPage from "../components/loading"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "4xExChange",
  description: "4xExChange Finance",
  url: "https://4xexchange.com", // Full URL of the webpage
  image: "https://4xexchange.com/logo.png", // Image representing the webpage content
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
      <body className={inter.className}>
        <Providers>
          <CheckAuth />
          <Header />
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
