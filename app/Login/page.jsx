'use client'

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { login, getUser } from "../GlobalRedux/Features/userSlice";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from "next/image";

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


    const HandleSubmit = (e) => {

        e.preventDefault();

        dispatch(login({ email: email, password: password })).then((e) => {
            if (e.type.includes("fulfilled")) {
                waitForToken().then(() => {
                    dispatch(getUser()).then((b) => {
                        if (b.type.includes("fulfilled")) {
                            router.push("/")
                        } else if (e.type.includes("rejected")) {
                            toast.error("Something Wrong")
                        }
                    })
                })
            }
        });

        return false;
    };


    return (
        <div className='relative'>
            <div className="h-full md:h-screen w-full flex justify-center items-center bg-black mt-5 md:mt-0">
                <div className="bg-background rounded-2xl w-[360px] justify-around items-center py-10 h-[700px] flex flex-col shadow-lg shadow-white">
                    <Image src="/logo.png" alt="" width={150} height={150} priority={true} />
                    <form onSubmit={HandleSubmit} className='flex flex-col justify-center space-y-6 h-full items-center w-[80%]'>
                        <div className='flex flex-row space-x-2 w-full items-center'>
                            <div className='border border-white rounded w-16 h-10 flex justify-center items-center' >
                                <MdEmail color='white' size={20} />
                            </div>
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full p-2 border focus:ring-4 focus:border-none focus:ring-yellow border-white text-white rounded bg-background"
                            />
                        </div>
                        <div className='flex flex-row space-x-2 w-full items-center'>
                            <div className='border border-white rounded w-16 h-10 flex justify-center items-center' >
                                <RiLockPasswordFill color='white' size={20} />
                            </div>
                            <input
                                required
                                minLength="8"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full p-2 border border-white focus:ring-4 focus:border-none focus:ring-yellow text-white rounded bg-background"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-72 font-bold bg-gridYellow text-background p-2 rounded"
                        >
                            Login
                        </button>
                    </form>
                    <div className='flex flex-col justify-center items-center mb-12'>
                        <p className='text-white font-medium'>Forget Your Password?</p>
                        <Link className='text-background rounded-md font-bold bg-tradeGreen py-1 px-4 mt-2' href="/password">Foget Passowrd</Link>
                    </div>
                    <div className='flex flex-col justify-center items-center '>
                        <p className='text-white font-medium'>You dont have account?</p>
                        <div className="flex flex-row justify-center items-center space-x-5">
                            <Link className='text-background rounded-md font-bold bg-white py-1 px-4 mt-2' href="/">Home</Link>
                            <Link className='text-background rounded-md font-bold bg-tradeRed py-1 px-4 mt-2' href="/Sign-Up">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
};