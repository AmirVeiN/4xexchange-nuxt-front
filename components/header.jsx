'use client'

import { IoPersonAddSharp } from "react-icons/io5";
import Link from "next/link";
import logo from "../public/logo.png"
import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from '../app/GlobalRedux/Features/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { LiaChartBar } from "react-icons/lia";
import { RiAdminFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { ImExit } from "react-icons/im";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const currentPage = usePathname();
    if (typeof localStorage !== "undefined") {
        var path = window.location.pathname
        var authStorage = localStorage.getItem('auth')
    }

    const [activeItem, setActiveItem] = useState(path);

    const handleClick = (url) => {
        setActiveItem(url);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logoutFunc = () => {
        dispatch(logout())
        window.location.reload();
    }

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.isAuthenticated)
    const auth = authStorage

    return (
        <div className={activeItem !== "/trading" ? "flex flex-col z-40 bg-back dark:bg-background justify-center items-center" : "justify-center items-center flex flex-col z-40 bg-back dark:bg-black"}>
            <div className="hidden md:flex justify-center items-center">
                <div className="fixed flex flex-row w-[95%] max-w-[1600px] h-20 justify-between bg-white shadow-xl rounded-3xl items-center px-10 top-3 z-40">
                    <div className="flex flex-row space-x-5 items-center">
                        <Link href="/" className="flex flex-row justify-center items-center space-x-2">
                            <Image src={logo} alt="" width={50} priority={true} />
                            <p className="text-mainBlue font-bold text-xl">4xExChange</p>
                        </Link>
                        <Link href="/trading" className="text-background dark:text-white font-bold">
                            Trading
                        </Link>
                        <Link href="/deposit" className="text-background dark:text-white font-bold">
                            Deposit
                        </Link>
                        <Link href="/pannel" className="text-background dark:text-white font-bold">
                            Contact us
                        </Link>
                    </div>
                    {user === false ? <div className="flex flex-row space-x-3">

                        <Link href="/Login" className="text-mainBlue rounded-md border-2 border-mainBlue px-2 py-2 font-medium text-sm flex justify-center items-center">
                            <p>Log In</p>
                        </Link>
                        <Link href="/Sign-Up" className="bg-mainBlue font-bold text-white px-2 py-2 rounded-md text-sm flex flex-row justify-center items-center space-x-1">
                            <IoPersonAddSharp />
                            <p>Sign Up</p>
                        </Link>
                    </div> :
                        <div className="relative inline-block" ref={dropdownRef}>
                            <div className="flex">
                                <button onClick={toggleDropdown} className="bg-mainBlue font-bold text-white px-2 py-1 rounded-md text-sm flex flex-row justify-center items-center space-x-2">
                                    <FaUser size={20} color="white" />
                                    <p className="text-lg text-white">Account</p>
                                    <FaChevronDown size={20} color="white" />
                                </button>
                            </div>
                            {isOpen && (
                                <div className="flex text-mainBlue w-64 absolute items-start divide-y mt-3 right-0 flex-col border border-mainBlue bg-white space-y-5 p-5 rounded-xl justify-between shadow-lg shadow-black z-50">
                                    <div className="flex flex-col space-y-3 ">
                                        <Link href="/pannel" className="text-xl z-40 space-x-3 font-bold flex flex-row justify-start items-center w-full">
                                            <CgProfile size={24} />
                                            <p>Profile</p>
                                        </Link>
                                        {(user === true && auth === "1") && <Link href="/admin" className="text-xl z-40 space-x-3 font-bold flex flex-row justify-start items-center w-full">
                                            <BsFillShieldLockFill size={24} />
                                            <p>Admin Dashboard</p>
                                        </Link>}
                                    </div>
                                    <div className="pt-5">
                                        <button onClick={logoutFunc} className="text-xl text-red space-x-3 font-bold z-40 flex flex-row justify-start items-center w-full">
                                            <FaSignOutAlt size={24} />
                                            <p>Log Out</p>
                                        </button>
                                    </div>
                                </div>)}
                        </div>
                    }
                </div>
            </div>
            <div className="flex md:hidden fixed bottom-5 w-[90%] h-20 bg-back rounded-xl shadow-lg shadow-mainBlue justify-between items-end p-4 z-50">
                <Link
                    key="/"
                    href="/"
                    onClick={() => handleClick("/")}
                >
                    {activeItem === "/" ?
                        <div className="flex flex-col justify-center items-center">
                            <FaHome size={30} color="#21749c" />
                            <p className="font-bold text-mainBlue">Home</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <FaHome size={30} color="gray" />
                            <p className="font-bold text-gray">Home</p>
                        </div>
                    }
                </Link>
                {user === true && <Link
                    key="/pannel"
                    href="/pannel"
                    onClick={() => handleClick("/pannel")}
                >
                    {activeItem === "/pannel" && currentPage === "/pannel" ?
                        <div>
                            <div className="fixed h-[70px] w-[75px] rounded-b-xl mb-6 px-2 shadow-md shadow-mainBlue z-40 ">
                            </div>
                            <button className="flex flex-col bg-white mb-6 px-2 z-50 justify-center items-center">
                                <FaUserCog size={30} color="#21749c" />
                                <p className="font-bold text-lg text-mainBlue ">Pannel</p>
                            </button>
                        </div> :
                        <div className="flex flex-col justify-center items-center ">
                            <FaUserCog size={30} color="gray" />
                            <p className="font-bold text-gray">Pannel</p>
                        </div>
                    }
                </Link>}
                <Link
                    key="/trading"
                    href="/trading"
                    onClick={() => handleClick("/trading")}
                >
                    {activeItem === "/trading" ?
                        <div className="flex flex-col justify-center items-center">
                            <LiaChartBar size={30} color="#21749c" />
                            <p className="font-bold text-mainBlue">Trade</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <LiaChartBar size={30} color="gray" />
                            <p className="font-bold text-gray">Trade</p>
                        </div>
                    }
                </Link>
                {user === true && auth === "1" && <Link
                    key="/admin"
                    href="/admin"
                    onClick={() => handleClick("/admin")}
                >
                    {activeItem === "/admin" ?
                        <div className="flex flex-col justify-center items-center">
                            <RiAdminFill size={30} color="#21749c" />
                            <p className="font-bold text-mainBlue">Admin</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <RiAdminFill size={30} color="gray" />
                            <p className="font-bold text-gray">Admin</p>
                        </div>
                    }
                </Link>}
                {user === false && <Link
                    key="/Sign-Up"
                    href="/Sign-Up"
                    onClick={() => handleClick("/Sign-Up")}
                >
                    {activeItem === "/Sign-Up" ?
                        <div className="flex flex-col justify-center items-center">
                            <FaUserEdit size={30} color="#21749c" />
                            <p className="font-bold text-mainBlue">Sign-Up</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <FaUserEdit size={30} color="gray" />
                            <p className="font-bold text-gray">Sign-Up</p>
                        </div>
                    }
                </Link>}
                {user === false && <Link
                    key="/Login"
                    href="/Login"
                    onClick={() => handleClick("/Login")}
                >
                    {activeItem === "/Login" ?
                        <div className="flex flex-col justify-center items-center">
                            <FaUserTag size={30} color="#21749c" />
                            <p className="font-bold text-mainBlue">Login</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <FaUserTag size={30} color="gray" />
                            <p className="font-bold text-gray">Login</p>
                        </div>
                    }
                </Link>}
                {user === true && <button
                    onClick={() => dispatch(logout())}
                    className="flex flex-col justify-center items-center"
                >
                    <ImExit size={28} color="red" />
                    <p className="font-semibold text-red">LogOut</p>
                </button>}
            </div>
        </div>
    )
}
