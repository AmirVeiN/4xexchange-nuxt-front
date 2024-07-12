'use client'

import React, { useState, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import ReCAPTCHA from "react-google-recaptcha";
import Link from 'next/link';
import { toast } from 'sonner';
import Popup from "../../components/modal"
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signUp, EmailCode } from "../GlobalRedux/Features/userSlice";
import Image from 'next/image';
import loginimg from "../../public/login.png"

export default function RegistrationForm() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [codePage, setCodePage] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRepeatPassword] = useState('');
    const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(5 * 60);
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleCode = (e) => setCode(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {

        if (codePage) {

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

    }, [codePage]);


    const Message = () => {
        return <Popup type="ok" reload={false} location="login" text="Your action was successfully registered" />
    }

    const handleSubmit = (type) => {

        if (type === "code") {

            if (password === re_password) {

                dispatch(EmailCode({ email: email })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setCodePage(true)
                    } else if (e.type.includes("rejected")) {
                        toast.error("Something Wrong")
                    }
                });
            } else {
                toast.error("passwords not match")
            }
        }

        else if (type === "signup") {

            dispatch(signUp({ code: code, email: email, username: username, password: password })).then((e) => {
                if (e.type.includes("fulfilled")) {
                    setShowMessage(true)
                } else if (e.type.includes("rejected")) {
                    toast.error("Email Allready Exist")
                }
            });
        }
    };

    return (
        <div className='relative'>
            <div className={showMessage ? `h-screen flex justify-center items-center bg-mainBlue blur-md ` : `h-screen w-full flex justify-center items-center bg-mainBlue `}>
                {codePage ? <div className="bg-white rounded-2xl w-[360px] justify-between items-center py-5 h-[700px] flex flex-col shadow-lg shadow-white">
                    <Image src={loginimg} alt="" width={300} height={300} priority={true} className="" />
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit("signup") }} className='flex flex-col justify-center space-y-6 h-full items-center w-[80%]'>
                        <p className="w-full p-2 border focus:ring-4 focus:border-none  border-mainBlue text-sm text-center text-mainBlue rounded bg-white">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
                        <p className="w-full p-2 border focus:ring-4 focus:border-none  border-mainBlue text-sm text-center text-mainBlue rounded bg-white">Enter the code received from the email</p>
                        <div className='flex flex-row space-x-2 w-full items-center'>
                            <div className='border border-mainBlue rounded w-16 h-10 flex justify-center items-center' >
                                <MdEmail color='#21749c' size={20} />
                            </div>
                            <input
                                required
                                type="number"
                                placeholder="code"
                                value={code}
                                onChange={handleCode}
                                className="w-full p-2 border focus:ring-4 focus:border-none  border-mainBlue text-mainBlue rounded bg-white"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-72 font-bold bg-mainBlue text-white p-2 rounded"
                        >
                            Verifiy Code
                        </button>
                    </form>
                </div> :
                    <div className='h-full w-full flex justify-center items-center'>
                        <div className="hidden md:flex bg-[#CEBEA5] rounded-l-2xl w-[560px] justify-center items-center py-10 h-[700px] shadow-lg shadow-white">
                            <Image src={loginimg} alt="" width={500} height={500} priority={true} />
                        </div>
                        <div className="bg-white flex rounded-r-2xl rounded-l-2xl md:rounded-r-2xl md:rounded-l-none w-full md:w-[360px] justify-start md:justify-center items-center py-5 h-full md:h-[700px] flex-col shadow-lg shadow-white">
                            <Image src={loginimg} alt="" width={300} height={300} priority={true} className="flex md:hidden mb-4" />
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit("code") }} className='flex flex-col justify-center space-y-6 h-fit items-center w-[80%]'>
                                <div className='flex flex-row space-x-2 w-full items-center'>
                                    <div className='border border-mainBlue rounded w-16 h-10 flex justify-center items-center' >
                                        <MdEmail color='#21749c' size={20} />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="w-full p-2 border focus:ring-4 focus:border-none border-mainBlue text-black rounded bg-white"
                                    />
                                </div>
                                <div className='flex flex-row space-x-2 w-full items-center'>
                                    <div className='border border-mainBlue rounded w-16 h-10 flex justify-center items-center' >
                                        <FaUser color='#21749c' size={20} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Name"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        className="w-full p-2 border focus:ring-4 focus:border-none border-mainBlue text-black rounded bg-white"
                                    />
                                </div>
                                <div className='flex flex-row space-x-2 w-full items-center'>
                                    <div className='border border-mainBlue rounded w-16 h-10 flex justify-center items-center' >
                                        <RiLockPasswordFill color='#21749c' size={20} />
                                    </div>
                                    <input
                                        required
                                        minLength="8"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border focus:ring-4 focus:border-none border-mainBlue text-black rounded bg-white"
                                    />
                                </div>
                                <div className='flex flex-row space-x-2 w-full items-center'>
                                    <div className='border border-mainBlue rounded w-16 h-10 flex justify-center items-center' >
                                        <RiLockPasswordFill color='#21749c' size={20} />
                                    </div>
                                    <input
                                        required
                                        minLength="8"
                                        type="password"
                                        placeholder="Repeat Password"
                                        value={re_password}
                                        onChange={handleRepeatPasswordChange}
                                        className="w-full p-2 border focus:ring-4 focus:border-none border-mainBlue text-black rounded bg-white"
                                    />
                                </div>
                                {/* <ReCAPTCHA
                                    theme="dark"
                                    sitekey="6Ldz7M8pAAAAAGEUMmxwvMdm7f5WMzECjUWs3TG3"
                                    onChange={() => setIsCaptchaSuccess(true)}
                                /> */}
                                <button
                                    // disabled={!isCaptchaSuccessful}
                                    type="submit"
                                    className="w-72 font-bold bg-mainBlue text-white p-2 rounded"
                                >
                                    Create Account
                                </button>
                            </form>
                            <div className='flex flex-col justify-center items-center mt-5'>
                                <p className='text-background font-medium'>You have account?</p>
                                <div className="flex flex-row justify-center items-center space-x-5">
                                    <Link className='text-white rounded-md font-bold bg-yellow py-1 px-4 mt-2' href="/">Home</Link>
                                    <Link className='text-white rounded-md font-bold bg-tradeRed py-1 px-4 mt-2' href="/Login">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
            {
                showMessage && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Message />
                </div>
            }
        </div>
    )

};