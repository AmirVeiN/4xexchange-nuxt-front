'use client'

import { SiTether } from "react-icons/si";
import React, { useEffect, useState } from "react";
import { DepositCreate } from "../GlobalRedux/Features/userSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useQRCode } from "next-qrcode";
import { IoCopy } from "react-icons/io5";
import { SiEthereum } from "react-icons/si";
import { SiDogecoin } from "react-icons/si";
import bnb from "../../public/bnb.png"
import shib from "../../public/shib.png"
import Image from "next/image";

export default function Deposit() {

    const [secondsRemaining, setSecondsRemaining] = useState(60 * 60);
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    const [tetherAmount, setTetherAmount] = useState('');
    const [deposit, setDeposit] = useState(false);

    const [type, setType] = useState("USDT (BEP20)");
    const [wallet, SetWallet] = useState("0xd14d911b2cb8bde775d9458b5377623c1e2d9bc1");

    const [showMessage, setShowMessage] = useState(false);

    const handleSetTetherAmount = (e) => setTetherAmount(e.target.value);

    const dispatch = useDispatch();

    const { Image: NewImage } = useQRCode()

    const handleSubmit = () => {

        dispatch(DepositCreate({ tether: tetherAmount, wallet: wallet, crypto_type: type })).then((e) => {
            if (e.type.includes("fulfilled")) {
                setDeposit(true)
            }
        });
    };

    useEffect(() => {

        if (deposit) {

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

    }, [deposit]);


    return !deposit ?
        <div className="flex bg-black h-screen w-full justify-center items-center">
            <div className="flex bg-backgroundgray rounded-xl p-5 flex-col justify-between space-y-5 items-center">
                <div className="flex justify-start items-start w-full">
                    <Link href="/" className="px-4 py-2 flex flex-row justify-center items-center space-x-2 border-2 rounded-xl">
                        <RiArrowGoBackFill size={18} />
                        <p>Back</p>
                    </Link>
                </div>
                <div className="grid gap-4 grid-cols-2">
                    <button onClick={() => { setType('USDT (BEP20)'); SetWallet("0xd14d911b2cb8bde775d9458b5377623c1e2d9bc1") }} className={type === "USDT (BEP20)" ? "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1 bg-tradeGreen" : "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1"}>
                        <SiTether size={30} color="black" />
                        <p className="font-bold">USDT (BEP20)</p>
                    </button>
                    <button onClick={() => { setType('USDT (TRC20)'); SetWallet("TTRZ4syRd7LdseNTJXJwVEjDXcGEtBZhFs") }} className={type === "USDT (TRC20)" ? "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1 bg-tradeGreen" : "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1"}>
                        <SiTether size={30} color="black" />
                        <p className="font-bold">USDT (TRC20)</p>
                    </button>
                    <button onClick={() => { setType('BNB (BEP20)'); SetWallet("0xd14d911b2cb8bde775d9458b5377623c1e2d9bc1") }} className={type === "BNB (BEP20)" ? "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1 bg-tradeGreen" : "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1"}>
                        <Image src={bnb} alt="" width={30} height={30} />
                        <p className="font-bold">BNB (BEP20)</p>
                    </button>
                    <button onClick={() => { setType('ETH (ERC20)'); SetWallet("0xd14d911b2cb8bde775d9458b5377623c1e2d9bc1") }} className={type === "ETH (ERC20)" ? "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1 bg-tradeGreen" : "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1"}>
                        <SiEthereum size={30} color="black" />
                        <p className="font-bold">ETH (ERC20)</p>
                    </button>
                    <button onClick={() => { setType('SHIB (ERC20)'); SetWallet("0xd14d911b2cb8bde775d9458b5377623c1e2d9bc1") }} className={type === "SHIB (ERC20)" ? "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1 bg-tradeGreen" : "p-3 border-2 border-black text-black rounded-xl flex flex-row justify-center items-center space-x-1"}>
                        <Image src={shib} alt="" width={30} height={30} />
                        <p className="font-bold">SHIB (ERC20)</p>
                    </button>
                    <button onClick={() => { setType('Doge (DOGE)'); SetWallet("DEjgMqtzVuXhxVD4LmAi2FjqwBab1ibdwm") }} className={type === "Doge (DOGE)" ? "p-3 border-2 rounded-xl border-black text-black flex flex-row justify-center items-center space-x-1 bg-tradeGreen" : "p-3 border-2 rounded-xl border-black text-black flex flex-row justify-center items-center space-x-1"}>
                        <SiDogecoin size={30} color="black" />
                        <p className="font-bold">Doge (DOGE)</p>
                    </button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col justify-between space-y-5 items-center">
                    <p className="font-bold bg-white text-black border-2 p-2 rounded-xl py-4">Enter the amount of {type} you wanna buy</p>
                    <input
                        minLength="1"
                        min={2}
                        required
                        type="number"
                        placeholder="0.3"
                        value={tetherAmount}
                        onChange={handleSetTetherAmount}
                        className="w-full p-2 rounded-lg  text-black font-bold bg-white border"
                    />
                    <button type="submit" className="bg-tradeRed text-white rounded-xl w-full py-4 font-bold text-xl">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        : <div className="flex bg-black h-screen w-screen justify-center items-center">
            <div className={!showMessage ? "flex flex-col bg-white w-[370px] md:w-[600px] h-[430px] justify-between items-center rounded-xl divide-y-[1px]" : "blur-md flex flex-col bg-white w-[370px] md:w-[600px] h-[430px] justify-between items-center rounded-xl divide-y-[1px]"}>
                <div className="flex flex-row justify-between items-center p-5 w-full">
                    <p className="font-bold text-black">Send payment</p>
                    <div className="flex flex-row justify-center items-center space-x-5 font-bold">
                        <p className="text-lg text-black">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
                        <Link href="/" className="px-4 py-2 flex flex-row justify-center items-center space-x-2 border-2 rounded-xl">
                            <RiArrowGoBackFill size={18} color="black" />
                            <p className="text-black">Back</p>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center p-1 md:p-5 w-full">
                    <NewImage
                        text={wallet}
                        options={{
                            type: 'image/jpeg',
                            quality: 0.3,
                            errorCorrectionLevel: 'M',
                            width: 120,
                        }}
                    />
                    <div className="flex flex-row justify-center items-center space-x-2">
                        {type === "USDT (BEP20)" && <SiTether size={30} color="green" className="hidden md:flex" /> ||
                            type === "USDT (TRC20)" && <SiTether size={30} color="green" className="hidden md:flex" /> ||
                            type === "BNB (BEP20)" && <Image src={bnb} alt="" width={30} height={30} className="hidden md:flex" /> ||
                            type === "ETH (ERC20)" && <SiEthereum size={30} className="hidden md:flex" /> ||
                            type === "SHIB (ERC20)" && <Image src={shib} alt="" width={30} height={30} className="hidden md:flex" /> ||
                            type === "Doge (DOGE)" && <SiDogecoin size={30} className="hidden md:flex" />}
                        <p className="font-bold text-black">Only send {type} network to this address</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center p-5 w-full">
                    <div className="flex flex-col">
                        <p className="font-medium text-gray">{type} address</p>
                        <p className="font-bold text-black text-xs md:text-base">{wallet}</p>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(wallet) }}>
                        <IoCopy color="black" />
                    </button>
                </div>
                <div className="flex flex-row justify-between items-center p-5 w-full">
                    <div className="flex flex-col">
                        <p className="font-medium text-gray">Total amount</p>
                        <div className="flex flex-row justify-start items-center space-x-3">
                            <p className="font-bold text-lg text-black">{tetherAmount}</p>
                        </div>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(tetherAmount) }}>
                        <IoCopy color="black" />
                    </button>
                </div>
            </div>
        </div>

}