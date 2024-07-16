'use client'

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login, getUser } from "../GlobalRedux/Features/userSlice";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from "next/image";
import { toast } from 'sonner';
import loginimg from "../../public/login.png"
import axios from "axios";

export default function LoginForm() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const router = useRouter();

    function waitForToken() {
        return new Promise((resolve, reject) => {
            const intervalId = setInterval(() => {
                const token = localStorage.getItem("access");
                const token2 = localStorage.getItem("refresh");
                if (token, token2) {
                    clearInterval(intervalId);
                    resolve(token, token2);
                }
            }, 1000);
        });
    }

    const handleSubmit = () => {

        dispatch(login({ email: email, password: password })).then((b) => {

            if (b.type.includes("fulfilled")) {
                waitForToken().then(() => {

                    dispatch(getUser(localStorage.getItem('access')))
                    router.push('/')
                    router.refresh()
                })

            } else {
                toast.error("error")
            }
        })

    };


    return (
        <div className='relative'>
            <div className="h-screen w-full flex justify-center items-center bg-mainBlue ">
                <div className="hidden md:flex bg-[#CEBEA5] rounded-l-2xl w-[560px] justify-center items-center py-10 h-[500px] shadow-lg shadow-white">
                    <Image src={loginimg} alt="" width={500} height={500} priority={true} />
                </div>
                <div className="bg-white rounded-r-2xl rounded-l-2xl md:rounded-r-2xl md:rounded-l-none w-full md:w-[360px] justify-center md:justify-around items-center py-10 h-full md:h-[500px] flex flex-col shadow-lg shadow-white">
                    <Image src={loginimg} alt="" width={300} height={300} priority={true} className="flex md:hidden mb-4" />
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className='flex flex-col justify-center space-y-6 h-fit md:h-full items-center w-[80%]'>
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
                                className="w-full p-2 border border-mainBlue focus:ring-4 focus:border-none  text-black rounded bg-white"
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
                                className="w-full p-2 border border-mainBlue focus:ring-4 focus:border-none text-black rounded bg-white"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-72 font-bold bg-mainBlue text-white p-2 rounded"
                        >
                            Login
                        </button>
                    </form>
                    <div className='flex flex-col justify-center items-center mt-5 md:mt-0 mb-5 md:mb-12'>
                        <p className='text-background font-medium'>Forget Your Password?</p>
                        <Link className='text-white rounded-md font-bold bg-greenButton py-1 px-4 mt-2' href="/password">Foget Passowrd</Link>
                    </div>
                    <div className='flex flex-col justify-center items-center '>
                        <p className='text-background font-medium'>You dont have account?</p>
                        <div className="flex flex-row justify-center items-center space-x-5">
                            <button onClick={() => dispatch(getUser(localStorage.getItem('access')))} className='text-white rounded-md font-bold bg-yellow py-1 px-4 mt-2' href="/">gg</button>
                            <Link className='text-white rounded-md font-bold bg-yellow py-1 px-4 mt-2' href="/">Home</Link>
                            <Link className='text-white rounded-md font-bold bg-tradeRed py-1 px-4 mt-2' href="/Sign-Up">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};