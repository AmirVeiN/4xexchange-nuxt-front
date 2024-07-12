'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';
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
import quests from "../public/shiba9.png"
import Link from "next/link";
import { MiniChart, SymbolOverview, Screener, Timeline, CryptocurrencyMarket } from "react-tradingview-embed";
import background from "../public/back.png"
import landing from "../public/landing.jpg"
import racket from "../public/rocket.png"
import track from "../public/nubmers.png"
import shiba1 from "../public/shiba1.jpg"
import shiba2 from "../public/shiba2.jpg"
import footer1 from "../public/footer1.png"
import footer2 from "../public/footer2.png"
import { useParallax } from "react-scroll-parallax";
import mini1 from "../public/mini1.png"
import mini2 from "../public/coin.png"
import { ParallaxProvider } from 'react-scroll-parallax'
import LoadingPage from "../components/loading";

function Home() {

  const parallax = useParallax({
    easing: "easeInQuad",
    translateX: [0, 120],

  });
  const parallax2 = useParallax({
    easing: "easeInQuad",
    translateX: [0, -120],
  });

  return (
    <div className="bg-back dark:bg-background space-y-10 w-full h-full justify-center items-center flex flex-col">
      <div className="relative flex justify-end items-end w-full">
        <Image src={landing} alt="" />
        <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-back h-1/3">
        </div>
      </div>
      <div className="flex flex-col max-w-[1600px] w-full justify-start items-start space-y-2 pl-4 sm:pl-12">
        <p className="font-bold text-black/80 3xl:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-3xl">Services</p>
        <p className="text-yellow font-bold 3xl:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-2xl">Innovate with 4xExChange</p>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div className="gap-2 w-full max-w-[1600px] grid 3xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 place-items-center place-content-center lg:p-0 p-5">
          <div className="flex flex-col sm:flex-row h-full sm:h-64 p-4 w-full lg:w-[420px] bg-transparent rounded-3xl shadow-2xl space-x-5 justify-center items-center z-20">
            <Image src={imgone} alt="" width={180} />
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue text-center sm:text-left w-full dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">AI assistance</p>
              <p className="text-gray text-xl md:text-lg text-center sm:text-left">with development in ai projects in the world like chatgpt why not use ai in our trading platforms ?</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row h-full sm:h-64 p-4 w-full lg:w-[420px] bg-transparent rounded-3xl shadow-2xl space-x-5 justify-center items-center z-20">
            <Image src={imgtwo} alt="" width={150} />
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue text-center sm:text-left w-full dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Connected to defi</p>
              <p className="text-gray text-xl md:text-lg text-center sm:text-left">with the development of decentralized finance in the world, we are using the defi to provide the best financial services</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row h-full sm:h-64 p-4 w-full lg:w-[420px] bg-transparent rounded-3xl shadow-2xl space-x-5 justify-center items-center z-20">
            <Image src={imgthree} alt="" width={150} />
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue text-center sm:text-left w-full dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Easy to start</p>
              <p className="text-gray text-xl md:text-lg text-center sm:text-left">if you want to start trading instead of using these big complex techniques, it`s just one click to start</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row h-full sm:h-64 p-4 w-full lg:w-[420px] bg-transparent rounded-3xl shadow-2xl space-x-5 justify-center items-center z-20">
            <Image src={imgfour} alt="" width={180} />
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue text-center sm:text-left w-full dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">High volume</p>
              <p className="text-gray text-xl md:text-lg text-center sm:text-left">with the high trading volume, you can easily deposit and withdraw your money and receive it less than 24 hours</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row h-full sm:h-64 p-4 w-full lg:w-[420px] bg-transparent rounded-3xl shadow-2xl space-x-5 justify-center items-center z-20">
            <Image src={imgfive} alt="" width={120} />
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue text-center sm:text-left w-full dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Big marketing team</p>
              <p className="text-gray text-xl md:text-lg text-center sm:text-left">our big green flag is that we are using the biggest agencies in the crypto space to get bigger day by day follow us on social media</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row h-full sm:h-64 p-4 w-full lg:w-[420px] bg-transparent rounded-3xl shadow-2xl space-x-5 justify-center items-center z-20">
            <Image src={imgsix} alt="" width={120} />
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue text-center sm:text-left w-full dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Safety</p>
              <p className="text-gray text-xl md:text-lg text-center sm:text-left">we provide the best and safest place to hold your money and easily liquidate it whenever you want</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-[1600px] justify-between items-center p-4 sm:p-12">
        <div className="flex flex-col w-full md:w-[55%]">
          <div className="flex flex-col w-full justify-start items-start space-y-2">
            <p className="font-bold text-black/80 3xl:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-3xl">Services</p>
            <p className="text-yellow font-bold 3xl:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-2xl">Innovate with 4xExChange</p>
          </div>
          <Image src={racket} alt="" width={550} className="animate-shake animate-infinite animate-duration-[5s] animate-ease-[cubic-bezier(1,1,0,0)]" />
        </div>
        <div className="flex flex-row w-full md:w-[45%]">
          <Image src={track} alt="" width={130} />
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Safety</p>
              <p className="text-gray text-xl md:text-lg">we provide the best and safest place to hold your money and easily liquidate it whenever you want</p>
            </div>
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Safety</p>
              <p className="text-gray text-xl md:text-lg">we provide the best and safest place to hold your money and easily liquidate it whenever you want</p>
            </div>
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Safety</p>
              <p className="text-gray text-xl md:text-lg">we provide the best and safest place to hold your money and easily liquidate it whenever you want</p>
            </div>
            <div className="flex flex-col items-start space-y-3">
              <p className="text-mainBlue dark:text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-2xl ph:text-2xl">Safety</p>
              <p className="text-gray text-xl md:text-lg">we provide the best and safest place to hold your money and easily liquidate it whenever you want</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-col h-[833px] justify-between items-center flex bg-back2 bg-auto">
        <div className="w-full bg-gradient-to-t from-transparent to-back h-1/4">
        </div>
        <div className='flex flex-row justify-between lg:justify-around w-full lg:w-[70%] items-center'>
          <div className='flex  z-10' ref={parallax.ref}>
            <Image src={mini1} alt="" width={200} loading='lazy' className="hidden md:flex" />
            <Image src={mini1} alt="" width={100} loading='lazy' className="flex md:hidden" />
          </div>
          <div className='flex ' ref={parallax2.ref}>
            <Image src={mini2} alt="" width={180} loading='lazy' className="hidden md:flex" />
            <Image src={mini2} alt="" width={100} loading='lazy' className="flex md:hidden" />

          </div>
        </div>
        <div className="w-full bg-gradient-to-b from-transparent to-back h-1/6">
        </div>
      </div>
      <div className="flex flex-col max-w-[1600px] w-full justify-start items-start space-y-2 pl-4 md:pl-12">
        <p className="font-bold text-black/80 3xl:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-3xl">Services</p>
        <p className="text-yellow font-bold 3xl:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-2xl">Innovate with 4xExChange</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-5 justify-center items-center lg:items-stretch lg:justify-between max-w-[1600px] w-full p-12">
        <div className="rounded-3xl bg-shiba1 w-[330px] sm:w-[390px] h-[620px] bg-cover bg-center">
          <div className="flex flex-col space-y-4 justify-end items-center p-5 bg-gradient-to-b rounded-3xl from-transparent to-black h-full">
            <p className="font-bold text-3xl text-white">Trading with 4x</p>
            <p className="font-bold text-center text-lg w-64 text-white">Expand your creativity and
              turn your artwork into NFTs.</p>
            <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
          </div>
        </div>
        <div className="rounded-3xl bg-shiba2 w-[330px] sm:w-[390px] h-[620px] bg-cover bg-center">
          <div className="flex flex-col space-y-4 justify-end items-center p-5 bg-gradient-to-b rounded-3xl from-transparent to-black h-full">
            <p className="font-bold text-3xl text-white">Trading with 4x</p>
            <p className="font-bold text-center text-lg w-64 text-white">Expand your creativity and
              turn your artwork into NFTs.</p>
            <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
          </div>
        </div>
        <div className="rounded-3xl bg-shiba3 w-[330px] sm:w-[390px] h-[620px] bg-cover bg-center">
          <div className="flex flex-col space-y-4 justify-end items-center p-5 bg-gradient-to-b rounded-3xl from-transparent to-black h-full">
            <p className="font-bold text-3xl text-white">Trading with 4x</p>
            <p className="font-bold text-center text-lg w-64 text-white">Expand your creativity and
              turn your artwork into NFTs.</p>
            <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[1600px] w-full justify-start items-start space-y-2 pl-4 sm:pl-12">
        <p className="font-bold text-black/80 3xl:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-3xl">Services</p>
        <p className="text-yellow font-bold 3xl:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-3xl">Innovate with 4xExChange</p>
      </div>
      <div className="flex flex-col lg:justify-normal justify-center lg:items-stretch items-center max-w-[1500px] w-full space-y-10">
        <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-5 justify-between items-center">
          <div className="hidden md:flex flex-row rounded-3xl lg:w-[990px] w-[90%] h-[470px] ">
            <div className="flex w-[50%] flex-col justify-evenly items-start p-8 rounded-l-3xl bg-gradient-to-l from-black to-black h-full">
              <p className="font-bold text-3xl text-white">Trading with 4x</p>
              <p className="font-bold text-left text-lg text-gray">The Baby Doge Army is one of the most active communities in crypto. Our global community of doge lovers support our mission of crypto and animal adoption. Over 2.5 million followers across all social networks. Baby Doge spreads a positive message.</p>
              <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
            </div>
            <div className="bg-shiba4 bg-center bg-cover w-[50%] h-full rounded-r-3xl">
              <div className="bg-gradient-to-l from-transparent to-black h-full">
              </div>
            </div>
          </div>
          <div className="flex md:hidden flex-col rounded-3xl w-[330px] sm:w-[390px] h-[870px] ">
            <div className="bg-shiba4 bg-center bg-cover w-full h-full rounded-t-3xl">
              <div className="bg-gradient-to-b from-transparent to-black h-full">
              </div>
            </div>
            <div className="flex w-full flex-col justify-evenly items-start p-8 rounded-b-3xl bg-gradient-to-l from-black to-black h-full">
              <p className="font-bold text-3xl text-white">Trading with 4x</p>
              <p className="font-bold text-left text-lg text-gray">The Baby Doge Army is one of the most active communities in crypto. Our global community of doge lovers support our mission of crypto and animal adoption. Over 2.5 million followers across all social networks. Baby Doge spreads a positive message.</p>
              <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
            </div>
          </div>
          <div className="rounded-3xl bg-shiba8 w-[330px] sm:w-[390px] h-[470px] bg-cover bg-center">
            <div className="flex flex-col space-y-4 justify-end items-center p-5 bg-gradient-to-b rounded-3xl from-transparent to-black h-full">
              <p className="font-bold text-3xl text-white">Trading with 4x</p>
              <p className="font-bold text-center text-lg w-64 text-white">Expand your creativity and
                turn your artwork into NFTs.</p>
              <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-5 justify-between">
          <div className="rounded-3xl bg-shiba5 w-[330px] sm:w-[390px] h-[620px] bg-cover bg-center">
            <div className="flex flex-col space-y-4 justify-end items-center p-5 bg-gradient-to-b rounded-3xl from-transparent to-black h-full">
              <p className="font-bold text-3xl text-white">Trading with 4x</p>
              <p className="font-bold text-center text-lg w-64 text-white">Expand your creativity and
                turn your artwork into NFTs.</p>
              <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
            </div>
          </div>
          <div className="rounded-3xl bg-shiba6 w-[330px] sm:w-[390px] h-[620px] bg-cover bg-center">
            <div className="flex flex-col space-y-4 justify-end items-center p-5 bg-gradient-to-b rounded-3xl from-transparent to-black h-full">
              <p className="font-bold text-3xl text-white">Trading with 4x</p>
              <p className="font-bold text-center text-lg w-64 text-white">Expand your creativity and
                turn your artwork into NFTs.</p>
              <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
            </div>
          </div>
          <div className="rounded-3xl bg-shiba7 w-[330px] sm:w-[390px] h-[620px] bg-cover bg-center">
            <div className="flex flex-col space-y-4 justify-end items-center p-5 bg-gradient-to-b rounded-3xl from-transparent to-black h-full">
              <p className="font-bold text-3xl text-white">Trading with 4x</p>
              <p className="font-bold text-center text-lg w-64 text-white">Expand your creativity and
                turn your artwork into NFTs.</p>
              <button className="px-8 py-3 w-fit rounded-2xl bg-mainBlue font-black text-white text-2xl">Trade Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center w-full space-y-10 items-center p-5'>
        <div className="flex z-20 flex-col justify-center items-center space-y-2 ">
          <p className="font-bold text-yellow dark:text-yellowBorder text-4xl">F&Q</p>
          <p className="text-background dark:text-white font-bold 3xl:text-6xl 2xl:text-6xl xl:text-4xl lg:text-3xl md:text-4xl sm:text-4xl ph:text-3xl">Frequently asked question</p>
        </div>
        <div className='flex z-20 3xl:flex-row 2xl:flex-row  xl:flex-row  md:flex-row sm:flex-col ph:flex-col justify-center items-center w-full'>
          <div className='w-fit p-5'>
            <Image src={quests} alt="" width={450} />
          </div>
          <div className="flex flex-col justify-center 3xl:w-1/2 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full ph:w-full">
            <div className="grid gap-y-3">
              <details className="w-full rounded-lg ring-2 ring-lightBlue ">
                <summary className="px-4 py-6 text-lightBlue font-bold text-xl md:text-2xl">
                  WHAT IS 4XEXCHANGE?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-black font-bold text-xl">
                  In a simple word, it is an exchange where you can buy-sell-deposit-withdraw your money
                </p>
              </details>
              <details className="w-full rounded-lg ring-2 ring-lightBlue ">
                <summary className="px-4 py-6 font-bold text-lightBlue text-xl md:text-2xl">
                  I DO HAVE 4XTOKEN, WHERE CAN I SELL IT?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-black font-bold text-xl">
                  Simply click on support and talk with our team and ask them how you get your money
                </p>
              </details>
              <details className="w-full rounded-lg ring-2 ring-lightBlue ">
                <summary className="px-4 py-6 font-bold text-lightBlue text-xl md:text-2xl">
                  WHAT IS THE 4XEXCHANGE GOAL?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-black font-bold text-xl">
                  to make trading easy and profitable for everyone
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-10 justify-center items-center relative w-full mt-56 h-[640px] bg-auto bg-footer">
        <div className="flex flex-col md:flex-row w-full justify-evenly items-center bg-gradient-to-t from-transparent to-back h-full">
          <div className="animate-shake animate-infinite animate-ease-linear animate-duration-[5s]">
            <Image src={footer2} alt="" width={180} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-3xl font-bold">4xExChange</p>
            <p className="text-center text-mainBlue">4xExChange Is The Main Project Behind 4xToken</p>
            <p className="text-background text-center text-xs">©Copyright 4xExChange 2024 All Rights Reserved.</p>
            <p className="text-background text-center text-xs">By accessing our services, you accept our Terms of Service and Privacy Policy.</p>
          </div>
          <div className="animate-shake animate-infinite animate-ease-linear animate-duration-[5s]">
            <Image src={footer1} alt="" width={250} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ParallaxProvider>
      <Home {...pageProps} />
    </ParallaxProvider>
  );
}