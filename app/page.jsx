'use client'

import Image from "next/image";
import React, { useEffect } from 'react';
import secondImg from "../public/2.png"
import mainImg from "../public/mainimage.png"
import light2 from "../public/Rectangle 8.png"
import light3 from "../public/Rectangle 9.png"
import imgone from "../public/step4.png"
import imgtwo from "../public/3.png"
import imgthree from "../public/4.png"
import imgfour from "../public/step1.png"
import imgfive from "../public/step2.png"
import imgsix from "../public/step3.png"
import quests from "../public/question.png"
import Link from "next/link";
import { MiniChart, SymbolOverview, Screener, Timeline, CryptocurrencyMarket } from "react-tradingview-embed";
import background from "../public/back.png"

export default function Home() {

  return (
    <div className="bg-back dark:bg-background space-y-10 w-full h-full">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
        <div className="absolute right-0 z-10 opacity-40 hidden md:block">
          <Image src={light3} alt="" />
        </div>
        <div className="absolute left-0 z-10 opacity-40 hidden md:block">
          <Image src={light2} alt="" />
        </div>
        <div className="flex flex-col z-20 w-full lg:w-1/2 justify-center lg:justify-start items-center px-5 lg:pl-10 space-y-10">
          <p className="text-background dark:text-white w-full text-center lg:text-start font-bold 3xl:text-6xl 2xl:text-6xl xl:text-6xl lg:text-5xl md:text-5xl sm:text-5xl ph:text-3xl">4xExChange Is The Main Project Behind 4xToken</p>
          <p className="text-gray dark:text-silver w-full text-center lg:text-start font-medium 3xl:text-3xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-2xl sm:text-2xl ph:text-lg">You Can Buy-Sell-Deposit-Withdraw Coins And Tokens To This Website And Start Trading</p>
          <div className="flex flex-row justify-center space-x-5 items-center w-full lg:justify-start">
            <Link href='/trading' className="bg-yellow dark:bg-yellowBorder font-bold text-xl lg:text-2xl text-background rounded-3xl px-4 py-2">Get Started</Link>
            <Link href='/trading' className="bg-background border-2 text-xl lg:text-2xl border-yellow dark:border-yellowBorder font-semiboldbold text-yellow dark:text-yellowBorder rounded-3xl px-4 py-2">Learn More</Link>
          </div>
        </div>
        <div className="w-full z-20 lg:w-1/2">
          <Image src={mainImg} alt="" width={1500} priority={true} />
        </div>
      </div>
      <div className="flex w-full justify-center h-full items-center ">
        <div className="h-full gap-5 grid 3xl:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 sm:gap-y-10 ph:gap-y-10 gap-y-0 ph:grid-cols-1 place-items-center w-full px-5">
          <div className="w-full h-[300px] shadow-lg shadow-yellowBorder">
            <MiniChart key={1} widgetProps={{
              symbol: "BINANCE:BTCUSDT", width: "100%", height: 300, locale: "en", dateRange: "3M",
              colorTheme: "dark",
              trendLineColor: "#FCD535",
              isTransparent: false,
              autosize: true,
              largeChartUrl: "https://4xexchange.com/trading",
            }} />
          </div>
          <div className="w-full h-[300px] shadow-lg shadow-yellowBorder">
            <MiniChart key={2} widgetProps={{
              symbol: "BINANCE:ETHUSDT", width: "100%", height: 300, locale: "en", dateRange: "3M",
              colorTheme: "dark",
              trendLineColor: "#FCD535",
              isTransparent: false,
              autosize: true,
              largeChartUrl: "https://4xexchange.com/trading",
            }} />
          </div>
          <div className="w-full h-[300px] shadow-lg shadow-yellowBorder">
            <MiniChart key={3} widgetProps={{
              symbol: "BINANCE:SOLUSDT", width: "100%", height: 300, locale: "en", dateRange: "3M",
              colorTheme: "dark",
              trendLineColor: "#FCD535",
              isTransparent: false,
              autosize: true,
              largeChartUrl: "https://4xexchange.com/trading",
            }} />
          </div>
          <div className="w-full h-[300px] shadow-lg shadow-yellowBorder">
            <MiniChart key={4} widgetProps={{
              symbol: "BINANCE:ADAUSDT", width: "100%", height: 300, locale: "en", dateRange: "3M",
              colorTheme: "dark",
              trendLineColor: "#FCD535",
              isTransparent: false,
              autosize: true,
              largeChartUrl: "https://4xexchange.com/trading",
            }} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row pt-10 justify-center items-center">
        <div className="w-full lg:w-fit">
          <Image src={secondImg} alt="" width={500} />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 justify-center lg:justify-start items-center px-5 lg:pl-20 space-y-10">
          <p className="text-background dark:text-white w-full text-center lg:text-start font-bold 3xl:text-6xl 2xl:text-6xl xl:text-6xl lg:text-5xl md:text-5xl sm:text-5xl ph:text-3xl">One of the world`s largest exchanges</p>
          <p className="text-gray dark:text-silver w-full text-center lg:text-start font-medium 3xl:text-3xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-2xl sm:text-2xl ph:text-lg">With a high volume of trading on a daily basis, you can easily deposit your money and start trading,click to start</p>
          <div className="flex flex-row justify-center space-x-5 items-center w-full lg:justify-start">
            <Link href='/trading' className="bg-yellow dark:bg-yellowBorder font-bold text-xl lg:text-2xl text-background rounded-3xl px-4 py-2">Get Started</Link>
            <Link href='/trading' className="bg-background border text-xl lg:text-2xl border-yellow dark:border-yellowBorder font-semiboldbold text-yellow dark:text-yellowBorder rounded-3xl px-4 py-2">Learn More</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 ">
        <p className="font-bold text-yellow dark:text-yellowBorder text-4xl">Services</p>
        <p className="text-background dark:text-white font-bold 3xl:text-6xl 2xl:text-6xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-3xl">Innovate with 4xExChange</p>
      </div>
      <div className="gap-2 grid grid-cols-1 md:grid-cols-3 place-items-center place-content-center p-5 relative">
        <div className="absolute right-0 z-10 opacity-40 hidden md:block">
          <Image src={light3} alt="" />
        </div>
        <div className="absolute left-0 z-10 opacity-40 hidden md:block">
          <Image src={light2} alt="" />
        </div>
        <div className="flex w-full lg:w-80 flex-col space-y-2 justify-center items-center z-20">
          <div><Image src={imgone} alt="" width={380} /></div>
          <p className="text-yellow dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">AI assistance</p>
          <p className="text-gray text-center text-xl md:text-lg">with development in ai projects in the world like chatgpt why not use ai in our trading platforms ?</p>
        </div>
        <div className="flex w-full lg:w-80 flex-col space-y-2 justify-center items-center z-20">
          <div><Image src={imgtwo} alt="" width={250} /></div>
          <p className="text-yellow dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Connected to defi</p>
          <p className="text-gray text-center text-xl md:text-lg">with the development of decentralized finance in the world, we are using the defi to provide the best financial services</p>
        </div>
        <div className="flex w-full lg:w-80 flex-col space-y-2 justify-center items-center z-20">
          <div><Image src={imgthree} alt="" width={250} /></div>
          <p className="text-yellow dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Easy to start</p>
          <p className="text-gray text-center text-xl md:text-lg">if you want to start trading instead of using these big complex techniques, it`s just one click to start</p>
        </div>
        <div className="flex w-full lg:w-80 flex-col space-y-2 justify-center items-center z-20">
          <div><Image src={imgfour} alt="" width={400} /></div>
          <p className="text-yellow dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">High volume</p>
          <p className="text-gray text-center text-xl md:text-lg">with the high trading volume, you can easily deposit and withdraw your money and receive it less than 24 hours</p>
        </div>
        <div className="flex w-full lg:w-80 flex-col space-y-2 justify-center items-center z-20">
          <div><Image src={imgfive} alt="" width={230} /></div>
          <p className="text-yellow dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Big marketing team</p>
          <p className="text-gray text-center text-xl md:text-lg">our big green flag is that we are using the biggest agencies in the crypto space to get bigger day by day follow us on social media</p>
        </div>
        <div className="flex w-full lg:w-80 flex-col space-y-2 justify-center items-center z-20">
          <div><Image src={imgsix} alt="" width={250} /></div>
          <p className="text-yellow dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Safety</p>
          <p className="text-gray text-center text-xl md:text-lg">we provide the best and safest place to hold your money and easily liquidate it whenever you want</p>
        </div>
      </div>
      <div className="w-full h-96 flex p-5 justify-center items-center">
        <div className="w-[80%] h-full md:w-full sm:w-full ph:w-full shadow-xl shadow-yellow dark:shadow-yellowBorder">
          <SymbolOverview key={5} widgetProps={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <div className="w-full h-[640px] flex p-5 justify-center items-center">
        <div className="w-[80%] h-full md:w-full sm:w-full ph:w-full shadow-xl shadow-yellow dark:shadow-yellowBorder">
          <Screener key={6} widgetProps={{ width: "100%", height: 600 }} />
        </div>
      </div>
      <div className="w-full h-[640px] flex p-5 justify-center items-center">
        <div className="w-[80%] h-full md:w-full sm:w-full ph:w-full shadow-xl shadow-yellow dark:shadow-yellowBorder">
          <CryptocurrencyMarket key={7} widgetProps={{ width: "100%", height: 600 }} />
        </div>
      </div>
      <div className="w-full h-[640px] flex p-5 justify-center items-center">
        <div className="w-[80%] h-full md:w-full sm:w-full ph:w-full shadow-xl shadow-yellow dark:shadow-yellowBorder">
          <Timeline key={8} widgetProps={{ width: "100%", height: 600 }} />
        </div>
      </div>
      <div className='flex flex-col justify-center w-full space-y-10 items-center p-5'>
      <div className="absolute right-0 z-10 opacity-40 hidden md:block">
          <Image src={light3} alt="" />
        </div>
        <div className="absolute left-0 z-10 opacity-40 hidden md:block">
          <Image src={light2} alt="" />
        </div>
        <div className="flex z-20 flex-col justify-center items-center space-y-2 ">
          <p className="font-bold text-yellow dark:text-yellowBorder text-4xl">F&Q</p>
          <p className="text-background dark:text-white font-bold 3xl:text-6xl 2xl:text-6xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-3xl">frequently asked question</p>
        </div>
        <div className='flex z-20 3xl:flex-row 2xl:flex-row  xl:flex-row  md:flex-row sm:flex-col ph:flex-col justify-center items-center w-full'>
          <div className='w-fit p-5'>
            <Image src={quests} alt="" width={450} className="hidden md:flex" />
            <Image src={quests} alt="" width={200} className="flex md:hidden" />
          </div>
          <div className=" flex flex-col justify-center space-y-6 3xl:w-1/2 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full ph:w-full">
            <div className="space-y-4 ">
              <details className="w-full rounded-lg ring-2 ring-background dark:ring-white">
                <summary className="px-4 py-6 text-yellow dark:text-yellowBorder text-2xl ">
                  what is 4xExChange?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-background dark:text-white text-2xl">
                  in a simple word, it is an exchange where you can buy/sell/deposit/withdraw your money
                </p>
              </details>
              <details className="w-full rounded-lg ring-2 ring-background dark:ring-white">
                <summary className="px-4 py-6 text-yellow dark:text-yellowBorder text-2xl">
                  i do have 4xtoken. Where can I sell it?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-background dark:text-white text-2xl">
                  Simply click on support and talk with our team and ask them how you get your money
                </p>
              </details>
              <details className="w-full rounded-lg ring-2 ring-background dark:ring-white">
                <summary className="px-4 py-6 text-yellow dark:text-yellowBorder text-2xl">
                  what is the 4xExChange goal?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-background dark:text-white text-2xl">
                  to make trading easy and profitable for everyone
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-10 justify-center items-center relative w-full mt-56 bg-yellow dark:bg-yellowBorder">
        <div className="text-center font-bold text-background z-20">
          <p>© Copyright 4xExChange 2024 All Rights Reserved.</p>
          <p>By accessing our services, you accept our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>

  );
}
