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

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const [darkMode, setDarkMode] = useState(false);

    if (typeof localStorage !== "undefined") {
        var path = window.location.pathname
        var authStorage = localStorage.getItem('auth')
    }

    const [activeItem, setActiveItem] = React.useState(path);

    const handleClick = (url) => {
        setActiveItem(url);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

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

    const logoutFunc = () => {
        dispatch(logout())
        window.location.reload();
    }

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.isAuthenticated)
    const auth = authStorage

    return (
        <div className={activeItem !== "/trading" ? "flex flex-col z-40 bg-back dark:bg-background" : "flex flex-col z-40 bg-back dark:bg-black"}>
            {(activeItem !== "/Sign-Up" && activeItem !== "/Login" ) && <div className={activeItem !== "/trading" ? "hidden md:flex flex-row bg-back dark:bg-background h-20 justify-between items-center px-14 mt-2" : "hidden md:flex flex-row bg-back dark:bg-black h-20 justify-between items-center px-14 mt-2"}>
                <div className="flex flex-row space-x-5 items-center">
                    <Link href="/" className="flex flex-row justify-center items-center space-x-2">
                        <Image src={logo} alt="" width={70} priority={true} />
                        <p className="text-red dark:text-yellowBorder font-bold text-xl">4xExChange</p>
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
                    <button className="" onClick={() => setDarkMode(!darkMode)}>
                        {!darkMode ? <div className="px-5 py-1 bg-transparent border-yellow border-2 rounded-md"> <MdLightMode color="#feb72f" size={25} /> </div> : <div className="px-5 py-1 bg-transparent border-yellow border-2 rounded-md"> <MdDarkMode color="#FCD535" size={25} /> </div>}
                    </button>
                    <Link href="/Login" className="text-yellow dark:text-yellowBorder rounded-md border-2 border-yellow dark:border-yellow px-2 py-1 font-medium text-sm flex justify-center items-center">
                        <p>Log In</p>
                    </Link>
                    <Link href="/Sign-Up" className="bg-yellow dark:bg-yellow font-bold text-background px-2 py-1 rounded-md text-sm flex flex-row justify-center items-center space-x-1">
                        <IoPersonAddSharp />
                        <p>Sign Up</p>
                    </Link>
                </div> :
                    <div className="relative inline-block" ref={dropdownRef}>
                        <div className="flex flex-row space-x-3">
                            <button className="" onClick={() => setDarkMode(!darkMode)}>
                                {!darkMode ? <div className="px-5 py-1 bg-transparent border-yellow border-2 rounded-md"> <MdLightMode color="#feb72f" size={25} /> </div> : <div className="px-5 py-1 bg-transparent border-yellow  border-2 rounded-md"> <MdDarkMode color="#FCD535" size={25} /> </div>}
                            </button>
                            <button onClick={toggleDropdown} className="bg-yellow dark:bg-yellow font-bold text-background px-2 py-1 rounded-md text-sm flex flex-row justify-center items-center space-x-2">
                                <FaUser size={20} color="#1A1A1A" />
                                <p className="text-lg text-background">Account</p>
                                <FaChevronDown size={20} color="#1A1A1A" />
                            </button>
                        </div>
                        {isOpen && (
                            <div className="flex text-yellowBorder w-64 absolute items-start divide-y mt-3 right-0 flex-col border border-yellow bg-background space-y-5 p-5 rounded-xl justify-between shadow-lg shadow-black z-50">
                                <div className="flex flex-col space-y-3 ">
                                    <Link href="/pannel" className="text-xl z-40 space-x-3 font-bold flex flex-row justify-start items-center w-full">
                                        <CgProfile size={24} />
                                        <p>Profile</p>
                                    </Link>
                                    {(user === true && auth === "1" ) && <Link href="/admin" className="text-xl z-40 space-x-3 font-bold flex flex-row justify-start items-center w-full">
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
            </div>}
            <div className={activeItem === "/" ? "flex md:hidden fixed bottom-0 w-full bg-background dark:bg-transparent backdrop-blur-3xl justify-between items-center p-4 z-50" : "flex md:hidden fixed bottom-0 w-full bg-background justify-between items-center p-4 z-50"}>
                <Link
                    key="/"
                    href="/"
                    onClick={() => handleClick("/")}
                >
                    {activeItem === "/" ?
                        <div className="flex flex-col justify-center items-center">
                            <FaHome size={30} color="#FCD535" />
                            <p className="font-bold text-yellowBorder">Home</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <FaHome size={30} color="white" />
                            <p className="font-bold text-white">Home</p>
                        </div>
                    }
                </Link>
                {user === true && <Link
                    key="/pannel"
                    href="/pannel"
                    onClick={() => handleClick("/pannel")}
                >
                    {activeItem === "/pannel" ?
                        <div className="flex flex-col justify-center items-center">
                            <FaUserCog size={30} color="#FCD535" />
                            <p className="font-bold text-lg text-yellowBorder ">Pannel</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center ">
                            <FaUserCog size={30} color="white" />
                            <p className="font-bold text-white">Pannel</p>
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
                            <LiaChartBar size={30} color="#FCD535" />
                            <p className="font-bold text-yellowBorder">Trade</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <LiaChartBar size={30} color="white" />
                            <p className="font-bold text-white">Trade</p>
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
                            <RiAdminFill size={30} color="#FCD535" />
                            <p className="font-bold text-yellowBorder">Admin</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <RiAdminFill size={30} color="white" />
                            <p className="font-bold text-white">Admin</p>
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
                            <FaUserEdit size={30} color="#FCD535" />
                            <p className="font-bold text-yellowBorder">Sign-Up</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <FaUserEdit size={30} color="white" />
                            <p className="font-bold text-white">Sign-Up</p>
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
                            <FaUserTag size={30} color="#FCD535" />
                            <p className="font-bold text-yellowBorder">Login</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <FaUserTag size={30} color="white" />
                            <p className="font-bold text-white">Login</p>
                        </div>
                    }
                </Link>}
                <button onClick={() => setDarkMode(!darkMode)}>
                    {!darkMode ?
                        <div className="flex flex-col justify-center items-center">
                            <MdLightMode color="#feb72f" size={30} />
                            <p className="font-bold text-yellowBorder">Light</p>
                        </div> :
                        <div className="flex flex-col justify-center items-center">
                            <MdDarkMode color="#1F3250" size={30} />
                            <p className="font-bold text-tableBlue">Dark</p>
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}
