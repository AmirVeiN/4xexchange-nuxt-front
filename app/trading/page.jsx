"use client"

import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from '../../components/loading';
import { ToastContainer, toast } from 'react-toastify';
import { BuyUSDTClient, SellUSDTClient, GetSellAndBuyClient, GetChartDetail, GetSellAndBuyPublic, ChartData } from "../GlobalRedux/Features/userSlice";
import Popup from '../../components/modal';
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";
import Link from 'next/link';
import { GoAlertFill } from "react-icons/go";


export default function ChartComponent() {

    const [showMessage, setShowMessage] = useState(false);
    const [showMessage1, setShowMessage1] = useState(false);
    const [showMessage2, setShowMessage2] = useState(false);
    const [chartTime, setChartTime] = useState("5M")
    const [switchButton, setSwitchButton] = useState(false);

    const ChartTimeHandler = (time) => {
        setChartTime(time)
    }

    const dispach = useDispatch()

    const [BuyUSDT, setBuyUSDT] = useState("");
    const handleBuyUSDT = (e) => setBuyUSDT(e.target.value);

    const [SellUSDT, setSellUSDT] = useState("");
    const handleSellUSDT = (e) => setSellUSDT(e.target.value);

    const data = useSelector((state) => state.user.chartData)
    const price = useSelector((state) => state.user.price)
    const user = useSelector((state) => state.user.user)
    const infoClient = useSelector((state) => state.user.SellAndBuyClient)
    const infoPublic = useSelector((state) => state.user.SellAndBuyPublic)

    const chartContainerRef = useRef();


    useEffect(() => {

        setInterval(() => {
            dispach(ChartData());
            dispach(GetChartDetail());
        }, 30000);

        // return () => clearInterval(intervalId);

    }, [dispach]);


    useEffect(() => {

        if (!data) {
            dispach(ChartData());
            return;
        }

        if (!price) {
            dispach(GetChartDetail());
            return;
        }

        if (!infoPublic) {
            dispach(GetSellAndBuyPublic());
            return;
        }

        if (!infoClient) {

            if (user) {
                dispach(GetSellAndBuyClient({ "id": user.id }));
                return;
            }
        }

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };


        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: "white",
            },

            height: 500,
            timeScale: {
                timeVisible: true,
            },
            localization: {
                timeFormatter: businessDayOrTimestamp => {
                    return Date(businessDayOrTimestamp);
                },
            }
        });


        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({
            priceFormat: {
                type: 'price',
                precision: 9,
                minMove: 0.00000001,
            }, lineColor: '#feb72f', topColor: '#1405FF', bottomColor: 'rgba(41, 98, 255, 0.28)'
        });


        const newData = data.map((e) => {
            return { time: Date.parse(e.time) / 1000, value: e.value }
        })


        function fiveMin() {

            const datas = newData.filter((item, index) => index % 5 === 0)
            const last = data[data.length - 1];
            const last2 = { "time": Date.parse(last['time']) / 1000, "value": last['value'] }
            if (datas[datas.length - 1]['time'] !== last2['time']) {
                datas.push(last2)
            }
            return datas
        }

        function oneHour() {

            const datas = newData.filter((item, index) => index % 60 === 0)
            const last = data[data.length - 1];
            const last2 = { "time": Date.parse(last['time']) / 1000, "value": last['value'] }
            if (datas[datas.length - 1]['time'] !== last2['time']) {
                datas.push(last2)
            }
            return datas
        }

        function oneDay() {

            const datas = newData.filter((item, index) => index % 1440 === 0)
            const last = data[data.length - 1];
            const last2 = { "time": Date.parse(last['time']) / 1000, "value": last['value'] }
            if (datas[datas.length - 1]['time'] !== last2['time']) {
                datas.push(last2)
            }
            return datas
        }

        const fiveMinuteData = (chartTime === "1D" && oneDay()) || (chartTime === "1H" && oneHour()) || (chartTime === "5M" && fiveMin())

        newSeries.setData(fiveMinuteData);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [chartTime, data, price, infoClient, infoPublic,dispach,user]);


    if ((!data && !infoPublic || !price) || (user && !infoClient)) {
        return <LoadingPage />
    }


    if (!infoPublic) {
        dispach(GetSellAndBuyPublic());
        return;
    }

    const handleSubmit = (type) => {

        if (type === "buy") {

            if (BuyUSDT !== "" && price.price.number) {

                setShowMessage(true)

            } else {

                toast.error("Enter the amount of USDT")
            }

        } else if (type === "sell") {

            if (SellUSDT !== "" && price.price.number) {

                setShowMessage1(true)

            } else {

                toast.error("Enter the amount of USDT")
            }
        }
    }

    const Alert = (props) => {

        const [isOpen, setIsOpen] = useState(true);
        const dispatch = useDispatch();

        const okPopuop = () => {

            if (props.type === "buy") {

                dispatch(BuyUSDTClient({ user: props.user, tether: props.tether, tokenRecive: props.tokenRecive, tokenPrice: props.tokenPrice })).then((e) => {

                    setIsOpen(false);
                    setShowMessage(false)

                    if (e.type.includes("fulfilled")) {
                        setShowMessage2(true)
                    } else if (e.type.includes("rejected")) {
                        if (e.error.message.includes("402")) {
                            toast.error("Not enough balance")
                        }
                        else {

                            toast.error("Bad Request - Error 400")
                        }
                    }
                });

            } else if (props.type === "sell") {

                dispatch(SellUSDTClient({ user: props.user, tetherRecive: props.tether, token: props.tokenRecive, tokenPrice: props.tokenPrice })).then((e) => {

                    setIsOpen(false);
                    setShowMessage1(false)

                    if (e.type.includes("fulfilled")) {
                        setShowMessage2(true)
                    } else if (e.type.includes("rejected")) {
                        if (e.error.message.includes("402")) {
                            toast.error("You dont have token Enough")
                        }
                        else {

                            toast.error("Bad Request - Error 400")
                        }
                    }
                });
            }
        }

        const closePopup = () => {

            if (props.type === "buy") {

                setIsOpen(false);
                setShowMessage(false)

            } else if (props.type === "sell") {

                setIsOpen(false);
                setShowMessage1(false)
            }

        };

        return isOpen && props.type === "sell" &&
            <div className=' bg-white w-[350px] p-5 border-2 border-blue rounded-2xl'>
                <div className="flex flex-col space-y-5 justify-center items-center text-center w-full">
                    <IoInformationCircleSharp size={150} color='#435fcb' />
                    <p className='text-2xl font-bold'>Are you Sure?</p>
                    <p className='font-bold w-full'>Token Spent = {props.tokenRecive}</p>
                    <p className='font-bold w-full'>Tether Recive = {props.tether}</p>
                    <div className='flex flex-row justify-around w-full'>
                        <button className='px-8 py-2 rounded-2xl bg-blue font-medium text-white text-xl' onClick={okPopuop}>Ok</button>
                        <button className='px-5 py-2 rounded-2xl bg-gray font-medium text-white text-xl' onClick={closePopup}>Close</button>
                    </div>
                </div>
            </div> || isOpen && props.type === "buy" &&
            <div className=' bg-white w-[350px] p-5 border-2 border-blue rounded-2xl'>
                <div className="flex flex-col space-y-5 justify-center items-center text-center w-full">
                    <IoInformationCircleSharp size={150} color='#435fcb' />
                    <p className='text-2xl font-bold'>Are you Sure?</p>
                    <p className='font-bold w-full'>Tether Spent = {props.tether}</p>
                    <p className='font-bold w-full'>Token Recive = {props.tokenRecive}</p>
                    <div className='flex flex-row justify-around w-full'>
                        <button className='px-8 py-2 rounded-2xl bg-blue font-medium text-white text-xl' onClick={okPopuop}>Ok</button>
                        <button className='px-5 py-2 rounded-2xl bg-gray font-medium text-white text-xl' onClick={closePopup}>Close</button>
                    </div>
                </div>
            </div>
    };

    const Message2 = () => {
        return <Popup type="ok" reload={true} text="Your transaction has been successfully registered" />
    }

    const Message1 = () => {
        return <Alert type="sell" user={user.email} tether={parseFloat(SellUSDT)} tokenRecive={SellUSDT / price.price.number} tokenPrice={price.price.number} />
    }

    const Message = () => {
        return <Alert type="buy" user={user.email} tether={parseFloat(BuyUSDT)} tokenRecive={BuyUSDT / price.price.number} tokenPrice={price.price.number} />
    }

    return (
        <div className='bg-back dark:bg-black flex flex-col space-y-10 w-full h-full pt-5 relative'>
            <div className={(!showMessage && !showMessage2 && !showMessage1) ? 'flex flex-col w-full justify-center items-center space-y-5' : 'blur-md flex flex-col w-full justify-center items-center space-y-5'}>
                <div className='flex flex-row space-x-0 lg:space-x-5 w-full justify-center items-start px-6'>
                    {/* <div className='hidden lg:flex flex-col space-y-2 w-[20%]'>
                        <div className='w-full p-5 bg-softGray dark:bg-tradeBlue font-bold text-xl rounded-lg text-white'>Buyers</div>
                        <div className='w-full h-[510px] flex flex-col bg-softGray dark:bg-tradeBlue font-bold text-lg rounded-lg text-white'>
                            <div className='flex flex-row p-5 justify-between items-center'>
                                <p>USDT</p>
                                <p>4X</p>
                            </div>
                            <div className="overflow-y-auto">
                                {infoPublic.buy.slice().reverse().map((e, index) => {
                                    return (
                                        <div key={index} className="flex flex-row justify-between px-4 py-1 pb-4 mt-1 items-center">
                                            <p className="text-tradeGreen text-sm text-start w-[100px]">{e.tether.toString().substring(0, 15)}</p>
                                            <p className="text-white text-sm text-end w-[100px]">{e.tokenRecive.toString().substring(0, 10)}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div> */}
                    <div className='flex flex-col space-y-2 w-full'>
                        <div className='flex flex-col lg:flex-row space-x-3 items-center lg:space-y-0 space-y-5 bg-softGray dark:bg-tradeBlue py-5 px-4 w-full rounded-lg'>
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-row space-x-2'>
                                    <button onClick={() => ChartTimeHandler("5M")} className={chartTime === "5M" ? `font-bold delay-150 duration-300 ease-in-out text-softGray px-4 py-2 rounded-lg bg-yellowBorder` : `font-bold delay-150 duration-300 ease-in-out text-softGray  px-4 py-2 rounded-lg bg-white`}>
                                        5m
                                    </button>
                                    <button onClick={() => ChartTimeHandler("1H")} className={chartTime === "1H" ? `font-bold delay-150 duration-300 ease-in-out text-softGray px-4 py-2 rounded-lg bg-yellowBorder` : `font-bold delay-150 duration-300 ease-in-out text-softGray  px-4 py-2 rounded-lg bg-white`}>
                                        1h
                                    </button>
                                    <button onClick={() => ChartTimeHandler("1D")} className={chartTime === "1D" ? `font-bold delay-150 duration-300 ease-in-out text-softGray px-4 py-2 rounded-lg bg-yellowBorder` : `font-bold delay-150 duration-300 ease-in-out text-softGray  px-4 py-2 rounded-lg bg-white`}>
                                        1D
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-row justify-around items-center w-full'>
                                <div className='flex flex-row text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-base lg:text-base md:text-2xl sm:text-2xl ph:text-xs space-x-2'>
                                    <p>4X / USDT</p>
                                </div>
                                <div className='flex flex-row text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-base lg:text-base md:text-2xl sm:text-2xl ph:text-xs space-x-2'>
                                    <p>Price : </p>
                                    <p>{data[data.length - 1]['value']}</p>
                                </div>
                                <div className='flex flex-row text-white font-bold 3xl:text-2xl 2xl:text-2xl xl:text-base lg:text-base md:text-2xl sm:text-2xl ph:text-xs space-x-2'>
                                    <p>24H Volume : </p>
                                    <p>${price.volume.number}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full bg-softGray rounded-lg dark:bg-black' ref={chartContainerRef} />
                    </div>
                    {/* <div className='hidden lg:flex flex-col space-y-2 w-[20%]'>
                        <div className='w-full p-5 bg-softGray dark:bg-tradeBlue font-bold text-xl rounded-lg text-white'>Sellers</div>
                        <div className='w-full h-[510px] flex flex-col bg-softGray dark:bg-tradeBlue font-bold text-lg rounded-lg text-white'>
                            <div className='flex flex-row p-5 justify-between items-center'>
                                <p>USDT</p>
                                <p>4X</p>
                            </div>
                            <div className="overflow-y-auto">
                                {infoPublic.sell.slice().reverse().map((e, index) => {
                                    return (
                                        <div key={index} className="flex flex-row justify-between px-4 py-1 pb-4 mt-1 items-center">
                                            <p className="text-tradeRed text-sm text-start w-[100px]">{e.tetherRecive.toString().substring(0, 15)}</p>
                                            <p className="text-white text-sm text-end w-[100px]">{e.token.toString().substring(0, 10)}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className='flex flex-row space-x-0 lg:space-x-5 w-full justify-center items-start px-5'>
                    <div className='hidden lg:flex flex-col space-y-2 w-[20%]'>
                        <div className='w-full p-5 bg-softGray dark:bg-tradeBlue font-bold text-xl rounded-lg text-white'>Your Buys</div>
                        <div className='w-full flex flex-col h-[470px] bg-softGray dark:bg-tradeBlue font-bold text-lg rounded-lg text-white'>
                            <div className='flex flex-row p-5 justify-between items-center'>
                                <p>USDT</p>
                                <p>4X</p>
                            </div>
                            {!infoClient || infoClient.buy.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5 px-5">
                                <FaBoxArchive size={50} color="#7790A6" />
                                <p className="text-xl font-bold text-softBlue">Buyers Box Is Empty</p>
                            </div> : <div className="overflow-y-auto">
                                {infoClient.buy.slice().reverse().map((e, index) => {
                                    return (
                                        <div key={index} className="flex flex-row justify-between px-4 py-1 pb-4 mt-1 items-center">
                                            <p className="text-tradeGreen text-sm text-start w-[100px]">{e.tether.toString().substring(0, 15)}</p>
                                            <p className="text-white text-sm text-end w-[100px]">{e.tokenRecive.toString().substring(0, 10)}</p>
                                        </div>
                                    )
                                })}
                            </div>}
                        </div>
                    </div>
                    <div className='hidden lg:flex h-full rounded-lg bg-softGray dark:bg-tradeBlue flex-col lg:flex-row w-full lg:w-[60%] justify-center items-center'>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit("buy"); }} className='flex flex-col h-full justify-start items-start w-full lg:w-1/2 p-5'>
                            <p className='text-xl font-bold text-white py-3'>Buy Token(4X)</p>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Tether(USDT)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{user ? user.usdt : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Token(4X)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{user ? user.token : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Price(4X)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{price.price.number}</p>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-white font-medium'>
                                    <p>USDT Amount</p>
                                </div>
                                <div className='flex flex-row space-x-2'>
                                    <input
                                        min={2}
                                        required
                                        step="any"
                                        type="number"
                                        value={BuyUSDT}
                                        onChange={handleBuyUSDT}
                                        className="w-full p-2 focus:ring-4 focus:border-none focus:ring-tableBlue text-tableBlue dark:text-white rounded-lg bg-white dark:bg-tableBlue"
                                    />
                                    <button type='button' onClick={() => setBuyUSDT(user.usdt)} className='bg-tradeGreen px-4 rounded-lg font-bold text-black'>
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-white font-medium'>
                                    <p>Your Token Recive</p>
                                </div>
                                <p
                                    className="w-full p-2 focus:ring-4 focus:border-none focus:ring-tableBlue text-tableBlue dark:text-white rounded-lg bg-white dark:bg-tableBlue"
                                >
                                    {BuyUSDT ? BuyUSDT / price.price.number : 0}
                                </p>
                            </div>
                            {user && user.user_type !== 4 && <button type='submit' className='w-full py-4 text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                Buy Token
                            </button>}
                            {!user && <Link href="/Login" className='w-full py-4 text-center text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                Login
                            </Link>}
                            {user && user.user_type === 4 && <Link href="/pannel" className='w-full space-x-2 flex flex-row justify-center items-center py-4 text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                <p>Yor Are Ban</p>
                                <GoAlertFill size={30} />
                            </Link>}
                        </form>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit("sell"); }} className='flex flex-col h-full justify-start items-start w-full lg:w-1/2 p-5'>
                            <p className='text-xl font-bold text-white py-3'>Sell Token(4X)</p>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Tether(USDT)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{user ? user.usdt : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Token(4X)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{user ? user.token : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Price(4X)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{price.price.number}</p>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-white font-medium'>
                                    <p>USDT Amount</p>
                                </div>
                                <div className='flex flex-row space-x-2'>
                                    <input
                                        min={2}
                                        required
                                        step="any"
                                        type="number"
                                        value={SellUSDT}
                                        onChange={handleSellUSDT}
                                        className="w-full p-2 focus:ring-4 focus:border-none focus:ring-tableBlue text-tableBlue dark:text-white rounded-lg bg-white dark:bg-tableBlue"
                                    />
                                    <button type='button' onClick={() => setSellUSDT(user.token * price.price.number)} className='bg-tradeRed px-4 rounded-lg font-bold text-black'>
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-white font-medium'>
                                    <p>Your Token Sell</p>
                                </div>
                                <p
                                    className="w-full p-2 focus:ring-4 focus:border-none focus:ring-tableBlue text-tableBlue dark:text-white rounded-lg bg-white dark:bg-tableBlue"
                                >
                                    {SellUSDT ? SellUSDT / price.price.number : 0}
                                </p>
                            </div>
                            {user && user.user_type !== 4 && <button type='submit' className='w-full py-4 text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                Sell Token
                            </button>}
                            {!user && <Link href="/Login" className='w-full py-4 text-center text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                Login
                            </Link>}
                            {user && user.user_type === 4 && <Link href="/pannel" className='w-full space-x-2 flex flex-row justify-center items-center py-4 text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                <p>Yor Are Ban</p>
                                <GoAlertFill size={30} />
                            </Link>}
                        </form>
                    </div>
                    <div className='mb-24 lg:mb-0 flex lg:hidden h-full rounded-lg bg-softGray dark:bg-tradeBlue flex-col lg:flex-row w-full lg:w-[60%] justify-center items-center'>
                        <div className='flex flex-row space-x-0 justify-end pt-5 pr-5 w-full'>
                            <button onClick={() => setSwitchButton(false)} className={!switchButton ? 'px-6 py-3 text-white text-xl font-bold bg-tradeGreen rounded-l-md' : 'px-6 py-3 text-softGray text-xl font-bold bg-white rounded-l-md'}>Buy</button>
                            <button onClick={() => setSwitchButton(true)} className={switchButton ? 'px-6 py-3 text-white text-xl font-bold bg-tradeRed rounded-r-md' : 'px-6 py-3 text-softGray text-xl font-bold bg-white rounded-r-md'}>Sell</button>
                        </div>
                        {!switchButton ? <form onSubmit={(e) => { e.preventDefault(); handleSubmit("buy"); }} className='flex flex-col h-full justify-start items-start w-full lg:w-1/2 p-5'>
                            <p className='text-xl font-bold text-white py-3'>Buy Token(4X)</p>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Tether(USDT)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{user ? user.usdt : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Token(4X)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{user ? user.token : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Price(4X)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{price.price.number}</p>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-white font-medium'>
                                    <p>USDT Amount</p>
                                </div>
                                <div className='flex flex-row space-x-2'>
                                    <input
                                        min={2}
                                        required
                                        step="any"
                                        type="number"
                                        value={BuyUSDT}
                                        onChange={handleBuyUSDT}
                                        className="w-full p-2 focus:ring-4 focus:border-none focus:ring-tableBlue text-tableBlue dark:text-white rounded-lg bg-white dark:bg-tableBlue"
                                    />
                                    <button type='button' onClick={() => setBuyUSDT(user.usdt)} className='bg-tradeGreen px-4 rounded-lg font-bold text-white dark:text-black'>
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-white font-medium'>
                                    <p>Your Token Recive</p>
                                </div>
                                <p
                                    className="w-full p-2 focus:ring-4 focus:border-none focus:ring-tableBlue text-tableBlue dark:text-white rounded-lg bg-white dark:bg-tableBlue"
                                >
                                    {BuyUSDT ? BuyUSDT / price.price.number : 0}
                                </p>
                            </div>
                            {user && user.user_type !== 4 && <button type='submit' className='w-full py-4 text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                Buy Token
                            </button>}
                            {!user && <Link href="/Login" className='w-full py-4 text-center text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                Login
                            </Link>}
                            {user && user.user_type === 4 && <Link href="/pannel" className='w-full space-x-2 flex flex-row justify-center items-center py-4 text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                <p>Yor Are Ban</p>
                                <GoAlertFill size={30} />
                            </Link>}
                        </form> : <form onSubmit={(e) => { e.preventDefault(); handleSubmit("sell"); }} className='flex flex-col h-full justify-start items-start w-full lg:w-1/2 p-5'>
                            <p className='text-xl font-bold text-white py-3'>Sell Token(4X)</p>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Tether(USDT)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{user ? user.usdt : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Token(4X)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{user ? user.token : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[40%] p-2">Price(4X)</p>
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-white dark:bg-tableBlue w-[60%] p-2">{price.price.number}</p>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-white font-medium'>
                                    <p>USDT Amount</p>
                                </div>
                                <div className='flex flex-row space-x-2'>
                                    <input
                                        min={2}
                                        required
                                        step="any"
                                        type="number"
                                        value={SellUSDT}
                                        onChange={handleSellUSDT}
                                        className="w-full p-2 focus:ring-4 focus:border-none focus:ring-tableBlue text-tableBlue dark:text-white rounded-lg bg-white dark:bg-tableBlue"
                                    />
                                    <button type='button' onClick={() => setSellUSDT(user.token * price.price.number)} className='bg-tradeRed px-4 rounded-lg font-bold text-white dark:text-black'>
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-white font-medium'>
                                    <p>Your Token Sell</p>
                                </div>
                                <p
                                    className="w-full p-2 focus:ring-4 focus:border-none focus:ring-tableBlue text-tableBlue dark:text-white rounded-lg bg-white dark:bg-tableBlue"
                                >
                                    {SellUSDT ? SellUSDT / price.price.number : 0}
                                </p>
                            </div>
                            {user && user.user_type !== 4 && <button type='submit' className='w-full py-4 text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                Sell Token
                            </button>}
                            {!user && <Link href="/Login" className='w-full py-4 text-center text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                Login
                            </Link>}
                            {user && user.user_type === 4 && <Link href="/pannel" className='w-full space-x-2 flex flex-row justify-center items-center py-4 text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                <p>Yor Are Ban</p>
                                <GoAlertFill size={30} />
                            </Link>}
                        </form>}
                    </div>
                    <div className='hidden lg:flex flex-col space-y-2 w-[20%]'>
                        <div className='w-full p-5 bg-softGray dark:bg-tradeBlue font-bold text-xl rounded-lg text-white'>Your Sales</div>
                        <div className='w-full flex flex-col h-[470px] bg-softGray dark:bg-tradeBlue font-bold text-lg rounded-lg text-white'>
                            <div className='flex flex-row justify-between p-5 items-center'>
                                <p>USDT</p>
                                <p>4X</p>
                            </div>
                            {!infoClient || infoClient.sell.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5 px-5">
                                <FaBoxArchive size={50} color="#7790A6" />
                                <p className="text-xl font-bold text-softBlue">Sellers Box Is Empty</p>
                            </div> : <div className="overflow-y-auto">
                                {infoClient.sell.slice().reverse().map((e, index) => {
                                    return (
                                        <div key={index} className="flex flex-row justify-between px-4 py-1 pb-4 mt-1 items-center">
                                            <p className="text-tradeRed text-sm text-start w-[100px]">{e.tetherRecive.toString().substring(0, 15)}</p>
                                            <p className="text-white text-sm text-end w-[100px]">{e.token.toString().substring(0, 10)}</p>
                                        </div>
                                    )
                                })}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='flex lg:hidden flex-row space-x-1 w-full justify-center items-start px-5 pb-24'>
                <div className='flex flex-col space-y-2 w-full'>
                    <div className='w-full p-5 bg-softGray dark:bg-tradeBlue font-bold text-xl rounded-lg text-white'>Buyers</div>
                    <div className='w-full h-[510px] flex flex-col bg-softGray dark:bg-tradeBlue font-bold text-lg rounded-lg text-white'>
                        <div className='flex flex-row p-5 justify-between items-center'>
                            <p>USDT</p>
                            <p>4X</p>
                        </div>
                        <div className="overflow-y-auto">
                            {infoPublic.buy.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between px-4 py-1 pb-4 mt-1 items-center">
                                        <p className="text-tradeGreen text-xs text-start w-full">{e.tether.toString().substring(0, 9)}</p>
                                        <p className="text-white text-xs text-end w-full">{e.tokenRecive.toString().substring(0, 9)}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <div className='w-full p-5 bg-softGray dark:bg-tradeBlue font-bold text-xl rounded-lg text-white'>Sellers</div>
                    <div className='w-full h-[510px] flex flex-col bg-softGray dark:bg-tradeBlue font-bold text-lg rounded-lg text-white'>
                        <div className='flex flex-row p-5 justify-between items-center'>
                            <p>USDT</p>
                            <p>4X</p>
                        </div>
                        <div className="overflow-y-auto">
                            {infoPublic.sell.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between px-4 py-1 pb-4 mt-1 items-center">
                                        <p className="text-tradeRed text-xs text-start w-full">{e.tetherRecive.toString().substring(0, 9)}</p>
                                        <p className="text-white text-xs text-end w-full">{e.token.toString().substring(0, 9)}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div> */}
            <ToastContainer />
            {
                showMessage && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message />
                </div>
            }
            {
                showMessage1 && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message1 />
                </div>
            }
            {
                showMessage2 && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message2 />
                </div>
            }
        </div >
    );
};

