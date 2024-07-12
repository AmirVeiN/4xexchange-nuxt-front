"use client"

import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from '../../components/loading';
import { BuyUSDTClient, SellUSDTClient, getUser, GetSellAndBuyClient, GetChartDetail, GetSellAndBuyPublic, ChartData } from "../GlobalRedux/Features/userSlice";
import Popup from '../../components/modal';
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";
import Link from 'next/link';
import { GoAlertFill } from "react-icons/go";
import { toast } from 'sonner';
import WebSocketComponent from "../../components/chart"
import Image from "next/image";
import logo from "../../public/logo.png"
import { SiTether } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";

export default function ChartComponent() {

    const [showMessage, setShowMessage] = useState(false);
    const [showMessage1, setShowMessage1] = useState(false);
    const [showMessage2, setShowMessage2] = useState(false);
    const [chartTime, setChartTime] = useState("5M")
    const [switchButton, setSwitchButton] = useState(false);
    const [lastClosePrice, setLastClosePrice] = useState(null);
    const [volume24h, setVolume24h] = useState(null);

    console.log(volume24h);

    const handleLastClosePriceUpdate = (price) => {
        setLastClosePrice(price);
    };

    const handleVolume24hUpdate = (volume) => {
        setVolume24h(volume);
    };

    const ChartTimeHandler = (time) => {
        setChartTime(time)
    }

    const dispach = useDispatch()

    const [BuyUSDT, setBuyUSDT] = useState("");
    const handleBuyUSDT = (e) => setBuyUSDT(e.target.value);

    const [SellUSDT, setSellUSDT] = useState("");
    const handleSellUSDT = (e) => setSellUSDT(e.target.value);

    const user = useSelector((state) => state.user.user)
    const infoClient = useSelector((state) => state.user.SellAndBuyClient)
    const infoPublic = useSelector((state) => state.user.SellAndBuyPublic)


    useEffect(() => {

        if (!user) {
            dispach(getUser());
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

    }, [infoClient, infoPublic, dispach, user]);


    if ((!infoPublic) || (user && !infoClient)) {
        return <LoadingPage />
    }

    if (!infoPublic) {
        dispach(GetSellAndBuyPublic());
        return;
    }

    const handleSubmit = (type) => {

        if (type === "buy") {

            if (BuyUSDT !== "" && lastClosePrice) {

                setShowMessage(true)

            } else {

                toast.error("Enter the amount of USDT")
            }

        } else if (type === "sell") {

            if (SellUSDT !== "" && lastClosePrice) {

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
                    <p className='text-2xl font-bold text-black'>Are you Sure?</p>
                    <p className='font-bold w-full text-black'>Token Spent = {props.tokenRecive}</p>
                    <p className='font-bold w-full text-black'>Tether Recive = {props.tether}</p>
                    <div className='flex flex-row justify-around w-full'>
                        <button className='px-8 py-2 rounded-2xl bg-blue font-medium text-white text-xl' onClick={okPopuop}>Ok</button>
                        <button className='px-5 py-2 rounded-2xl bg-gray font-medium text-white text-xl' onClick={closePopup}>Close</button>
                    </div>
                </div>
            </div> || isOpen && props.type === "buy" &&
            <div className=' bg-white w-[350px] p-5 border-2 border-blue rounded-2xl'>
                <div className="flex flex-col space-y-5 justify-center items-center text-center w-full">
                    <IoInformationCircleSharp size={150} color='#435fcb' />
                    <p className='text-2xl font-bold text-black'>Are you Sure?</p>
                    <p className='font-bold w-full text-black'>Tether Spent = {props.tether}</p>
                    <p className='font-bold w-full text-black'>Token Recive = {props.tokenRecive}</p>
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
        return <Alert type="sell" user={user.email} tether={parseFloat(SellUSDT)} tokenRecive={SellUSDT / lastClosePrice} tokenPrice={lastClosePrice} />
    }

    const Message = () => {
        return <Alert type="buy" user={user.email} tether={parseFloat(BuyUSDT)} tokenRecive={BuyUSDT / lastClosePrice} tokenPrice={lastClosePrice} />
    }

    return (
        <div className='bg-white flex flex-col space-y-10 w-full h-full pt-2 md:pt-32 relative'>
            <div className={(!showMessage && !showMessage2 && !showMessage1) ? 'flex flex-col w-full justify-center items-center space-y-5' : 'blur-md flex flex-col w-full justify-center items-center space-y-5'}>
                <div className='flex flex-row space-x-0 lg:space-x-5 w-full justify-center items-start px-2 lg:px-6'>
                    <div className='flex flex-col space-y-2 w-full'>
                        <div className='hidden lg:flex flex-row justify-between items-center w-full'>
                            <div className='flex flex-row space-x-3'>
                                <div className='flex flex-row justify-center items-center space-x-1'>
                                    <Image src={logo} alt="" width={25} priority={true} />
                                    <p className="text-black font-bold">4xToken  /</p>
                                </div>
                                <div className='flex flex-row justify-center items-center space-x-1'>
                                    <SiTether alt="" size={22} color="green" />
                                    <p className="text-black font-bold">TetherUS(USDT)</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-black font-bold">Price : {lastClosePrice}</p>
                            </div>
                            <div>
                                <p className="text-black font-bold">24H Volumes : {volume24h}</p>
                            </div>
                            <div className='flex flex-row space-x-1 justify-center items-center'>
                                <p className="text-black font-bold">Update : </p>
                                <FaCircleCheck alt="" size={20} color="#21749c" />
                            </div>
                        </div>
                        <div className='flex lg:hidden flex-col space-y-3 text-xs justify-between items-center w-full'>
                            <div className='flex flex-row justify-between w-full'>
                                <div className='flex flex-row space-x-3'>
                                    <div className='flex flex-row justify-center items-center space-x-1'>
                                        <Image src={logo} alt="" width={25} priority={true} />
                                        <p className="text-black font-bold">4xToken  /</p>
                                    </div>
                                    <div className='flex flex-row justify-center items-center space-x-1'>
                                        <SiTether alt="" size={22} color="green" />
                                        <p className="text-black font-bold">TetherUS(USDT)</p>
                                    </div>
                                </div>
                                <div className='flex flex-row space-x-1 justify-center items-center'>
                                    <p className="text-black font-bold">Update : </p>
                                    <FaCircleCheck alt="" size={20} color="#21749c" />
                                </div>
                            </div>
                            <div className='flex flex-row justify-between w-full'>
                                <div>
                                    <p className="text-black font-bold">Price : {lastClosePrice}</p>
                                </div>
                                <div>
                                    <p className="text-black font-bold">24H Volumes : {volume24h}</p>
                                </div>
                            </div>
                        </div>
                        <WebSocketComponent onLastClosePriceUpdate={handleLastClosePriceUpdate} onVolume24hUpdate={handleVolume24hUpdate} />
                    </div>
                </div>
                <div className='flex flex-row space-x-0 lg:space-x-5 w-full justify-center items-start pb-5 px-5'>
                    <div className='hidden lg:flex flex-col space-y-2 w-[20%]'>
                        <div className='w-full p-5 bg-white border shadow-mainBlue/20 font-bold text-xl rounded-lg text-mainBlue'>Your Buys</div>
                        <div className='w-full flex flex-col h-[470px] border bg-white shadow-mainBlue/20 font-bold text-lg rounded-lg text-mainBlue'>
                            <div className='flex flex-row p-5 justify-between items-center'>
                                <p>USDT</p>
                                <p>4X</p>
                            </div>
                            {!infoClient || infoClient.buy.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5 px-5">
                                <FaBoxArchive size={50} color="#21749c" />
                                <p className="text-xl font-bold text-mainBlue">Box Is Empty</p>
                            </div> : <div className="overflow-y-auto">
                                {infoClient.buy.slice().reverse().map((e, index) => {
                                    return (
                                        <div key={index} className="flex flex-row justify-between px-4 py-1 pb-4 mt-1 items-center">
                                            <p className="text-tradeGreen text-sm text-start w-[100px]">{e.tether.toString().substring(0, 15)}</p>
                                            <p className="text-mainBlue text-sm text-end w-[100px]">{e.tokenRecive.toString().substring(0, 10)}</p>
                                        </div>
                                    )
                                })}
                            </div>}
                        </div>
                    </div>
                    <div className='hidden lg:flex h-full rounded-lg border border-mainBlue bg-white shadow-mainBlue/20 flex-col lg:flex-row w-full lg:w-[60%] justify-center items-center'>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit("buy"); }} className='flex flex-col h-full justify-start items-start w-full lg:w-1/2 p-5'>
                            <p className='text-xl font-bold text-mainBlue py-3'>Buy Token(4X)</p>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Tether(USDT)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{user ? user.usdt : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Token(4X)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{user ? user.token : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Price(4X)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{lastClosePrice}</p>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-mainBlue font-medium'>
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
                                        className="w-full p-2 text-mainBlue shadow-mainBlue shadow-inner rounded-lg bg-white "
                                    />
                                    <button type='button' onClick={() => setBuyUSDT(user.usdt)} className='bg-tradeGreen px-4 rounded-lg font-bold text-white'>
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between  text-mainBlue font-medium'>
                                    <p>Your Token Recive</p>
                                </div>
                                <p
                                    className="w-full shadow-mainBlue p-2 text-mainBlue shadow-inner rounded-lg bg-white"
                                >
                                    {BuyUSDT ? BuyUSDT / lastClosePrice : 0}
                                </p>
                            </div>
                            {user && user.user_type !== 4 && <button type='submit' className='w-full py-4 text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                Buy Token
                            </button>}
                            {!user && <Link href="/Login" className='w-full py-4 text-center text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                Login
                            </Link>}
                            {user && user.user_type === 4 && <Link href="/pannel" className='w-full space-x-2 flex flex-row justify-center items-center py-4 text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                <p>You Are Ban</p>
                                <GoAlertFill size={30} />
                            </Link>}
                        </form>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit("sell"); }} className='flex flex-col h-full justify-start items-start w-full lg:w-1/2 p-5'>
                            <p className='text-xl font-bold text-mainBlue py-3'>Sell Token(4X)</p>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Tether(USDT)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{user ? user.usdt : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Token(4X)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{user ? user.token : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Price(4X)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{lastClosePrice}</p>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-mainBlue font-medium'>
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
                                        className="w-full p-2 shadow-mainBlue text-mainBlue rounded-lg bg-white shadow-inner "
                                    />
                                    <button type='button' onClick={() => setSellUSDT(user.token * lastClosePrice)} className='bg-tradeRed px-4 rounded-lg font-bold text-white'>
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-mainBlue font-medium'>
                                    <p>Your Token Sell</p>
                                </div>
                                <p
                                    className="w-full shadow-mainBlue p-2 shadow-inner text-mainBlue rounded-lg bg-white "
                                >
                                    {SellUSDT ? SellUSDT / lastClosePrice : 0}
                                </p>
                            </div>
                            {user && user.user_type !== 4 && <button type='submit' className='w-full py-4 text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                Sell Token
                            </button>}
                            {!user && <Link href="/Login" className='w-full py-4 text-center text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                Login
                            </Link>}
                            {user && user.user_type === 4 && <Link href="/pannel" className='w-full space-x-2 flex flex-row justify-center items-center py-4 text-2xl rounded-lg text-white font-bold bg-tradeRed mt-5'>
                                <p>You Are Ban</p>
                                <GoAlertFill size={30} />
                            </Link>}
                        </form>
                    </div>
                    <div className='mb-24 lg:mb-0 flex lg:hidden h-full rounded-lg bg-white border border-mainBlue flex-col lg:flex-row w-full lg:w-[60%] justify-center items-center'>
                        <div className='flex flex-row space-x-0 justify-end pt-5 pr-5 w-full'>
                            <button onClick={() => setSwitchButton(false)} className={!switchButton ? 'px-6 py-3 text-white text-xl font-bold bg-tradeGreen rounded-l-md' : 'px-6 py-3 text-softGray text-xl font-bold bg-white rounded-l-md'}>Buy</button>
                            <button onClick={() => setSwitchButton(true)} className={switchButton ? 'px-6 py-3 text-white text-xl font-bold bg-tradeRed rounded-r-md' : 'px-6 py-3 text-softGray text-xl font-bold bg-white rounded-r-md'}>Sell</button>
                        </div>
                        {!switchButton ? <form onSubmit={(e) => { e.preventDefault(); handleSubmit("buy"); }} className='flex flex-col h-full justify-start items-start w-full lg:w-1/2 p-5'>
                            <p className='text-xl font-bold text-mainBlue py-3'>Buy Token(4X)</p>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Tether(USDT)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{user ? user.usdt : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Token(4X)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{user ? user.token : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Price(4X)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{lastClosePrice}</p>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-mainBlue font-medium'>
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
                                        className="w-full p-2 shadow-mainBlue text-mainBlue rounded-lg bg-white shadow-inner"
                                    />
                                    <button type='button' onClick={() => setBuyUSDT(user.usdt)} className='bg-tradeGreen px-4 rounded-lg font-bold text-white'>
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-mainBlue font-medium'>
                                    <p>Your Token Recive</p>
                                </div>
                                <p
                                    className="w-full shadow-mainBlue p-2 bg-white shadow-inner text-mainBlue rounded-lg"
                                >
                                    {BuyUSDT ? BuyUSDT / lastClosePrice : 0}
                                </p>
                            </div>
                            {user && user.user_type !== 4 && <button type='submit' className='w-full py-4 text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                Buy Token
                            </button>}
                            {!user && <Link href="/Login" className='w-full py-4 text-center text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                Login
                            </Link>}
                            {user && user.user_type === 4 && <Link href="/pannel" className='w-full space-x-2 flex flex-row justify-center items-center py-4 text-2xl rounded-lg text-white font-bold bg-tradeGreen mt-5'>
                                <p>You Are Ban</p>
                                <GoAlertFill size={30} />
                            </Link>}
                        </form> : <form onSubmit={(e) => { e.preventDefault(); handleSubmit("sell"); }} className='flex flex-col h-full justify-start items-start w-full lg:w-1/2 p-5'>
                            <p className='text-xl font-bold text-mainBlue py-3'>Sell Token(4X)</p>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Tether(USDT)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{user ? user.usdt : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Token(4X)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{user ? user.token : 0}</p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-start items-center py-3 w-full">
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[40%] p-2">Price(4X)</p>
                                <p className="shadow-inner shadow-mainBlue rounded-lg text-mainBlue font-bold bg-white w-[60%] p-2">{lastClosePrice}</p>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex justify-between text-mainBlue font-medium'>
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
                                        className="w-full shadow-mainBlue p-2 shadow-inner text-mainBlue rounded-lg bg-white"
                                    />
                                    <button type='button' onClick={() => setSellUSDT(user.token * lastClosePrice)} className='bg-tradeRed px-4 rounded-lg font-bold text-white dark:text-black'>
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full space-y-2 py-2'>
                                <div className='flex shadow-mainBlue justify-between text-mainBlue font-medium'>
                                    <p>Your Token Sell</p>
                                </div>
                                <p
                                    className="w-full p-2 text-tableBlue shadow-inner rounded-lg bg-white"
                                >
                                    {SellUSDT ? SellUSDT / lastClosePrice : 0}
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
                        <div className='w-full p-5 bg-white border shadow-mainBlue/20 font-bold text-xl rounded-lg text-mainBlue'>Your Sales</div>
                        <div className='w-full flex flex-col border shadow-mainBlue/20 h-[470px] bg-white font-bold text-lg rounded-lg text-mainBlue'>
                            <div className='flex flex-row justify-between p-5 items-center'>
                                <p>USDT</p>
                                <p>4X</p>
                            </div>
                            {!infoClient || infoClient.sell.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5 px-5">
                                <FaBoxArchive size={50} color="#21749c" />
                                <p className="text-xl font-bold text-mainBlue">Box Is Empty</p>
                            </div> : <div className="overflow-y-auto">
                                {infoClient.sell.slice().reverse().map((e, index) => {
                                    return (
                                        <div key={index} className="flex flex-row justify-between px-4 py-1 pb-4 mt-1 items-center">
                                            <p className="text-tradeRed text-sm text-start w-[100px]">{e.tetherRecive.toString().substring(0, 15)}</p>
                                            <p className="text-mainBlue text-sm text-end w-[100px]">{e.token.toString().substring(0, 10)}</p>
                                        </div>
                                    )
                                })}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            {
                showMessage && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message />
                </div>
            }
            {
                showMessage1 && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message1 />
                </div>
            }
            {
                showMessage2 && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message2 />
                </div>
            }
        </div >
    );
};

