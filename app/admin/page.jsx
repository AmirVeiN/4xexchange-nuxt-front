'use client'

import { FaUserCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { TbTruckLoading } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiShieldDisabled } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { resetPassword, GetSellAndBuyAdmin, AddPriceData, DisableDeposit, AcceptDeposit, ChangeVolume, DepositRequests, allDepositUsers, changeCurrnecy, changeWithdrawAnswer, AdminUserList, changeStatusUser, AdminWithdraws, logout, UserFullDetails, AdminTicketList, AdminTicketAnswer, AdminTicketComplete, AdminUserSearch, ChartData, temporaryChartData, getUser } from "../GlobalRedux/Features/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPage from '../../components/loading';
import Popup from "../../components/modal"
import { FaBoxArchive } from "react-icons/fa6";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { GiTicket } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import Select from 'react-select';
import { SiTether } from "react-icons/si";
import { Ri24HoursLine } from "react-icons/ri";
import { BiMenu } from "react-icons/bi";
import { CgMenuMotion } from "react-icons/cg";
import { BiSupport } from "react-icons/bi";
import { LuCandlestickChart } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import coin from "../../public/coin.png"
import { IoMdCloseCircle } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import Logo from "../../public/logo.png"

export default function Admin() {

    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const [activeButton, setActiveButton] = useState("Members");
    const [change, setChange] = useState("");

    const [ticketText, setticketText] = useState("")

    const [ticketDetail, setTicketDetail] = useState('')
    const [withdrawDetail, setwithdrawDetail] = useState('')

    const [currentPassword, setCurrentPassword] = useState('');
    const [search, setSearch] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRe_password] = useState('');
    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handleSetSearch = (e) => setSearch(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRePasswordChange = (e) => setRe_password(e.target.value);

    const [newPrice, setNewPrice] = useState();
    const [newTime, setnewTime] = useState();
    const handleNewPrice = (e) => setNewPrice(e.target.value);
    const handleNewTime = (e) => setnewTime(e.target.value);

    const [volume, setVolume] = useState('');
    const handleVolume = (e) => setVolume(e.target.value);

    const [status, setStatus] = useState(null);

    const handleStatus = (option) => {
        setStatus(option);
    }

    const [showMessage, setShowMessage] = useState(false);
    const handleTicketText = (e) => setticketText(e.target.value);

    const [withdrawText, setWithdrawText] = useState("");
    const handleWithdrawText = (e) => setWithdrawText(e.target.value);

    const [withdrawAnswer, setWithdrawAnswer] = useState(null);
    const handleWithdrawAnswer = (option) => setWithdrawAnswer(option);


    const [currencyAmount, setCurrencyAmount] = useState("");
    const handleCurrencyAmount = (e) => setCurrencyAmount(e.target.value);

    const [currency, setCurrency] = useState(null);
    const handleCurrency = (option) => setCurrency(option);

    const dispatch = useDispatch();

    const members = useSelector((state) => state.user.members)
    const tickets = useSelector((state) => state.user.tickets)
    const withdraws = useSelector((state) => state.user.withdrawsList)
    const chartNumbers = useSelector((state) => state.user.chartData)
    const temporaryChartNumbers = useSelector((state) => state.user.temporaryChartData)
    const memberDetail = useSelector((state) => state.user.userDetail)
    const allDepoits = useSelector((state) => state.user.allDepoits)
    const SellAndBuy = useSelector((state) => state.user.SellAndBuyAdmin)
    const requestDeposit = useSelector((state) => state.user.depostiRequest)

    const options = [
        { value: 1, label: 'Super User' },
        { value: 3, label: 'Verify' },
        { value: 4, label: 'Ban' }
    ];

    const options1 = [
        { value: 2, label: 'Accept' },
        { value: 3, label: 'Reject' },
    ];

    const options2 = [
        { value: "usdt", label: 'Tether(USDT)' },
        { value: "token", label: 'Token(4X)' },
    ];

    useEffect(() => {

        if (activeButton === "Chart") {

            const intervalId = setInterval(() => {
                dispatch(ChartData());
            }, 300000);

            return () => clearInterval(intervalId);
        }
    }, [activeButton,dispatch]);

    useEffect(() => {

        if (!temporaryChartNumbers) {
            dispatch(temporaryChartData());
            return;
        }

    }, [dispatch,temporaryChartNumbers]);

    useEffect(() => {

        if (!chartNumbers) {
            dispatch(ChartData());
            return;
        }

    }, [dispatch,chartNumbers]);

    useEffect(() => {

        if (!allDepoits) {
            dispatch(allDepositUsers());
            return;
        }

    }, [dispatch,allDepoits]);

    useEffect(() => {

        if (!SellAndBuy) {
            dispatch(GetSellAndBuyAdmin());
            return;
        }

    }, [dispatch,SellAndBuy]);

    useEffect(() => {

        if (!requestDeposit) {
            dispatch(DepositRequests());
            return;
        }

    }, [dispatch,requestDeposit]);

    useEffect(() => {
        if (!members) {
            dispatch(AdminUserList());
        }
    }, [dispatch,members]);


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

    if (!members) {
        return <LoadingPage />;
    }

    const Message = () => {
        return <Popup type="ok" reload={true} text="Your action was successfully registered" />
    }

    let usertime = new Date();

    const userLastUpdate = usertime.toDateString() + " , " + usertime.getHours() + ":" + usertime.getMinutes();

    const handleSubmit = (type, index) => {

        if (type === "password") {

            if (password !== "" && re_password !== "") {

                if (password === re_password) {

                    dispatch(resetPassword({ new_password: password, re_new_password: re_password, current_password: currentPassword }))

                } else {

                    toast.error("password not match")
                }

            } else {

                toast.error("password is empty")

            }
        }
        else if (type === "TicketAnswer") {

            if (ticketDetail.ticket_status !== "Completed") {

                if (ticketText !== "") {

                    dispatch(AdminTicketAnswer({ ticket: ticketDetail.id, userType: "Admin", message: ticketText })).then((e) => {
                        if (e.type.includes("fulfilled")) {
                            toast.info("Message Send")
                        }
                    });

                } else {

                    toast.error("ticketAnswer is empty")

                }

            } else {

                toast.error("ticketAnswer is Allready Completed")

            }
        }
        else if (type === "TicketComplete") {

            if (ticketDetail.ticket_status !== "Completed") {

                dispatch(AdminTicketComplete({ id: ticketDetail.id })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setShowMessage(true)
                    }
                });

            } else {

                toast.error("ticketAnswer is Allready Completed")

            }
        }
        else if (type === "Search") {

            if (search !== "") {

                dispatch(AdminUserSearch({ search: search })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        toast.info("search is done")
                    }
                });

            } else {

                toast.error("search is empty")

            }
        }
        else if (type === "AddPrice") {

            if (newPrice !== null && newTime !== null) {

                dispatch(AddPriceData({ number: newPrice, run_at: newTime })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        toast.info("Action Creates Success")
                    }
                });

            } else {

                toast.error("Action Wrong")

            }
        }

        else if (type === "ChangeStatus") {

            if (status !== null && memberDetail !== null) {

                dispatch(changeStatusUser({ id: memberDetail.id, status: status })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setShowMessage(true)
                    }
                });

            } else {

                toast.error("ticketAnswer is Allready Completed")

            }
        }
        else if (type === "changeWithdraw") {

            if (withdrawAnswer !== null && withdrawText !== "") {


                dispatch(changeWithdrawAnswer({ answer: withdrawAnswer, text: withdrawText, id: withdrawDetail.id, user: withdrawDetail.user, tether: withdrawDetail.tether })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setShowMessage(true)
                    }
                });

            } else {

                toast.error("withdrawAnswer is Allready Completed")

            }
        }
        else if (type === "changeCurrency") {

            if (currency !== null && currencyAmount !== "") {

                dispatch(changeCurrnecy({ amount: currencyAmount, currency: currency, user: memberDetail.email })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setShowMessage(true)
                    } else if (e.type.includes("rejected")) {
                        toast.error("Your Amount or Currency is not valid")
                    }
                });

            } else {

                toast.error("changeCurrency is Allready Completed")

            }
        }
        else if (type === "ChangeVolume") {

            if (volume !== "null") {

                dispatch(ChangeVolume({ volume: volume })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setShowMessage(true)
                    } else if (e.type.includes("rejected")) {
                        toast.error("Your Volume is not valid")
                    }
                });

            } else {

                toast.error("Volume is Empty")

            }
        }
        else if (type === "AcceptDeposit") {

            dispatch(AcceptDeposit({ pk: index })).then((e) => {
                if (e.type.includes("fulfilled")) {
                    setShowMessage(true)
                } else if (e.type.includes("rejected")) {
                    toast.error("Server Error")
                }
            });
        }
        else if (type === "DisableDeposit") {

            dispatch(DisableDeposit({ pk: index })).then((e) => {
                if (e.type.includes("fulfilled")) {
                    setShowMessage(true)
                } else if (e.type.includes("rejected")) {
                    toast.error("Server Error")
                }
            });
        }
    };

    return (
        <div className="relative mb-[85px] md:mb-0 bg-white dark:bg-black grow min-h-screen">
            <div className={!showMessage ? "w-full h-full flex flex-row md:space-x-2 space-x-0 justify-center items-start" : "blur-md w-full h-full flex flex-row space-x-2 justify-center items-start"}>
                <div className="3xl:flex 2xl:flex xl:hidden md:hidden lg:hidden sm:hidden ph:hidden bg-softGray m-5 w-[220px] h-[778px] rounded-3xl flex-col justify-between pb-5 items-center">
                    <div className="w-full flex flex-col items-center ">
                        <div className="flex justify-center items-center w-full p-5" >
                            <Image src={Logo} alt="" width={200} height={200} priority={true} />
                        </div>
                        <Image src="/Line.png" className="pb-4" alt="" width={200} height={2} />
                        <div className="space-y-4 flex flex-col w-[85%] mr-16 ">
                            <button onClick={() => setActiveButton("Members")} className={activeButton === "Members" ? `pt-1 delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : `pt-1 delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <FaUserFriends color="white" size={20} />
                                <p className="text-white text-lg">Members</p>
                            </button>
                            <button onClick={() => setActiveButton("Members Info")} className={activeButton === "Members Info" ? `pt-1 delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : `pt-1 delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <FaUserCircle color="white" size={20} />
                                <p className="text-white text-lg">Members Info</p>
                            </button>
                            <button onClick={() => setActiveButton("Ticket")} className={activeButton === "Ticket" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <BiSupport color="white" size={20} />
                                <p className="text-white text-lg">Ticket</p>
                            </button>
                            <button onClick={() => setActiveButton("Chart")} className={activeButton === "Chart" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <LuCandlestickChart color="white" size={20} />
                                <p className="text-white text-lg">Chart</p>
                            </button>
                            <button onClick={() => { setActiveButton("All Deposits"); dispatch(allDepositUsers()) }} className={activeButton === "All Deposits" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <MdOutlinePayments color="white" size={20} />
                                <p className="text-white text-lg">All Deposits</p>
                            </button>
                            <button onClick={() => { setActiveButton("Deposit Req"); dispatch(DepositRequests()) }} className={activeButton === "Deposit Req" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <MdOutlinePayments color="white" size={20} />
                                <p className="text-white text-lg">Deposit Req</p>
                            </button>
                            <button onClick={() => setActiveButton("Withdraws")} className={activeButton === "Withdraws" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
                                <MdOutlinePayments color="white" size={20} />
                                <p className="text-white text-lg">Withdraws</p>
                            </button>
                            <button onClick={() => { setActiveButton("SellAndBuy"); dispatch(GetSellAndBuyAdmin()) }} className={activeButton === "SellAndBuy" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row pl-8 space-x-3 items-center`}>
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
                                <ImExit color="red" size={20} />
                                <p className="text-red text-lg">LogOut</p>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="3xl:hidden 2xl:hidden xl:flex md:flex lg:flex sm:flex ph:flex items-center justify-between">
                    <div className="bg-tradeRed/50 rounded-xl p-2 fixed top-3 left-3 z-50">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <CgMenuMotion size={35} color="white" /> : <BiMenu size={35} color="white" />}
                        </button>
                    </div>
                    {isOpen && (
                        <div className="fixed top-0 left-0 flex bg-softGray w-[220px] h-full flex-col justify-between items-center rounded-r-3xl">
                            <div className="w-full flex flex-col items-center ">
                                <div className="flex justify-center items-center w-full p-5" >
                                    <Image src={Logo} alt="" width={200} height={200} priority={true} />
                                </div>
                                <Image src="/Line.png" className="pb-4" alt="" width={200} height={2} />
                                <div className="space-y-4 flex flex-col w-[85%] ">
                                    <button onClick={() => setActiveButton("Members")} className={activeButton === "Members" ? `pt-1 delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : `pt-1 delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <FaUserFriends color="white" />
                                        <p className="text-white text-lg">Members</p>
                                    </button>
                                    <button onClick={() => setActiveButton("Members Info")} className={activeButton === "Members Info" ? `pt-1 delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : `pt-1 delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <FaUserCircle color="white" size={20} />
                                        <p className="text-white text-lg">Members Info</p>
                                    </button>
                                    <button onClick={() => setActiveButton("Ticket")} className={activeButton === "Ticket" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <BiSupport color="white" size={20} />
                                        <p className="text-white text-lg">Ticket</p>
                                    </button>
                                    <button onClick={() => setActiveButton("Chart")} className={activeButton === "Chart" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <LuCandlestickChart color="white" size={20} />
                                        <p className="text-white text-lg">Chart</p>
                                    </button>
                                    <button onClick={() => { setActiveButton("All Deposits"); dispatch(allDepositUsers()) }} className={activeButton === "All Deposits" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <MdOutlinePayments color="white" size={20} />
                                        <p className="text-white text-lg">All Deposits</p>
                                    </button>
                                    <button onClick={() => { setActiveButton("Deposit Req"); dispatch(DepositRequests()) }} className={activeButton === "Deposit Req" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <MdOutlinePayments color="white" size={20} />
                                        <p className="text-white text-lg">Deposit Req</p>
                                    </button>
                                    <button onClick={() => setActiveButton("Withdraws")} className={activeButton === "Withdraws" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
                                        <MdOutlinePayments color="white" size={20} />
                                        <p className="text-white text-lg">Withdraws</p>
                                    </button>
                                    <button onClick={() => { setActiveButton("SellAndBuy"); dispatch(GetSellAndBuyAdmin()) }} className={activeButton === "SellAndBuy" ? ` delay-150 duration-300 ease-in-out flex flex-row p-1 px-3 justify-start rounded-l-xl rounded-br-3xl rounded-tr-md space-x-3 items-center bg-tradeRed` : ` delay-150 duration-300 ease-in-out flex flex-row space-x-3 items-center`}>
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


                <div className="max-w-[1195px] w-full h-full pb-5 md:mb-10 mb-0 md:mt-5 mt-0 flex flex-col space-y-2 bg-back md:rounded-3xl rounded-none">
                    <div className="md:flex hidden flex-col md:flex-row md:space-y-0 space-y-5 p-1 md:p-5">
                        <div className="min-w-[218px] h-[72px] bg-white shadow-lg rounded-2xl justify-center md:justify-start items-center flex md:rounded-br-[90px] md:rounded-tr-md">
                            <div className="flex flex-row justify-start pl-4 pt-1 items-center space-x-4">
                                <FaUserCircle color="black" size={45} />
                                <div className="flex flex-col justify-center items-start">
                                    <p className="font-black text-background">Admin</p>
                                    <p className="text-lightgray font-medium text-background">4xExChange</p>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-[961px] w-full h-[72px] shadow-lg items-center bg-white rounded-2xl p-3 md:pl-10 md:pr-4 md:rounded-tl-[90px] md:rounded-bl-md flex flex-row justify-center md:justify-end">
                            <div className="flex flex-row space-x-1 md:space-x-5 items-center">
                                <button className="bg-back shadow-inner p-4 rounded-xl ">
                                    <Image src="/Vector12.png" alt="" width={20} height={20} />
                                </button>
                                <div className="bg-back shadow-inner px-3 py-3 rounded-xl flex flex-row justify-center items-center space-x-1">
                                    <p className="text-sm md:text-base font-bold text-background">Version</p>
                                    <p className="bg-tradeRed text-white rounded-xl px-2 py-1 text-xs md:text-sm font-bold">3.1.4</p>
                                </div>
                                <div className="bg-back shadow-inner px-4 py-2 rounded-xl flex flex-col justify-center items-center space-y-1">
                                    <div className="text-xs md:text-sm font-medium">
                                        <p className="hidden sm:flex text-background">Latest update:</p>
                                        <p className="font-bold py-2 sm:py-0 text-background">{userLastUpdate}</p>{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* ------------------------------------------------------------------------------------------------------------------- */}

                    {activeButton === "Members" && <div className="hidden md:flex m-5 bg-white rounded-3xl shadow-lg h-[650px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Info</p>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit("Search"); }} className="w-[400px] h-[32px] px-5 bg-back shadow-inner rounded-full flex flex-row justify-between items-center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-back w-full rounded-full pr-5 focus:border-back focus:outline-none"
                                    value={search}
                                    onChange={handleSetSearch}
                                />
                                <button type="submit" className="flex flex-row space-x-2 justify-center items-center">
                                    <p className="text-gray/40">|</p>
                                    <Image src="/Vector17.png" alt="" width={20} height={20} />
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-[50px] text-center">ID</p>
                            <p className="font-medium text-softBlue w-[180px] text-center">Username</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Date Joined</p>
                            <p className="font-medium text-softBlue w-[400px] text-center">Email</p>
                            <p className="font-medium text-softBlue w-[150px] text-center" >Status</p>
                            <p className="font-medium text-softBlue">Actions</p>
                        </div>
                        {members.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Members Is Empty</p>
                        </div> : <div className="overflow-y-scroll">
                            {members.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between items-center py-3">
                                        <p className="bg-back shadow-inner rounded py-1 w-[50px] text-center text-softBlue">{e.id}</p>
                                        <p className="bg-back shadow-inner rounded py-1 w-[180px] text-center text-softBlue">{e.username}</p>
                                        <p className="bg-back shadow-inner rounded py-1 w-[150px] text-center text-softBlue">{e.date_joined.split(":")[0]}</p>
                                        <p className="bg-back shadow-inner rounded py-1 w-[400px] text-center text-softBlue">{e.email}</p>
                                        <div className="w-[150px]">{(e.user_type === 3 && <div className="flex flex-row justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><FaCheckCircle color="white" /><p className="text-white font-bold">Verified</p></div>) || (e.user_type === 4 && <div className="flex flex-row justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><FaBan color="white" /><p className="text-white font-bold">Baned</p></div>) || (e.user_type === 1 && <div className="flex flex-row justify-center items-center space-x-1 bg-gridPurple rounded-md px-2 py-1"><MdAdminPanelSettings color="white" /><p className="text-white font-bold">Admin</p></div>) || (e.user_type === 2 && <div className="flex flex-row justify-center items-center space-x-1 bg-gray2 rounded-md px-2 py-1"><GiShieldDisabled color="white" /><p className="text-white font-bold">Not Verified</p></div>)}</div>
                                        <button onClick={() => { setActiveButton("Members Info"); dispatch(UserFullDetails({ id: e.id })) }} className="ml-3 text-center p-1 justify-center items-center flex bg-red rounded-md">
                                            <FaPen color="white" size={20} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {activeButton === "Members" && <div className="flex md:hidden m-2 bg-white rounded-3xl shadow-lg h-full flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Info</p>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit("Search"); }} className="w-[200px] h-[32px] px-5 bg-back shadow-inner rounded-full flex flex-row justify-between items-center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-back w-full rounded-full pr-5 focus:border-back focus:outline-none"
                                    value={search}
                                    onChange={handleSetSearch}
                                />
                                <button type="submit" className="flex flex-row space-x-2 justify-center items-center">
                                    <p className="text-gray/40">|</p>
                                    <Image src="/Vector17.png" alt="" width={20} height={20} />
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-row justify-around text-sm items-center py-3">
                            <p className="font-medium text-softBlue">ID</p>
                            <p className="font-medium text-softBlue">Username</p>
                            <p className="font-medium text-softBlue">Date Joined</p>
                            <p className="font-medium text-softBlue">Email</p>
                            <p className="font-medium text-softBlue" >Status</p>
                            <p className="font-medium text-softBlue">Actions</p>
                        </div>
                        {members.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Members Is Empty</p>
                        </div> : <div className="overflow-y-scroll divide-y-2 divide-tradeRed">
                            {members.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col justify-between px-5 items-center py-3">
                                        <p className="bg-back shadow-inner rounded py-1 w-full text-center text-softBlue">{e.id}</p>
                                        <p className="bg-back shadow-inner rounded py-1 w-full text-center text-softBlue">{e.username}</p>
                                        <p className="bg-back shadow-inner rounded py-1 w-full text-center text-softBlue">{e.date_joined.split(":")[0]}</p>
                                        <p className="bg-back shadow-inner rounded py-1 w-full text-center text-softBlue">{e.email}</p>
                                        <div className="my-2">{(e.user_type === 3 && <div className="flex flex-row justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><FaCheckCircle color="white" /><p className="text-white font-bold">Verified</p></div>) || (e.user_type === 4 && <div className="flex flex-row justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><FaBan color="white" /><p className="text-white font-bold">Baned</p></div>) || (e.user_type === 1 && <div className="flex flex-row justify-center items-center space-x-1 bg-gridPurple rounded-md px-2 py-1"><MdAdminPanelSettings color="white" /><p className="text-white font-bold">Admin</p></div>) || (e.user_type === 2 && <div className="flex flex-row justify-center items-center space-x-1 bg-gray2 rounded-md px-2 py-1"><GiShieldDisabled color="white" /><p className="text-white font-bold">Not Verified</p></div>)}</div>
                                        <button onClick={() => { setActiveButton("Members Info"); dispatch(UserFullDetails({ id: e.id })) }} className="p-1 justify-center items-center flex bg-red rounded-md">
                                            <FaPen color="white" size={20} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}


                    {/* ------------------------------------------------------------------------------------------------------------------- */}



                    {activeButton === "Members Info" && <div className="hidden md:flex m-5 bg-white rounded-3xl shadow-lg h-full flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Info</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-[50px] text-center">ID</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Username</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Date Joined</p>
                            <p className="font-medium text-softBlue w-[300px] text-center">Email</p>
                            <p className="font-medium text-softBlue w-[100px] text-center" >Status</p>
                            <p className="font-medium text-softBlue w-[60px] text-center">Actions</p>
                        </div>
                        {!memberDetail || memberDetail.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Members Info Is Empty</p>
                        </div> : <div className="">
                            <div className="flex flex-row justify-between items-center py-3">
                                <p className="bg-back shadow-inner rounded py-1 w-[50px] text-center text-softBlue">{memberDetail.id}</p>
                                <p className="bg-back shadow-inner rounded py-1 w-[150px] text-center text-softBlue">{memberDetail.username}</p>
                                <p className="bg-back shadow-inner rounded py-1 w-[150px] text-center text-softBlue">{memberDetail.date_joined}</p>
                                <p className="bg-back shadow-inner rounded py-1 w-[300px] text-center text-softBlue">{memberDetail.email}</p>
                                <div className="w-[100px]">{(memberDetail.user_type === 3 && <div className="flex flex-row justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><FaCheckCircle color="white" /><p className="text-white font-bold">Verified</p></div>) || (memberDetail.user_type === 4 && <div className="flex flex-row justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><FaBan color="white" /><p className="text-white font-bold">Baned</p></div>) || (memberDetail.user_type === 1 && <div className="flex flex-row justify-center items-center space-x-1 bg-gridPurple rounded-md px-2 py-1"><MdAdminPanelSettings color="white" /><p className="text-white font-bold">Admin</p></div>) || (memberDetail.user_type === 2 && <div className="flex flex-row justify-center items-center space-x-1 bg-gray2 rounded-md px-2 py-1"><GiShieldDisabled color="white" /><p className="text-white font-bold">Not Verified</p></div>)}</div>
                                <button onClick={() => setChange("ChangeStatus")} className="p-1 ml-3 justify-center w-[60px] items-center flex bg-red rounded-md">
                                    <FaPen color="white" size={20} />
                                </button>
                            </div>
                        </div>}
                    </div>}
                    {activeButton === "Members Info" && <div className="flex md:hidden m-2 bg-white rounded-3xl shadow-lg h-full flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Info</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around text-sm items-center py-3">
                            <p className="font-medium text-softBlue text-center">ID</p>
                            <p className="font-medium text-softBlue text-center">Username</p>
                            <p className="font-medium text-softBlue text-center">Date Joined</p>
                            <p className="font-medium text-softBlue text-center">Email</p>
                            <p className="font-medium text-softBlue text-center" >Status</p>
                            <p className="font-medium text-softBlue text-center">Actions</p>
                        </div>
                        {!memberDetail || memberDetail.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Members Info Is Empty</p>
                        </div> : <div className="">
                            <div className="flex flex-col justify-between py-3 space-y-3 items-center">
                                <p className="bg-back shadow-inner rounded py-1 w-[300px] text-center text-softBlue">{memberDetail.id}</p>
                                <p className="bg-back shadow-inner rounded py-1 w-[300px] text-center text-softBlue">{memberDetail.username}</p>
                                <p className="bg-back shadow-inner rounded py-1 w-[300px] text-center text-softBlue">{memberDetail.date_joined}</p>
                                <p className="bg-back shadow-inner rounded py-1 w-[300px] text-center text-softBlue">{memberDetail.email}</p>
                                <div className="w-[150px]">{(memberDetail.user_type === 3 && <div className="flex flex-row justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><FaCheckCircle color="white" /><p className="text-white font-bold">Verified</p></div>) || (memberDetail.user_type === 4 && <div className="flex flex-row justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><FaBan color="white" /><p className="text-white font-bold">Baned</p></div>) || (memberDetail.user_type === 1 && <div className="flex flex-row justify-center items-center space-x-1 bg-gridPurple rounded-md px-2 py-1"><MdAdminPanelSettings color="white" /><p className="text-white font-bold">Admin</p></div>) || (memberDetail.user_type === 2 && <div className="flex flex-row justify-center items-center space-x-1 bg-gray2 rounded-md px-2 py-1"><GiShieldDisabled color="white" /><p className="text-white font-bold">Not Verified</p></div>)}</div>
                                <button onClick={() => setChange("ChangeStatus")} className="p-1 justify-center w-[60px] items-center flex bg-tradeRed rounded-md">
                                    <FaPen color="white" size={20} />
                                </button>
                            </div>
                        </div>}
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Members Info" && <div className="hidden md:flex m-5 bg-white rounded-3xl shadow-lg h-full flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Currency </p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between px-5 items-center py-3">
                            <p className="font-medium text-softBlue w-[60px] text-center">Logo</p>
                            <p className="font-medium text-softBlue w-[180px] text-center">Name</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Amount</p>
                            <p className="font-medium text-softBlue w-[60px]">Actions</p>
                        </div>
                        {!memberDetail || memberDetail.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Members Info Is Empty</p>
                        </div> : <div className="">
                            <div className="flex flex-row justify-between px-5 items-center py-3">
                                <div className="rounded py-1 w-[60px] flex justify-center items-center">< SiTether size={50} color="green" /></div>
                                <p className="bg-back font-bold text-lg rounded py-1 w-[180px] text-center text-softBlue">Tether (USDT)</p>
                                <p className="bg-back font-bold text-xl rounded py-1 w-[150px] text-center text-softBlue">{memberDetail.usdt}</p>
                                <button onClick={() => setChange("changeUserValue")} className="p-2 justify-center w-[60px] items-center flex bg-purple rounded-md">
                                    <FaPen color="white" size={20} />
                                </button>
                            </div>
                        </div>}
                        {!memberDetail || memberDetail.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Members Info Is Empty</p>
                        </div> : <div className="">
                            <div className="flex flex-row justify-between px-5 items-center py-3">
                                <div className="w-[60px] py-2 rounded-xl text-white">
                                    <Image src={coin} alt="" width={60} />
                                </div>
                                <p className="bg-back font-bold text-lg rounded py-1 w-[180px] text-center text-softBlue">Token (4X)</p>
                                <p className="bg-back font-bold text-xl rounded py-1 w-[150px] text-center text-softBlue">{memberDetail.token}</p>
                                <button onClick={() => setChange("changeUserValue")} className="p-2 justify-center w-[60px] items-center flex bg-purple rounded-md">
                                    <FaPen color="white" size={20} />
                                </button>
                            </div>
                        </div>}
                    </div>}



                    {activeButton === "Members Info" && <div className="flex md:hidden m-2 bg-white rounded-3xl shadow-lg h-full flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Currency </p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center py-3">
                            <p className="font-medium text-softBlue w-[50px] text-center">Logo</p>
                            <p className="font-medium text-softBlue w-[180px] text-center">Name</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Amount</p>
                            <p className="font-medium text-softBlue">Actions</p>
                        </div>
                        {!memberDetail || memberDetail.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Members Info Is Empty</p>
                        </div> : <div className="">
                            <div className="flex flex-col justify-between items-center space-y-2 py-3">
                                <div className="bg-back rounded py-1 w-[50px] flex justify-center items-center">< SiTether size={50} color="green" /></div>
                                <p className="bg-back font-bold shadow-inner text-lg rounded py-1 w-[300px] text-center text-softBlue">Tether (USDT)</p>
                                <p className="bg-back font-bold shadow-inner text-xl rounded py-1 w-[300px] text-center text-softBlue">{memberDetail.usdt}</p>
                                <button onClick={() => setChange("changeUserValue")} className="p-2 justify-center items-center flex bg-tradeRed rounded-md">
                                    <FaPen color="white" size={20} />
                                </button>
                            </div>
                        </div>}
                        {!memberDetail || memberDetail.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Members Info Is Empty</p>
                        </div> : <div className="">
                            <div className="flex flex-col justify-between items-center space-y-2 py-3">
                                <div className="w-[60px] py-2 rounded-xl text-white">
                                    <Image src={coin} alt="" width={60} height={60} />
                                </div>
                                <p className="bg-back font-bold shadow-inner text-lg rounded py-1 w-[300px] text-center text-softBlue">Token (4X)</p>
                                <p className="bg-back font-bold shadow-inner text-xl rounded py-1 w-[300px] text-center text-softBlue">{memberDetail.token}</p>
                                <button onClick={() => setChange("changeUserValue")} className="p-2 justify-center items-center flex bg-tradeRed rounded-md">
                                    <FaPen color="white" size={20} />
                                </button>
                            </div>
                        </div>}
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Members Info" && change === "changeUserValue" && <form onSubmit={(e) => { handleSubmit("changeCurrency"); e.preventDefault(); }} className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Change Currency</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 justify-start items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Currency</p>
                            <Select
                                className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2"
                                value={currency}
                                onChange={handleCurrency}
                                options={options2}
                            />
                        </div>
                        <div className="flex flex-row space-x-4 justify-start items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Currency Amount</p>
                            <input
                                maxLength={30}
                                required
                                type="number"
                                placeholder="Currency Amount"
                                value={currencyAmount}
                                onChange={handleCurrencyAmount}
                                className="w-[150px] md:w-72 p-2 rounded-lg text-black font-bold bg-back shadow-Green shadow-inner"
                            />
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form>}



                    {change === "ChangeStatus" && activeButton === "Members Info" && <form onSubmit={(e) => { handleSubmit("ChangeStatus"); e.preventDefault(); }} className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">{change}</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 justify-center items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Status</p>
                            <Select
                                className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2"
                                value={status}
                                onChange={handleStatus}
                                options={options}
                            />
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Members Info" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex h-[350px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Token Buy</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between text-sm md:text-base items-center py-3 pr-0 md:pr-3">
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">Tether</p>
                            <p className="font-medium text-softBlue w-fit md:w-[170px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">Token Recive</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Token Price</p>
                        </div>
                        {!memberDetail || memberDetail.user_buy.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Buyers Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeRed md:divide-y-0">
                            {memberDetail.user_buy.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between py-3 font-bold mt-1 items-center">
                                        <p className="text-tradeGreen w-[200px] text-center">{e.tether}</p>
                                        <p className="text-tradeGreen w-[170px] text-center">{e.time}</p>
                                        <p className="text-tradeGreen w-[200px] text-center">{e.tokenRecive}</p>
                                        <p className="text-tradeGreen w-[150px] text-center">{e.tokenPrice}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "Members Info" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex h-[350px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Token Sell</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between text-sm md:text-base items-center py-3 pr-0 md:pr-3">
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">Tether Recive</p>
                            <p className="font-medium text-softBlue w-fit md:w-[170px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">Token</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Token Price</p>
                        </div>
                        {!memberDetail || memberDetail.user_sell.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Sellers Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeGreen md:divide-y-0">
                            {memberDetail.user_sell.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between py-3 font-bold mt-1 items-center">
                                        <p className="text-tradeRed w-[200px] text-center">{e.tetherRecive}</p>
                                        <p className="text-tradeRed w-[170px] text-center">{e.time}</p>
                                        <p className="text-tradeRed w-[200px] text-center">{e.token}</p>
                                        <p className="text-tradeRed w-[150px] text-center">{e.tokenPrice}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Members Info" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex  h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Deposit Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center text-sm md:text-base py-3">
                            <p className="font-medium text-softBlue w-fit md:w-[120px] text-center">Type</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Tether Deposit</p>
                            <p className="font-medium text-softBlue w-fit md:w-[400px] text-center">Wallet</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Time</p>
                        </div>
                        {!memberDetail || memberDetail.user_deposits.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Payments Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeRed md:divide-y-0">
                            {memberDetail.user_deposits.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 py-3 mt-1 items-center">
                                        <p className="text-gray w-full md:w-[120px] text-center">{e.crypto_type}</p>
                                        <p className="text-gray w-full md:w-[150px] text-center">{e.tether}</p>
                                        <p className="text-gray w-full md:w-[400px] text-xs md:text-base text-center">{e.wallet}</p>
                                        <p className="text-gray w-full md:w-[150px] text-center">{e.time}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "Members Info" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex  h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Withdraw Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around text-sm md:text-base items-center py-3">
                            <p className="font-medium text-softBlue w-fit md:w-[80px] text-center">Tether</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-fit md:w-[400px] text-center">Wallet</p>
                            <p className="font-medium text-softBlue w-fit md:w-[300px] text-center">Text</p>
                            <p className="font-medium text-softBlue w-fit md:w-[100px] text-center">Status</p>
                        </div>
                        {!memberDetail || memberDetail.user_withdraw.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Payments Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeGreen md:divide-y-0">
                            {memberDetail.user_withdraw.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 py-3 mt-1 items-center">
                                        <p className="text-gray w-full md:w-[80px] text-center">{e.tether}</p>
                                        <p className="text-gray w-full md:w-[150px] text-center">{e.time}</p>
                                        <p className="text-gray w-full md:w-[400px] text-center">{e.wallet}</p>
                                        <p className="text-gray w-full md:w-[300px] text-center">{e.text}</p>
                                        <div className="w-[100px]">{(e.status === 1 && <div className="flex justify-center items-center space-x-1 bg-blue rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                            (e.status === 3 && <div className="flex justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><p className="text-white font-bold">Reject</p></div>)
                                            || (e.status === 2 && <div className="flex justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><p className="text-white font-bold">Accept</p></div>)}</div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Members Info" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">User Tickets</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Title</p>
                            <p className="font-medium text-softBlue w-fit md:w-[300px] text-center">Description</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Status</p>
                            <p className="font-medium text-softBlue w-fit md:w-[50px] text-center">Actions</p>
                        </div>
                        {!memberDetail || memberDetail.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Ticket Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-tradeGreen md:divide-y-0">
                            {memberDetail.user_tickets.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between py-3 space-y-2 md:space-y-0 mt-1 items-center">
                                        <p className="text-gray w-full md:w-[150px] text-center">{e.title.substring(0, 15)}</p>
                                        <p className="text-gray w-full md:w-[300px] text-center">{e.description.substring(0, 30)}</p>
                                        <p className="text-gray w-full md:w-[150px] text-center">{e.date_created.split(":")[0].substring(0, 10)}</p>
                                        <div className="w-[150px]">{(e.ticket_status === "Pending" && <div className="flex justify-center items-center space-x-1 bg-yellow rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                            (e.ticket_status === "Completed" && <div className="flex justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><p className="text-white font-bold">Completed</p></div>)
                                            || (e.ticket_status === "Active" && <div className="flex justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><p className="text-white font-bold">Active</p></div>)}</div>
                                        <div className="w-[50px] flex justify-center items-center">
                                            <button onClick={() => { setActiveButton("Ticket"); setTicketDetail(e) }} className="p-1 justify-center items-center flex bg-red rounded-md">
                                                <FaPen color="white" size={15} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Ticket" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Ticket</p>
                            </div>
                        </div>
                        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 pt-5">
                            <button onClick={() => { setChange("All Tickets"); dispatch(AdminTicketList({ type: "All" })) }} className="px-4 py-2 bg-down rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <GiTicket size={20} color="white" />
                                <p className="text-white text-sm md:text-base">All Tickets</p>
                            </button>
                            <button onClick={() => { setChange("Active Tickets"); dispatch(AdminTicketList({ type: "Active" })) }} className="px-4 py-2 bg-active rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <FaCheckCircle size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Active Tickets</p>
                            </button>
                            <button onClick={() => { setChange("Completed Tickets"); dispatch(AdminTicketList({ type: "Completed" })) }} className="px-4 py-2 bg-red rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <FaEnvelopeCircleCheck size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Completed Tickets</p>
                            </button>
                            <button onClick={() => { setChange("Pending Tickets"); dispatch(AdminTicketList({ type: "Pending" })) }} className="px-4 py-2 bg-lightBlue rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <TbTruckLoading size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Pending Tickets</p>
                            </button>
                        </div>
                    </div>}
                    {activeButton === "Ticket" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex md:h-96 h-[550px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Ticket</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-[150px] text-center">Title</p>
                            <p className="font-medium text-softBlue w-[300px] text-center">User</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Status</p>
                            <p className="font-medium text-softBlue w-[100px] text-center">Actions</p>
                        </div>
                        {!tickets || tickets.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Ticket Box Is Empty</p>
                        </div> : <div className="overflow-y-scroll divide-y-2 divide-yellow md:divide-y-0">
                            {tickets.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between py-3 space-y-2 md:space-y-0 mt-1 items-center">
                                        <p className="text-gray bg-back shadow-inner w-full md:w-[150px] text-center">{e.title.substring(0, 15)}</p>
                                        <p className="text-gray bg-back shadow-inner w-full md:w-[300px] text-center">{e.email}</p>
                                        <p className="text-gray bg-back shadow-inner w-full md:w-[150px] text-center">{e.date_created.split(":")[0].substring(0, 10)}</p>
                                        <div className="w-[150px]">{(e.ticket_status === "Pending" && <div className="flex justify-center items-center space-x-1 bg-blue rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                            (e.ticket_status === "Completed" && <div className="flex justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><p className="text-white font-bold">Completed</p></div>)
                                            || (e.ticket_status === "Active" && <div className="flex justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><p className="text-white font-bold">Active</p></div>)}</div>
                                        <div className="w-[100px] flex justify-center items-center">
                                            <button onClick={() => setTicketDetail(e)} className="p-2 justify-center w-[60px] items-center flex bg-red rounded-md">
                                                <FaPen color="white" size={15} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "Ticket" && ticketDetail !== "" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex h-[700px] flex-col justify-between divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-col h-full space-y-3">
                            <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 items-center pb-3 w-full">
                                <div className="flex flex-row space-x-2 justify-center items-center">
                                    <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                    <p className="font-bold text-softBlue">TicketAnswer</p>
                                </div>
                                <div className="bg-back shadow-inner w-full md:w-fit md:shadow-none md:bg-white">
                                    <p className="font-bold text-softBlue">
                                        Title : {ticketDetail.title}
                                    </p>
                                </div>
                                <div className="bg-back shadow-inner w-full md:w-fit md:shadow-none md:bg-white">
                                    <p className="font-bold text-softBlue">
                                        Ticket Stuts : {ticketDetail.ticket_status}
                                    </p>
                                </div>
                                <button onClick={(e) => { e.preventDefault(); handleSubmit("TicketComplete"); }} className="px-4 py-2 bg-purple text-white font-bold rounded-lg">
                                    Complete Ticket And Close
                                </button>
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
                                                e.userType === "Admin" ?
                                                    <div className="flex flex-row font-bold justify-start items-center space-x-2">
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
                                    className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-red/40 shadow-inner"
                                />
                                <button type="submit" className="px-4 py-2 bg-red text-white font-bold rounded-lg">Send</button>
                            </form> : <div className="text-center w-full p-2 rounded-lg bg-back shadow-purple text-purple font-bold shadow-inner">Text Not Allow When Ticket is Completed</div>}
                        </div>
                    </div>}


                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Chart" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Chart</p>
                            </div>
                        </div>
                        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 pt-5">
                            <button onClick={() => { setChange("Real Chart"); dispatch(ChartData()) }} className="px-4 py-2 bg-down rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <GiTicket size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Real Chart</p>
                            </button>
                            <button onClick={() => { setChange("Temporary Chart"); dispatch(ChartData()) }} className="px-4 py-2 bg-active rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <FaCheckCircle size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Temporary Chart</p>
                            </button>
                            <button onClick={() => setChange("Add Price")} className="px-4 py-2 bg-red rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <FaEnvelopeCircleCheck size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Add Price</p>
                            </button>
                            <button onClick={() => setChange("Change Volume")} className="px-4 py-2 bg-blue rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <Ri24HoursLine size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Change Volume</p>
                            </button>
                        </div>
                    </div>}


                    {activeButton === "Chart" && change === "Real Chart" && <div on className="md:m-5 bg-white rounded-3xl shadow-lg flex  h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Chart</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-[80px] text-center">Name</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Value</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-[180px] text-center">Status</p>
                        </div>
                        {!chartNumbers || chartNumbers.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">chartNumbers Box Is Empty</p>
                        </div> : <div className="overflow-y-scroll divide-y-2 divide-tradeRed md:divide-y-0">
                            {chartNumbers.slice(-50).reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 py-3 mt-1 items-center">
                                        <p className="text-gray w-full md:w-[80px] text-center font-bold">4x Token</p>
                                        <p className="text-gray w-full md:w-[150px] text-center font-bold">{e.value}</p>
                                        <p className="text-gray w-full md:w-[150px] text-center font-bold">{e.time}</p>
                                        <div className="px-1 py-2 bg-down rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                            <FaCheckCircle size={20} color="white" />
                                            <p className="text-white text-base md:text-sm">Successful Chenged</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "Chart" && change === "Temporary Chart" && <div on className="md:m-5 bg-white rounded-3xl shadow-lg flex  h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Chart Temporary</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-[80px] text-center">Name</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Value</p>
                            <p className="font-medium text-softBlue w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-[180px] text-center">Status</p>
                        </div>
                        {!temporaryChartNumbers || temporaryChartNumbers.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">chartTemporary Box Is Empty</p>
                        </div> : <div className="overflow-y-scroll divide-y-2 divide-tradeRed md:divide-y-0">
                            {temporaryChartNumbers.slice(-50).reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 py-3 mt-1 items-center">
                                        <p className="text-gray w-full md:w-[80px] text-center font-bold">4x Token</p>
                                        <p className="text-gray w-full md:w-[150px] text-center font-bold">{e.number}</p>
                                        <p className="text-gray w-full md:w-[150px] text-center font-bold">{e.run_at}</p>
                                        <div className="px-1 py-2 bg-active rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                            <FaCheckCircle size={20} color="white" />
                                            <p className="text-white text-base md:text-sm">Successful Chenged</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}



                    {activeButton === "Chart" && change === "Add Price" && <form onSubmit={(e) => { e.preventDefault(); handleSubmit("AddPrice"); }} className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">{change}</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 justify-around items-center py-5">
                            <p className="hidden md:flex shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the New Price</p>
                            <p className="flex md:hidden shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Price</p>
                            <input
                                required
                                step="any"
                                type="number"
                                placeholder="number"
                                value={newPrice}
                                onChange={handleNewPrice}
                                className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner"
                            />
                        </div>
                        <div className="flex flex-row space-x-4 justify-around items-center py-5">
                            <p className="hidden md:flex shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Time (UTC)</p>
                            <p className="flex md:hidden shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Time(UTC)</p>

                            <input
                                required
                                type="datetime-local"
                                value={newTime}
                                onChange={handleNewTime}
                                className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-inner"
                            />
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form>}


                    {activeButton === "Chart" && change === "Change Volume" && <form onSubmit={(e) => { e.preventDefault(); handleSubmit("ChangeVolume"); }} className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">{change}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 md:space-y-0 space-y-3 justify-around items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-full md:w-96 p-2">Enter the New Volume 24 Hour</p>
                            <input
                                maxLength="100"
                                required
                                min={1}
                                type="number"
                                placeholder="number"
                                value={volume}
                                onChange={handleVolume}
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


                    {activeButton === "All Deposits" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex h-[650px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Deposit Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center text-sm md:text-base py-3">
                            <p className="font-medium text-softBlue w-fit md:w-[250px] text-center">User</p>
                            <p className="font-medium text-softBlue w-fit md:w-[120px] text-center">Type</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Deposit</p>
                            <p className="font-medium text-softBlue w-fit md:w-[400px] text-center">Wallet</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Time</p>
                        </div>
                        {!allDepoits || allDepoits.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Payments Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-yellow md:divide-y-0">
                            {allDepoits.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 py-3 mt-1 items-center">
                                        <p className="text-gray w-full md:w-[250px] text-center">{e.user_email}</p>
                                        <p className="text-gray w-full md:w-[120px] text-center">{e.crypto_type}</p>
                                        <p className="text-gray w-full md:w-[150px] text-center">{e.tether}</p>
                                        <p className="text-gray w-full md:w-[400px] text-xs md:text-base text-center">{e.wallet}</p>
                                        <p className="text-gray w-full md:w-[150px] text-center">{e.time}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}

                    {activeButton === "Deposit Req" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex h-[650px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Deposit Req</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center text-sm md:text-base py-3">
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">User</p>
                            <p className="font-medium text-softBlue w-fit md:w-[100px] text-center">Type</p>
                            <p className="font-medium text-softBlue w-fit md:w-[100px] text-center">Deposit</p>
                            <p className="font-medium text-softBlue w-fit md:w-[350px] text-center">Wallet</p>
                            <p className="font-medium text-softBlue w-fit md:w-[100px] text-center">Start</p>
                            <p className="font-medium text-softBlue w-fit md:w-[100px] text-center">Finish</p>
                            <p className="font-medium text-softBlue w-fit md:w-[50px] text-center">Action</p>
                        </div>
                        {!requestDeposit || requestDeposit.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Payments Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-yellow md:divide-y-0">
                            {requestDeposit.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 py-3 mt-1 items-center">
                                        <p className="text-gray text-base md:text-xs w-full md:w-[200px] text-center">{e.user_email}</p>
                                        <p className="text-tradeGreen text-base md:text-xs w-full md:w-[100px] text-center">{e.crypto_type}</p>
                                        <p className="text-gray text-base md:text-xs w-full md:w-[100px] text-center">{e.tether}</p>
                                        <p className="text-gray text-xs w-full md:w-[350px] text-center">{e.wallet}</p>
                                        <p className="text-gray text-base md:text-xs w-full md:w-[100px] text-center">{e.run_at}</p>
                                        <p className="text-gray text-base md:text-xs w-full md:w-[100px] text-center">{e.expiration_at}</p>
                                        <div className="text-gray text-base md:text-xs w-[50px] justify-between text-center flex flex-row">
                                            <button onClick={(index) => { index.preventDefault(); handleSubmit("DisableDeposit", e.pk); }}><IoMdCloseCircle size={22} color="red" /></button>
                                            <button onClick={(index) => { index.preventDefault(); handleSubmit("AcceptDeposit", e.pk); }}><FaRegCircleCheck size={20} color="green" /></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "Withdraws" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Withdraws</p>
                            </div>
                        </div>
                        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 pt-5">
                            <button onClick={() => { setChange("All Withdraws"); dispatch(AdminWithdraws({ type: "All" })) }} className="px-4 py-2 bg-down rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <GiTicket size={20} color="white" />
                                <p className="text-white text-sm md:text-base">All Withdraws</p>
                            </button>
                            <button onClick={() => { setChange("Accept Withdraws"); dispatch(AdminWithdraws({ type: 2 })) }} className="px-4 py-2 bg-tradeGreen rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <FaCheckCircle size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Accept Withdraws</p>
                            </button>
                            <button onClick={() => { setChange("Reject Withdraws"); dispatch(AdminWithdraws({ type: 3 })) }} className="px-4 py-2 bg-tradeRed rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <FaEnvelopeCircleCheck size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Reject Withdraws</p>
                            </button>
                            <button onClick={() => { setChange("Pending Withdraws"); dispatch(AdminWithdraws({ type: 1 })) }} className="px-4 py-2 bg-lightBlue rounded-xl flex flex-row space-x-2 justify-center items-center shadow-md font-bold shadow-background">
                                <TbTruckLoading size={20} color="white" />
                                <p className="text-white text-sm md:text-base">Pending Withdraws</p>
                            </button>
                        </div>
                    </div>}
                    {activeButton === "Withdraws" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex  h-96 flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">withdraws</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3">
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">User</p>
                            <p className="font-medium text-softBlue w-fit md:w-[80px] text-center">Tether</p>
                            <p className="font-medium text-softBlue w-fit md:w-[100px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-fit md:w-[300px] text-center">Wallet</p>
                            <p className="font-medium text-softBlue w-fit md:w-[80px] text-center">Status</p>
                            <p className="font-medium text-softBlue w-fit md:w-[50px] text-center">Actions</p>
                        </div>
                        {!withdraws || withdraws.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Ticket Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-yellow md:divide-y-0">
                            {withdraws.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 py-3 mt-1 items-center">
                                        <p className="text-gray w-full md:w-[200px] text-xs text-center">{e.user}</p>
                                        <p className="text-gray w-full md:w-[80px]  text-center">{e.tether}</p>
                                        <p className="text-gray w-full md:w-[100px] text-xs text-center">{e.time}</p>
                                        <p className="text-gray w-full md:w-[300px] text-xs text-center">{e.wallet}</p>
                                        <div className="w-[80px]">{(e.status === 1 && <div className="flex justify-center items-center space-x-1 bg-blue rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                            (e.status === 3 && <div className="flex justify-center items-center space-x-1 bg-tradeRed rounded-md px-2 py-1"><p className="text-white font-bold">Reject</p></div>)
                                            || (e.status === 2 && <div className="flex justify-center items-center space-x-1 bg-tradeGreen rounded-md px-2 py-1"><p className="text-white font-bold">Accept</p></div>)}</div>
                                        <div className="w-[50px] flex justify-center items-center">
                                            <button onClick={() => setwithdrawDetail(e)} className="p-1 justify-center items-center flex bg-tradeRed rounded-md">
                                                <FaPen color="white" size={15} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                    {activeButton === "Withdraws" && withdrawDetail !== "" && withdrawDetail.status === 1 ? <form onSubmit={(e) => { handleSubmit("changeWithdraw"); e.preventDefault(); }} className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Withdraws Answer</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 justify-start items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Answer</p>
                            <Select
                                className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2"
                                value={withdrawAnswer}
                                onChange={handleWithdrawAnswer}
                                options={options1}
                            />
                        </div>
                        <div className="flex flex-row space-x-4 justify-center items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">Enter the Answer Text</p>
                            <input
                                maxLength={30}
                                required
                                type="text"
                                placeholder="Answer of Withdraw"
                                value={withdrawText}
                                onChange={handleWithdrawText}
                                className="w-full p-2 rounded-lg text-black font-bold bg-back shadow-Green shadow-inner"
                            />
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <button type="submit" className="text-white bg-red font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                Submit
                            </button>
                        </div>
                    </form> : activeButton === "Withdraws" && withdrawDetail !== "" && <div className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Withdraws Answer</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 justify-start items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">the Answer</p>
                            <div className="w-[100px]">{(withdrawDetail.status === 1 && <div className="flex justify-center items-center space-x-1 bg-blue rounded-md px-2 py-1"><p className="text-white font-bold">Pending</p></div>) ||
                                (withdrawDetail.status === 3 && <div className="flex justify-center items-center space-x-1 bg-red rounded-md px-2 py-1"><p className="text-white font-bold">Reject</p></div>)
                                || (withdrawDetail.status === 2 && <div className="flex justify-center items-center space-x-1 bg-Green rounded-md px-2 py-1"><p className="text-white font-bold">Accept</p></div>)}</div>
                        </div>
                        <div className="flex flex-row space-x-4 justify-start items-center py-5">
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2">the Answer Text</p>
                            <p className="shadow-inner rounded-lg text-softBlue font-bold bg-back w-72 p-2 shadow-Green">{withdrawDetail.text}</p>
                        </div>
                        <div className="flex justify-center items-center pt-5">
                            <div className="text-white bg-gray font-bold px-4 py-2 rounded-xl shadow-md shadow-background">
                                This action has already been registered
                            </div>
                        </div>
                    </div>}


                    {/* ------------------------------------------------------------------------------------------------------------------- */}


                    {activeButton === "SellAndBuy" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex h-[350px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Token Buyers</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3 pr-4">
                            <p className="font-medium text-softBlue w-fit md:w-[250px] text-center">User</p>
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">Tether</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">Token Recive</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Token Price</p>
                        </div>
                        {!SellAndBuy || SellAndBuy.buy.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Buyers Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-yellow md:divide-y-0">
                            {SellAndBuy.buy.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between py-3 space-y-2 md:space-y-0 font-bold mt-1 items-center">
                                        <p className="text-tradeGreen w-full text-xs md:w-[250px] text-center">{e.user}</p>
                                        <p className="text-tradeGreen w-full text-xs md:w-[200px] text-center">{e.tether}</p>
                                        <p className="text-tradeGreen w-full text-xs md:w-[150px] text-center">{e.time}</p>
                                        <p className="text-tradeGreen w-full text-xs md:w-[200px] text-center">{e.tokenRecive}</p>
                                        <p className="text-tradeGreen w-full text-xs md:w-[150px] text-center">{e.tokenPrice}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}
                    {activeButton === "SellAndBuy" && <div on className="m-2 md:m-5 bg-white rounded-3xl shadow-lg flex h-[350px] flex-col divide-y-2 divide-softBlue/20 p-5 ">
                        <div className="flex flex-row justify-center md:justify-between items-center pb-3">
                            <div className="flex flex-row space-x-2 justify-center items-center">
                                <Image src="/Vector23.png" className="h-fit " alt="" width={20} height={20} />
                                <p className="font-bold text-softBlue">Token Sellers</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center py-3 pr-4">
                            <p className="font-medium text-softBlue w-fit md:w-[250px] text-center">User</p>
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">Tether Recive</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Time</p>
                            <p className="font-medium text-softBlue w-fit md:w-[200px] text-center">Token</p>
                            <p className="font-medium text-softBlue w-fit md:w-[150px] text-center">Token Price</p>
                        </div>
                        {!SellAndBuy || SellAndBuy.sell.length === 0 ? <div className="flex h-full flex-row justify-center items-center space-x-5">
                            <FaBoxArchive size={50} color="#7790A6" />
                            <p className="text-xl font-bold text-softBlue">Sellers Box Is Empty</p>
                        </div> : <div className="overflow-y-auto divide-y-2 divide-yellow md:divide-y-0">
                            {SellAndBuy.sell.slice().reverse().map((e, index) => {
                                return (
                                    <div key={index} className="flex flex-col md:flex-row justify-between py-3 space-y-2 md:space-y-0 font-bold mt-1 items-center">
                                        <p className="text-tradeRed w-full md:w-[250px] text-xs text-center">{e.user}</p>
                                        <p className="text-tradeRed w-full md:w-[200px] text-xs text-center">{e.tetherRecive}</p>
                                        <p className="text-tradeRed w-full md:w-[150px] text-xs text-center">{e.time}</p>
                                        <p className="text-tradeRed w-full md:w-[200px] text-xs text-center">{e.token}</p>
                                        <p className="text-tradeRed w-full md:w-[150px] text-xs text-center">{e.tokenPrice}</p>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>}

                </div>
                <ToastContainer />
            </div>
            {
                showMessage && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message />
                </div>
            }
        </div >
    );
}