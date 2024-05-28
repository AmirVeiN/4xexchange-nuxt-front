'use client'

import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiShieldDisabled } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import logo2 from "../../public/logo.png"
import { resetPassword, createTicket, allTickets, logout, getUser, GetChartDetail, ClientTicketAnswer, GetSellAndBuyClient, clientWithdrawsList, DepositHistoryClient, withdrawEmail, withdrawEmailConfirmation } from "../GlobalRedux/Features/userSlice";
import { toast } from 'sonner';
import LoadingPage from '../../components/loading';
import Popup from "../../components/modal"
import { FaBoxArchive } from "react-icons/fa6";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { MdSecurity } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { CgMenuMotion } from "react-icons/cg";
import coin from "../../public/coin.png"
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { SlWallet } from "react-icons/sl";
import { PiArrowUpBold } from "react-icons/pi";
import { PiArrowDownBold } from "react-icons/pi";
import { FaCreditCard } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { MdWorkHistory } from "react-icons/md";
import Image from "next/image";

export default function Pannel() {

    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const [secondsRemaining, setSecondsRemaining] = useState(5 * 60);
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    const [ticketText, setticketText] = useState("")

    const [ticketDetail, setTicketDetail] = useState('')

    const [activeButton, setActiveButton] = useState("Profile");
    const [change, setChange] = useState("");

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRe_password] = useState('');
    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRePasswordChange = (e) => setRe_password(e.target.value);

    const handleTicketText = (e) => setticketText(e.target.value);
    const [showMessage, setShowMessage] = useState(false);

    const [withdraw, setWithdraw] = useState(null);
    const handleWithdraw = (e) => setWithdraw(e.target.value);

    const [wallet, setwallet] = useState("");
    const handleWallet = (e) => setwallet(e.target.value);

    const [withdrawCode, setWithdrawCode] = useState(null);
    const handleWithdrawCode = (e) => setWithdrawCode(e.target.value);

    const [ticketTitle, setticketTitle] = useState('');
    const [description, setdescription] = useState('');
    const handleTicketTitle = (e) => setticketTitle(e.target.value);
    const handleDescription = (e) => setdescription(e.target.value);

    const dispatch = useDispatch();

    const data = useSelector((state) => state.user.user)
    const price = useSelector((state) => state.user.price)
    const tickets = useSelector((state) => state.user.tickets)
    const depositHistory = useSelector((state) => state.user.paymentsClient)
    const WithdrawHistory = useSelector((state) => state.user.clientWithdrawsList)
    const SellAndBuy = useSelector((state) => state.user.SellAndBuyClient)

    useEffect(() => {
        if (!data) {
            dispatch(getUser());
        }
    }, [dispatch,data]);

    useEffect(() => {

        if (change === "Withdraw Verification" && activeButton === "Profile") {

            const intervalId = setInterval(() => {
                setSecondsRemaining(prevSeconds => {
                    if (prevSeconds === 0) {
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }

    }, [change , activeButton]);

    useEffect(() => {

        if (!tickets) {
            dispatch(allTickets());
        }
    }, [tickets, dispatch]);

    useEffect(() => {

        if (!price) {
            dispatch(GetChartDetail());
        }
    }, [price, dispatch]);

    useEffect(() => {

        if (!depositHistory) {
            dispatch(DepositHistoryClient());
        }
    }, [depositHistory, dispatch]);

    useEffect(() => {

        if (!WithdrawHistory) {
            dispatch(clientWithdrawsList());
        }
    }, [WithdrawHistory, dispatch]);


    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', true);
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }
    }, [darkMode]);


    if (!data || !tickets || !depositHistory || !WithdrawHistory || !price) {

        return <LoadingPage />;

    }

    const Message = () => {
        return <Popup type="ok" reload={true} text="Your action was successfully registered" />
    }

    let usertime = new Date();

    const userLastUpdate = usertime.toDateString() + " , " + usertime.getHours() + ":" + usertime.getMinutes();

    const handleSubmit = (type) => {

        if (type === "password") {

            if (password !== "" && re_password !== "") {

                if (password === re_password) {

                    dispatch(resetPassword({ new_password: password, re_new_password: re_password, current_password: currentPassword })).then((e) => {
                        if (e.type.includes("fulfilled")) {
                            setShowMessage(true)
                        } else if (e.type.includes("rejected")) {
                            toast.error("Password Wrong")
                        }
                    });

                } else {

                    toast.error("password not match")
                }

            } else {

                toast.error("password is empty")

            }
        }
        else if (type === "CreateTicket") {

            if (ticketTitle !== "" && description !== "") {

                dispatch(createTicket({ title: ticketTitle, description: description })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setShowMessage(true)
                    }
                });

            } else {

                toast.error("ticketTitle or description is empty")

            }
        }
        else if (type === "TicketAnswer") {

            if (ticketDetail.ticket_status !== "Completed") {

                if (ticketText !== "") {

                    dispatch(ClientTicketAnswer({ ticket: ticketDetail.id, userType: "Client", message: ticketText })).then((e) => {
                        if (e.type.includes("fulfilled")) {
                            setShowMessage(true)
                        }
                    });


                } else {
                    toast.error("ticketAnswer is empty")
                }

            } else {
                toast.error("ticketAnswer is Allready Completed")
            }
        }
        else if (type === "withdrawEmail") {

            if (withdraw !== null && wallet !== "") {

                dispatch(withdrawEmail({ withdraw: withdraw, wallet: wallet })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setChange("Withdraw Verification")
                    } else if (e.type.includes("rejected")) {
                        toast.error("You do not have enough Tether to withdraw")
                    }
                });

            } else {

                toast.error("withdraw is empty")
            }

        }

        else if (type === "withdrawEmailConfirmation") {

            if (withdrawCode !== null) {

                dispatch(withdrawEmailConfirmation({ code: withdrawCode })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setShowMessage(true)
                    } else if (e.type.includes("rejected")) {
                        toast.error("Your Email Verification code has expired or Code not Correct")
                    }
                });

            } else {

                toast.error("withdraw is empty")
            }

        };
    };


    return (
        <div className="relative mb-[85px] md:mb-0 grow min-h-screen bg-white dark:bg-background">
            <div className={!showMessage ? "w-full h-full flex flex-row space-x-0 md:space-x-2 justify-center items-start" : "blur-md w-full h-full flex flex-row space-x-0 md:space-x-2 justify-center items-start"}>
                <div className="3xl:flex 2xl:flex xl:hidden md:hidden lg:hidden sm:hidden ph:hidden bg-softGray m-5 w-[220px] h-[778px] rounded-3xl flex-col justify-between pb-5 items-center">
                    <div className="w-full flex flex-col items-center ">
                        <div className="flex justify-center items-center w-full p-5" >
                            <Image src={logo2} alt="" width={200} height={200} />
                        </div>
                        <Image src="/Line.png" className="pb-4" alt="" width={200} height={2} />
                        <div className="space-y-4 flex flex-col w-[85%] mr-16 ">
                            <button onClick={() => setActiveButton("Profile")} className={activeButton === "Profile" ? `pt-1 delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : `pt-1 delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <FaUserCircle color="white" size={20} />
                                <p className="text-white text-lg">Profile</p>
                            </button>
                            <button onClick={() => setActiveButton("Security")} className={activeButton === "Security" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <MdSecurity color="white" size={20} />
                                <p className="text-white text-lg">Security</p>
                            </button>
                            <button onClick={() => setActiveButton("Payments")} className={activeButton === "Payments" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <MdOutlinePayments color="white" size={20} />
                                <p className="text-white text-lg">Payments</p>
                            </button>
                            <button onClick={() => setActiveButton("Ticket")} className={activeButton === "Ticket" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <BiSupport color="white" size={20} />
                                <p className="text-white text-lg">Ticket</p>
                            </button>
                            <button onClick={() => { setActiveButton("SellAndBuy"); dispatch(GetSellAndBuyClient({ id: data.id })) }} className={activeButton === "SellAndBuy" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <FaSackDollar color="white" size={20} />
                                <p className="text-white text-lg">Sell & Buy</p>
                            </button>
                        </div>
                        <Image src="/Line.png" className="py-5" alt="" width={200} height={2} />
                        <div className="space-y-4 flex flex-col w-[85%] mr-16">
                            <Link href="/" className="flex flex-row pl-8 space-x-3 items-center">
                                <IoIosHome color="white" size={20} />
                                <p className="text-white text-lg">Home</p>
                            </Link>
                            <button onClick={() => dispatch(logout())} className="flex flex-row pl-8 space-x-3 items-center">
                                <ImExit color="#EA5455" size={20} />
                                <p className="text-tradeRed text-lg">LogOut</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="3xl:hidden 2xl:hidden xl:flex md:flex lg:flex sm:flex ph:flex items-center justify-between">
                    <div className="bg-yellowBorder/50 rounded-xl p-1 fixed top-3 left-3 z-50">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <CgMenuMotion size={35} color="black" /> : <BiMenu size={35} color="black" />}
                        </button>
                    </div>
                    {isOpen && (
                        <div className="fixed top-0 left-0 flex bg-softGray w-[220px] h-full flex-col justify-between items-center rounded-r-3xl">
                            <div className="w-full flex flex-col items-center ">
                                <div className="flex justify-center items-center w-full p-5" >
                                    <Image src={logo2} alt="" width={200} height={200} />
                                </div>
                                <Image src="/Line.png" className="pb-4" alt="" width={200} height={2} />
                                <div className="space-y-4 flex flex-col w-[85%] ">
                                    <button onClick={() => setActiveButton("Profile")} className={activeButton === "Profile" ? `pt-1 delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : `pt-1 delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <FaUserCircle color="white" size={20} />
                                        <p className="text-white text-lg">Profile</p>
                                    </button>
                                    <button onClick={() => setActiveButton("Security")} className={activeButton === "Security" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <MdSecurity color="white" size={20} />
                                        <p className="text-white text-lg">Security</p>
                                    </button>
                                    <button onClick={() => setActiveButton("Payments")} className={activeButton === "Payments" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <MdOutlinePayments color="white" size={20} />
                                        <p className="text-white text-lg">Payments</p>
                                    </button>
                                    <button onClick={() => { setActiveButton("Ticket"); dispatch(allTickets()) }} className={activeButton === "Ticket" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <BiSupport color="white" size={20} />
                                        <p className="text-white text-lg">Ticket</p>
                                    </button>
                                    <button onClick={() => { setActiveButton("SellAndBuy"); dispatch(GetSellAndBuyClient({ id: data.id })) }} className={activeButton === "SellAndBuy" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center  bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <FaSackDollar color="white" size={20} />
                                        <p className="text-white text-lg">Sell & Buy</p>
                                    </button>
                                </div>
                                <Image src="/Line.png" className="py-5" alt="" width={200} height={2} />
                                <div className="space-y-4 flex flex-col w-[85%] mr-16">
                                    <Link href="/" className="flex flex-row pl-8 space-x-3 items-center">
                                        <IoIosHome color="white" size={20} />
                                        <p className="text-white text-lg">Home</p>
                                    </Link>
                                    <button onClick={() => dispatch(logout())} className="flex flex-row pl-8 space-x-3 items-center">
                                        <ImExit color="#EA5455" size={20} />
                                        <p className="text-tradeRed text-lg">LogOut</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="max-w-[1195px] w-full h-full pb-5 mb-10 mt-5 flex flex-col space-y-2 bg-back dark:bg-gray2 rounded-3xl">
                    <div className="hidden md:flex flex-col md:flex-row md:space-y-0 space-y-5 p-1 md:p-5">
                        <div className="min-w-[218px] h-[72px] bg-white dark:bg-background shadow-lg rounded-2xl justify-center md:justify-start items-center flex md:rounded-br-[90px] md:rounded-tr-md">
                            <div className="flex flex-row justify-start pl-4 pt-1 items-center space-x-4">
                                <FaUserCircle size={45} color="red" />
                                <div className="flex flex-col justify-center items-start">
                                    <p className="font-medium text-background dark:text-white">{data.username}</p>
                                    <p className="font-medium text-background dark:text-white">4xExChange</p>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-[961px] w-full h-[72px] shadow-lg items-center bg-white dark:bg-background rounded-2xl p-3 md:pl-10 md:pr-4 md:rounded-tl-[90px] md:rounded-bl-md flex flex-row justify-center md:justify-end">
                            <div className="flex flex-row space-x-1 md:space-x-5 items-center">
                                <button onClick={() => setDarkMode(!darkMode)} className="bg-back dark:bg-gray2 shadow-inner p-4 rounded-xl ">
                                    {!darkMode ? <MdLightMode color="#feb72f" size={25} /> : <MdDarkMode color="white" size={25} />}
                                </button>
                                <div className="bg-back dark:bg-gray2 shadow-inner px-3 py-3 rounded-xl flex flex-row justify-center items-center space-x-1">
                                    <p className="text-sm md:text-base font-bold text-background dark:text-white">Version</p>
                                    <p className="bg-tradeRed text-white rounded-xl px-2 py-1 text-xs md:text-sm font-bold">3.1.4</p>
                                </div>
                                <div className="bg-back dark:bg-gray2 shadow-inner px-4 py-2 rounded-xl flex flex-col justify-center items-center space-y-1">
                                    <div className="text-xs md:text-sm text-background dark:text-white font-medium">
                                        <p className="hidden sm:flex">Latest update:</p>
                                        <p className="font-bold py-2 sm:py-0">{userLastUpdate}</p>{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* ------------------------------------------------------------------------------------------------------------------- */}
                    {activeButton === "Profile" && <div className="hidden md:flex m-5 bg-white dark:bg-background  rounded-3xl shadow-lg flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Info</p>
                            </div>
                        </div>
                        <div className="flex flex-col divide-y-2 divide-softBlue/20 ">
                            <div className="flex flex-row justify-between items-center py-3">
                                <p className="font-medium text-softBlue text-center w-10">ID</p>
                                <p className="font-medium text-softBlue text-center w-48">Username</p>
                                <p className="font-medium text-softBlue text-center w-36">Date Joined</p>
                                <p className="font-medium text-softBlue text-center w-64">Email</p>
                                <p className="font-medium text-softBlue text-center w-24" >Status</p>
                            </div>
                            <div className="flex flex-row text-tableBlue dark:text-white justify-between items-center py-3">
                                <p className="text-center font-bold w-10">{data.id}</p>
                                <p className="text-center font-bold w-48">{data.username}</p>
                                <p className="text-center font-bold w-36">{data.date_joined}</p>
                                <p className="text-center font-bold w-64">{data.email}</p>
                                <div className="w-24">{(data.user_type === 3 && <div className="flex flex-row justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><FaCheckCircle color="white" /><p className="text-white font-bold">Verified</p></div>) || (data.user_type === 4 && <div className="flex flex-row justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><FaBan color="white" /><p className="text-white font-bold">Baned</p></div>) || (data.user_type === 1 && <div className="flex flex-row justify-center items-center space-x-1 bg-gridPurple rounded-md px-2 py-1"><MdAdminPanelSettings color="white" /><p className="text-white font-bold">Admin</p></div>) || (data.user_type === 2 && <div className="flex flex-row justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><GiShieldDisabled color="white" /><p className="text-white font-bold">Not Verified</p></div>)}</div>
                            </div>
                        </div>
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}

                    {activeButton === "Profile" && <div className="hidden md:flex m-5 bg-white dark:bg-background rounded-3xl shadow-lg flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue text-center">Logo</p>
                            <p className="font-medium text-softBlue text-center w-40">Name</p>
                            <p className="font-medium text-softBlue text-center w-40">Amount</p>
                            <p className="font-medium text-softBlue text-center w-32">Deposit</p>
                            <p className="font-medium text-softBlue text-center w-36">Withdraw</p>
                        </div>
                        <div className="flex flex-row text-background dark:text-white justify-between items-center py-3">
                            <SiTether alt="" size={40} color="#28C76F" />
                            <p className="text-center font-bold w-36">Tether(USDT)</p>
                            <p className="text-center font-bold w-36">{data.usdt}</p>
                            <Link href='/deposit' className="text-center font-bold bg-tradeGreen px-4 py-2 rounded-xl flex flex-row justify-center items-center space-x-3 text-white">
                                <SiTether size={20} />
                                <p>Deposit</p>
                            </Link>
                            <button onClick={() => setChange("Withdraw")} className="text-center font-bold bg-tradeRed px-4 py-2 rounded-xl flex flex-row justify-center items-center space-x-3 text-white">
                                <SiTether size={20} />
                                <p>Withdraw</p>
                            </button>
                        </div>
                        <div className="flex flex-row text-background dark:text-white justify-between items-center py-3">
                            <div className=" text-white">
                                <Image src={coin} alt="" width={45} height={45} />
                            </div>
                            <p className="text-center font-bold w-36">4x(Token)</p>
                            <p className="text-center font-bold w-36">{data.token}</p>
                            <p className="text-center font-bold w-36"></p>
                            <p className="text-center font-bold w-36"></p>
                        </div>
                    </div>}

                    {activeButton === "Profile" && <div className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg flex-col divide-y-2 divide-softBlue/20 p-5">
                        <div className="flex flex-row justify-center items-center space-x-1">
                            <Image src={logo2} alt="" width={50} height={50} />
                            <p className="font-black text-xl text-black dark:text-white">4xExChange</p>
                        </div>
                    </div>}

                    {activeButton === "Profile" && <div className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg flex-col divide-y-2 divide-softBlue/20 p-5">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <SlWallet color="gray" size={20} />
                                <p className="font-bold text-black dark:text-white">Main Wallet</p>
                            </div>
                            <p className="font-bold text-black dark:text-white">{(data.usdt + (data.token * price.price.number)).toString().substring(0, 10)}</p>
                        </div>
                    </div>}

                    {activeButton === "Profile" && <div className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg flex-col divide-y-2 divide-softBlue/20 p-2 py-5">
                        <div className="flex flex-row items-center justify-around">
                            <Link href="/deposit" className="flex flex-col space-y-2 justify-center items-center">
                                <div className="p-3 rounded-full bg-silver"><PiArrowDownBold size={20} color="black" /></div>
                                <p className="font-bold text-black dark:text-white">Deposit</p>
                            </Link>
                            <button onClick={() => setChange("Withdraw")} className="flex flex-col space-y-2 justify-center items-center">
                                <div className="p-3 rounded-full bg-silver"><PiArrowUpBold size={20} color="black" /></div>
                                <p className="font-bold text-black dark:text-white">Withdraw</p>
                            </button>
                            <Link href="/trading" className="flex flex-col space-y-2 justify-center items-center">
                                <div className="p-3 rounded-full bg-silver"><FaCreditCard size={20} color="black" /></div>
                                <p className="font-bold text-black dark:text-white">Buy</p>
                            </Link>
                            <Link href='/trading' className="flex flex-col space-y-2 justify-center items-center">
                                <div className="p-3 rounded-full bg-silver"><RiBankFill size={20} color="black" /></div>
                                <p className="font-bold text-black dark:text-white">Sell</p>
                            </Link>
                            <button onClick={() => setActiveButton("SellAndBuy")} className="flex flex-col space-y-2 justify-center items-center">
                                <div className="p-3 rounded-full bg-silver"><MdWorkHistory size={20} color="black" /></div>
                                <p className="font-bold text-black dark:text-white">History</p>
                            </button>
                        </div>
                    </div>}

                    {activeButton === "Profile" && <div className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg flex-col space-y-5 p-5">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-center items-center space-x-3">
                                <SiTether color="#28C76F" size={40} />
                                <div className="flex flex-col ">
                                    <p className="text-black font-bold dark:text-white">Tether</p>
                                    <p className="text-gray">$1</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-end">
                                <p className="text-black font-bold dark:text-white">{(data.usdt).toString().substring(0, 10)}</p>
                                <p className="text-gray">${(data.usdt).toString().substring(0, 10)}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-center items-center space-x-3">
                                <Image src={coin} alt="" width={40} height={40} />
                                <div className="flex flex-col ">
                                    <p className="text-black font-bold dark:text-white">4x</p>
                                    <p className="text-gray">${(price.price.number).toString().substring(0, 10)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-end">
                                <p className="text-black font-bold dark:text-white">{(data.token).toString().substring(0, 10)}</p>
                                <p className="text-gray">${(data.token * price.price.number).toString().substring(0, 10)}</p>
                            </div>
                        </div>
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}

                    {change === "Withdraw" && activeButton === "Profile" && <form onSubmit={(e) => { e.preventDefault(); handleSubmit("withdrawEmail"); }} className="hidden md:flex m-5 bg-white dark:bg-background rounded-3xl shadow-lg flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">{change}</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 justify-center items-center py-5">
                            <p className="shadow-inner shadow-tradeGreen dark:shadow-tradeRed rounded-lg text-softBlue font-bold bg-back w-[500px] text-center p-2">Your received Tether will have a Tether fee</p>
                            <p className="shadow-inner rounded-lg text-softBlue font-bold shadow-tradeGreen dark:shadow-tradeRed bg-back w-[500px] text-center p-2">Your Tether is = {data.usdt}</p>
                            <div className="flex flex-row w-full justify-center items-center space-x-5">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-[500px] p-2">Enter the Withdraw amount</p>
                                <input
                                    min={5}
                                    required
                                    type="number"
                                    value={withdraw}
                                    onChange={handleWithdraw}
                                    className="w-[500px] p-2 rounded-lg text-black font-bold bg-back shadow-inner shadow-background"
                                />
                            </div>
                            <div className="flex flex-row w-full justify-center items-center space-x-5">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-[500px] p-2">Enter Your Wallet Address(BSC-USDT)</p>
                                <input
                                    required
                                    type="text"
                                    value={wallet}
                                    onChange={handleWallet}
                                    className="w-[500px] p-2 rounded-lg text-black font-bold bg-back shadow-inner shadow-background"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form>}

                    {change === "Withdraw" && activeButton === "Profile" && <form onSubmit={(e) => { e.preventDefault(); handleSubmit("withdrawEmail"); }} className="flex md:hidden m-2 dark:bg-background bg-white rounded-3xl shadow-lg flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">{change}</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 justify-center items-center py-5">
                            <p className="shadow-inner shadow-tradeGreen rounded-lg text-softBlue font-bold bg-back w-full text-center p-2">Your received Tether will have a Tether fee</p>
                            <p className="shadow-inner rounded-lg text-softBlue font-bold shadow-tradeGreen bg-back w-full text-center p-2">Your Tether is = {data.usdt}</p>
                            <div className="flex flex-row w-full justify-center items-center space-x-5">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-fit  p-2">amount</p>
                                <input
                                    min={5}
                                    required
                                    type="number"
                                    value={withdraw}
                                    onChange={handleWithdraw}
                                    className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner shadow-background"
                                />
                            </div>
                            <div className="flex flex-row w-full justify-center items-center space-x-5">
                                <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-fit p-2">Address</p>
                                <input
                                    required
                                    type="text"
                                    value={wallet}
                                    onChange={handleWallet}
                                    className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner shadow-background"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form>}

                    {change === "Withdraw Verification" && activeButton === "Profile" && <form onSubmit={(e) => { e.preventDefault(); handleSubmit("withdrawEmailConfirmation"); }} className="m-2 md:m-5 bg-white dark:bg-background rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">{change}</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 justify-center items-center py-5">
                            <p className="shadow-inner rounded-lg text-black font-bold bg-back w-[100px] text-center p-2">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-full text-center p-2">Enter the Withdraw Verification Email Code</p>
                            <p className="shadow-inner shadow-purple rounded-lg text-softBlue font-bold bg-back w-full text-center p-2">We have sent a Verification code to your email account. please write the code in the field below and click submit</p>
                            <input
                                required
                                type="number"
                                placeholder="Email Verification code"
                                value={withdrawCode}
                                onChange={handleWithdrawCode}
                                className="w-[200px] p-2 rounded-lg text-black font-bold bg-back shadow-inner shadow-background"
                            />
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Security" && <div className="m-5 bg-white dark:bg-background rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Security</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center pt-5">
                            <button onClick={() => setChange("Password")} className="px-4 py-2 bg-back rounded-xl shadow-md font-bold text-background shadow-background">Change Password</button>
                        </div>
                    </div>}
                    {change === "Password" && activeButton === "Security" && <form onSubmit={(e) => { e.preventDefault(); handleSubmit("password"); }} className="m-5 bg-white dark:bg-background rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">{change}</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 justify-around items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Current Password</p>
                            <input
                                required
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={handleCurrentPasswordChange}
                                className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner"
                            />
                        </div>
                        <div className="flex flex-row space-x-4 justify-around items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the New Password</p>
                            <input
                                minLength="8"
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner"
                            />
                        </div>
                        <div className="flex flex-row space-x-4 justify-around items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Re new Password</p>
                            <input
                                minLength="8"
                                required
                                type="password"
                                placeholder="Repeat Password"
                                value={re_password}
                                onChange={handleRePasswordChange}
                                className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner"
                            />
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}

                    {activeButton === "Payments" && <div on className="hidden md:flex m-5 bg-white dark:bg-background rounded-3xl shadow-lg h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Deposit Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-[120px] text-center">Type</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Tether Deposit</p>
                            <p className="font-medium text-softBlue w-[400px] text-center">Wallet</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Time</p>
                        </div>
                        {depositHistory.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Payments Box Is Empty</p>
                        </div> : <div className="overflow-y-scroll">
                            {depositHistory.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between py-3 mt-1 items-center">
                                        <p className="text-tradeGreen font-bold w-[120px] text-center">{e.crypto_type}</p>
                                        <p className="text-gray dark:text-white w-[150px] text-center">{e.tether}</p>
                                        <p className="text-gray dark:text-white w-[400px] text-center">{e.wallet}</p>
                                        <p className="text-gray dark:text-white w-[150px] text-center">{e.time}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {activeButton === "Payments" && <div on className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Deposit Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center py-3">
                            <p className="font-medium text-softBlue text-center">Type</p>
                            <p className="font-medium text-softBlue text-center">Tether Deposit</p>
                            <p className="font-medium text-softBlue text-center">Wallet</p>
                            <p className="font-medium text-softBlue text-center">Time</p>
                        </div>
                        {depositHistory.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Payments Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeRed">
                            {depositHistory.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col justify-around space-y-1 py-3 mt-1 items-center ">
                                        <p className="text-tradeGreen font-bold text-center">{e.crypto_type}</p>
                                        <p className="text-gray dark:text-white font-bold text-center">{e.tether}</p>
                                        <p className="text-gray dark:text-white font-bold text-sm text-center">{e.wallet}</p>
                                        <p className="text-gray dark:text-white font-bold text-center">{e.time}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {activeButton === "Payments" && <div on className="hidden md:flex m-5 bg-white dark:bg-background rounded-3xl shadow-lg h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Withdraw Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-[80px] text-center">Tether</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-[400px] text-center">Wallet</p>
                            <p className="font-medium text-softBlue w-[300px] text-center">Text</p>
                            <p className="font-medium text-softBlue w-[100px] text-center">Status</p>
                        </div>
                        {WithdrawHistory.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Payments Box Is Empty</p>
                        </div> : <div className="overflow-y-auto">
                            {WithdrawHistory.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between py-3 mt-1 items-center">
                                        <p className="text-tradeRed font-bold w-[80px] text-center">{e.tether}</p>
                                        <p className="text-gray dark:text-white w-[150px] text-center">{e.time}</p>
                                        <p className="text-gray dark:text-white w-[400px] text-center">{e.wallet}</p>
                                        <p className="text-gray dark:text-white w-[300px] text-center">{e.text}</p>
                                        <div className="w-[100px]">{(e.status === 1 && <div className="flex justify-center items-center space-x-1 bg-blue rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                            (e.status === 3 && <div className="flex justify-center items-center space-x-1 bg-tradeRed rounded-md px-2 py-1"><p className="text-white font-bold">Reject</p></div>)
                                            || (e.status === 2 && <div className="flex justify-center items-center space-x-1 bg-tradeGreen rounded-md px-2 py-1"><p className="text-white font-bold">Accept</p></div>)}</div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "Payments" && <div on className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Withdraw Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center py-3">
                            <p className="font-medium text-softBlue text-center">Tether</p>
                            <p className="font-medium text-softBlue text-center">Time</p>
                            <p className="font-medium text-softBlue text-center">Wallet</p>
                            <p className="font-medium text-softBlue text-center">Text</p>
                            <p className="font-medium text-softBlue text-center">Status</p>
                        </div>
                        {WithdrawHistory.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Payments Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeGreen">
                            {WithdrawHistory.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col justify-center py-3 mt-1 space-y-1 items-center">
                                        <p className="text-tradeRed font-bold text-center">{e.tether}</p>
                                        <p className="text-gray dark:text-white font-bold text-center">{e.time}</p>
                                        <p className="text-gray dark:text-white font-bold text-sm text-center">{e.wallet}</p>
                                        <p className="text-gray dark:text-white font-bold text-center">{e.text}</p>
                                        <div className="">{(e.status === 1 && <div className="flex justify-center items-center space-x-1 bg-blue rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                            (e.status === 3 && <div className="flex justify-center items-center space-x-1 bg-tradeRed rounded-md px-2 py-1"><p className="text-white font-bold">Reject</p></div>)
                                            || (e.status === 2 && <div className="flex justify-center items-center space-x-1 bg-tradeGreen rounded-md px-2 py-1"><p className="text-white font-bold">Accept</p></div>)}</div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Ticket" && <div on className="hidden md:flex m-5 bg-white dark:bg-background rounded-3xl shadow-lg h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Ticket</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around  items-center py-3">
                            <p className="font-medium text-softBlue">Title</p>
                            <p className="font-medium text-softBlue ml-16">Description</p>
                            <p className="font-medium text-softBlue ml-14">Time</p>
                            <p className="font-medium text-softBlue">Status</p>
                            <p className="font-medium text-softBlue">Actions</p>
                        </div>
                        {tickets.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Ticket Box Is Empty</p>
                        </div> : <div className="overflow-y-scroll">
                            {tickets.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-around py-3 mt-1 items-center">
                                        <p className="text-gray dark:text-white w-[150px] text-center">{e.title.substring(0, 15)}</p>
                                        <p className="text-gray dark:text-white w-[300px] text-center">{e.description.substring(0, 30)}</p>
                                        <p className="text-gray dark:text-white w-[150px] text-center">{e.date_created.split(":")[0].substring(0, 10)}</p>
                                        <div className="w-[150px]">{(e.ticket_status === "Pending" && <div className="flex justify-center items-center space-x-1 bg-yellow rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                            (e.ticket_status === "Completed" && <div className="flex justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><p className="text-white font-bold">Completed</p></div>)
                                            || (e.ticket_status === "Active" && <div className="flex justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><p className="text-white font-bold">Active</p></div>)}</div>
                                        <div className="w-[150px] flex justify-center items-center">
                                            <button onClick={() => setTicketDetail(e)} className="p-2 justify-center items-center w-[60px] flex bg-red rounded-md">
                                                <FaPen color="white" size={15} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "Ticket" && <div on className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Ticket</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center py-3">
                            <p className="font-medium text-softBlue">Title</p>
                            <p className="font-medium text-softBlue ">Description</p>
                            <p className="font-medium text-softBlue ">Time</p>
                            <p className="font-medium text-softBlue">Status</p>
                            <p className="font-medium text-softBlue">Actions</p>
                        </div>
                        {tickets.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Ticket Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeGreen">
                            {tickets.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col justify-center space-y-2 py-3 mt-1 items-center">
                                        <p className="text-gray dark:text-white w-[150px] text-center">{e.title.substring(0, 15)}</p>
                                        <p className="text-gray dark:text-white w-[300px] text-center">{e.description.substring(0, 30)}</p>
                                        <p className="text-gray dark:text-white w-[150px] text-center">{e.date_created.split(":")[0].substring(0, 10)}</p>
                                        <div className="w-[150px]">{(e.ticket_status === "Pending" && <div className="flex justify-center items-center space-x-1 bg-yellow rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                            (e.ticket_status === "Completed" && <div className="flex justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><p className="text-white font-bold">Completed</p></div>)
                                            || (e.ticket_status === "Active" && <div className="flex justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><p className="text-white font-bold">Active</p></div>)}</div>
                                        <div className="w-[150px] flex justify-center items-center">
                                            <button onClick={() => setTicketDetail(e)} className="p-2 justify-center w-[60px] items-center flex bg-red rounded-md">
                                                <FaPen color="white" size={15} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}


                    {activeButton === "Ticket" && <div on className="m-2 md:m-5 bg-white dark:bg-background rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Ticket</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center pt-5">
                            <button onClick={() => setChange("CreateTicket")} className="px-4 py-2 bg-back rounded-xl shadow-md font-bold text-background shadow-background">CreateTicket</button>
                        </div>
                    </div>}
                    {change === "CreateTicket" && activeButton === "Ticket" && <form onSubmit={(e) => { e.preventDefault(); handleSubmit("CreateTicket"); }} className="m-2 md:m-5 bg-white dark:bg-background rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">{change}</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 justify-around items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Title</p>
                            <input
                                maxLength="100"
                                required
                                type="text"
                                placeholder="Title"
                                value={ticketTitle}
                                onChange={handleTicketTitle}
                                className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner"
                            />
                        </div>
                        <div className="flex flex-row space-x-4 justify-around items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Discription</p>
                            <input
                                maxLength="400"
                                required
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={handleDescription}
                                className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner"
                            />
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form>}
                    {activeButton === "Ticket" && ticketDetail !== "" && <div on className="m-2 md:m-5 bg-white dark:bg-background rounded-3xl shadow-lg flex h-[600px] flex-col justify-between divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-col h-full space-y-3">
                            <div className="flex flex-col md:flex-row justify-between items-center pb-3">
                                <div className="flex flex-row space-x-2 justify-center items-center">
                                    <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                    <p className="font-bold text-softBlue">TicketAnswer</p>
                                </div>
                                <div>
                                    <p className="font-bold text-softBlue">
                                        Title : {ticketDetail.title}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold text-softBlue">
                                        Ticket Stuts : {ticketDetail.ticket_status}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-5 overflow-y-auto h-full">
                                <div className="flex flex-row items-center space-x-2">
                                    <div className="min-w-5">
                                        <FaUser size={30} color="#435fcb" />
                                    </div>
                                    <div className="flex bg-blue text-white rounded-xl font-bold p-2 break-all h-fit max-w-[90%]">{ticketDetail.description}</div>
                                </div>
                                {ticketDetail.ticket.map((e, index) => {
                                    return (
                                        <div key={index}>
                                            {
                                                e.userType === "Admin" ? <div className="flex flex-row font-bold justify-start items-center space-x-2">
                                                    <div className="min-w-5">
                                                        <FaUser size={30} color="red" />
                                                    </div>
                                                    <div className="flex bg-red text-white rounded-xl p-2 break-all h-fit max-w-[90%]">{e.message}</div>
                                                </div> : <div className="flex flex-row justify-start font-bold items-center space-x-2">
                                                    <div className="min-w-5">
                                                        <FaUser size={30} color="#435fcb" />
                                                    </div>
                                                    <div className="flex bg-blue text-white rounded-xl p-2 break-all h-fit max-w-[90%]">{e.message}</div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            {ticketDetail.ticket_status !== "Completed" ? <form onSubmit={(e) => { e.preventDefault(); handleSubmit("TicketAnswer") }} className="flex flex-row space-x-3">
                                <input
                                    required
                                    type="text"
                                    placeholder="..."
                                    value={ticketText}
                                    onChange={handleTicketText}
                                    className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-blue/40 shadow-inner"
                                />
                                <button type="submit" className="px-4 py-2 bg-blue text-white font-bold rounded-lg">Send</button>
                            </form> : <div className="text-center w-full p-2 rounded-lg bg-back dark:bg-background shadow-purple dark:shadow-white text-purple dark:text-white font-bold shadow-inner">Text Not Allow When Ticket is Completed</div>}
                        </div>
                    </div>}



                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "SellAndBuy" && <div on className="hidden md:flex m-5 bg-white dark:bg-background rounded-3xl shadow-lg h-[350px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Token Buy</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3 pr-3">
                            <p className="font-medium text-softBlue w-[200px] text-center">Tether</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-[200px] text-center">Token Recive</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Token Price</p>
                        </div>
                        {!SellAndBuy || SellAndBuy.buy.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Buyers Box Is Empty</p>
                        </div> : <div className="overflow-y-auto">
                            {SellAndBuy.buy.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between py-3 font-bold mt-1 items-center">
                                        <p className="text-tradeGreen w-[200px] text-center">{e.tether}</p>
                                        <p className="text-tradeGreen w-[150px] text-center">{e.time}</p>
                                        <p className="text-tradeGreen w-[200px] text-center">{e.tokenRecive}</p>
                                        <p className="text-tradeGreen w-[150px] text-center">{e.tokenPrice}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "SellAndBuy" && <div on className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg h-[350px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Token Buy</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center py-3 pr-3">
                            <p className="font-medium text-softBlue text-center">Tether</p>
                            <p className="font-medium text-softBlue text-center">Time</p>
                            <p className="font-medium text-softBlue text-center">Token Recive</p>
                            <p className="font-medium text-softBlue text-center">Token Price</p>
                        </div>
                        {!SellAndBuy || SellAndBuy.buy.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Buyers Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeRed">
                            {SellAndBuy.buy.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col justify-center py-3 font-bold mt-1 items-center">
                                        <p className="text-tradeGreen text-center">{e.tether}</p>
                                        <p className="text-tradeGreen text-center">{e.time}</p>
                                        <p className="text-tradeGreen text-center">{e.tokenRecive}</p>
                                        <p className="text-tradeGreen text-center">{e.tokenPrice}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}


                    {activeButton === "SellAndBuy" && <div on className="hidden md:flex m-5 bg-white dark:bg-background rounded-3xl shadow-lg h-[350px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Token Sell</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3 pr-3">
                            <p className="font-medium text-softBlue w-[200px] text-center">Tether Recive</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-[200px] text-center">Token</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Token Price</p>
                        </div>
                        {!SellAndBuy || SellAndBuy.sell.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Sellers Box Is Empty</p>
                        </div> : <div className="overflow-y-auto">
                            {SellAndBuy.sell.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between py-3 font-bold mt-1 items-center">
                                        <p className="text-tradeRed w-[200px] text-center">{e.tetherRecive}</p>
                                        <p className="text-tradeRed w-[150px] text-center">{e.time}</p>
                                        <p className="text-tradeRed w-[200px] text-center">{e.token}</p>
                                        <p className="text-tradeRed w-[150px] text-center">{e.tokenPrice}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "SellAndBuy" && <div on className="flex md:hidden m-2 bg-white dark:bg-background rounded-3xl shadow-lg h-[350px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Token Sell</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center py-3 pr-3">
                            <p className="font-medium text-softBlue text-center">Tether Recive</p>
                            <p className="font-medium text-softBlue text-center">Time</p>
                            <p className="font-medium text-softBlue text-center">Token</p>
                            <p className="font-medium text-softBlue text-center">Token Price</p>
                        </div>
                        {!SellAndBuy || SellAndBuy.sell.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Sellers Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeGreen">
                            {SellAndBuy.sell.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col justify-center  py-3 font-bold mt-1 items-center">
                                        <p className="text-tradeRed text-center">{e.tetherRecive}</p>
                                        <p className="text-tradeRed text-center">{e.time}</p>
                                        <p className="text-tradeRed text-center">{e.token}</p>
                                        <p className="text-tradeRed text-center">{e.tokenPrice}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                </div>
            </div >
            {
                showMessage && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message />
                </div>
            }
        </div >
    );
}