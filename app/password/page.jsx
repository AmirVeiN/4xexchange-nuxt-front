'use client'

import React, { useEffect, useState } from "react";
import { ChangePassword, ChangePasswordConfirmation } from "../GlobalRedux/Features/userSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";
import Popup from "../../components/modal"
import logo from "../../public/logo.png"
import { toast } from 'sonner';
import Image from "next/image";

export default function Password() {

    const [secondsRemaining, setSecondsRemaining] = useState(5 * 60);
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    const [code, setcode] = useState('');
    const handlecode = (e) => setcode(e.target.value);
    const [Email, setEmail] = useState('');
    const handleEmail = (e) => setEmail(e.target.value);
    const [new_password, setNew_password] = useState('');
    const handleNew_password = (e) => setNew_password(e.target.value);
    const [re_new_password, setre_New_password] = useState('');
    const handlere_New_password = (e) => setre_New_password(e.target.value);

    const [send, setSend] = useState(false);

    const [showMessage, setShowMessage] = useState(false);

    const dispatch = useDispatch();

    const Message = () => {
        return <Popup type="ok" reload={false} location="pannel" text="Your Password Succesful Chenged" />
    }

    useEffect(() => {

        if (send) {

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

    }, [send]);

    const handleSubmit = (type) => {

        if (type === "one") {

            dispatch(ChangePassword({ email: Email })).then((e) => {
                if (e.type.includes("fulfilled")) {
                    setSend(true)
                } else if (e.type.includes("rejected")) {
                    toast.error("Email not found")
                }
            });

        }
        else if (type === "two") {

            if (new_password === re_new_password)

                dispatch(ChangePasswordConfirmation({ code: code, password: new_password })).then((e) => {
                    if (e.type.includes("fulfilled")) {
                        setShowMessage(true)
                    } else if (e.type.includes("rejected")) {
                        toast.error("password is not strong")
                    }
                });

            else {
                toast.error("passwords not same")
            }
        }
    };

    return <div>
        {!send ? <div className="flex bg-black h-screen w-screen justify-center items-center">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit("one"); }} className="flex bg-backgroundgray rounded-xl p-5 flex-col justify-between space-y-5 items-center">
                <div className="flex justify-start items-start w-full">
                    <Link href="/" className="px-4 py-2 flex flex-row justify-center items-center space-x-2 border-2 rounded-xl">
                        <RiArrowGoBackFill size={18} />
                        <p>Back</p>
                    </Link>
                </div>
                <Image src={logo} alt="" priority={true} width={250} height={250} />
                <p className="font-bold bg-white text-black border-2 p-2 rounded-xl py-4 w-[300px]">Enter the Your Email</p>
                <input
                    required
                    type="email"
                    placeholder="example@gmail.com"
                    value={Email}
                    onChange={handleEmail}
                    className="w-full p-2 rounded-lg  text-black font-bold bg-white border"
                />
                <button type="submit" className="bg-tradeRed text-white rounded-xl w-full py-4 font-bold text-xl">
                    Submit
                </button>
            </form>
        </div> : <div className={!showMessage ? "flex bg-black h-screen w-screen justify-center items-center" : "blur-md flex bg-black h-screen w-screen justify-center items-center"}>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit("two"); }} className="flex bg-backgroundgray rounded-xl p-5 flex-col justify-between space-y-5 items-center">
                <div className="flex justify-start items-start w-full">
                    <Link href="/" className="px-4 py-2 flex flex-row justify-center items-center space-x-2 border-2 rounded-xl">
                        <RiArrowGoBackFill size={18} />
                        <p>Back</p>
                    </Link>
                </div>
                <p className="text-lg">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
                <p className="font-bold bg-white text-black border-2 p-2 rounded-xl py-4 w-[300px]">Enter the Email Code</p>
                <input
                    required
                    type="number"
                    value={code}
                    onChange={handlecode}
                    className="w-full p-2 rounded-lg  text-black font-bold bg-white border"
                />
                <p className="font-bold bg-white text-black border-2 p-2 rounded-xl py-4 w-[300px]">Enter the New Password</p>
                <input
                    minLength={10}
                    required
                    type="password"
                    value={new_password}
                    onChange={handleNew_password}
                    className="w-full p-2 rounded-lg  text-black font-bold bg-white border"
                />
                <p className="font-bold bg-white text-black border-2 p-2 rounded-xl py-4 w-[300px]">Enter the Re New Password</p>
                <input
                    minLength={10}
                    required
                    type="password"
                    value={re_new_password}
                    onChange={handlere_New_password}
                    className="w-full p-2 rounded-lg  text-black font-bold bg-white border"
                />
                <button type="submit" className="bg-tradeRed text-white rounded-xl w-full py-4 font-bold text-xl">
                    Submit
                </button>
            </form>
        </div>}
        {
            showMessage && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <Message />
            </div>
        }
    </div>
}


