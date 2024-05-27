'use client'
import React, { useState } from 'react';
import { IoIosWarning } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

const Popup = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const closePopup = () => {

        setIsOpen(false);

        if (props.reload === true) {
            window.location.reload();
        }
        if (props.location === "pannel") {
            window.location.href = "/pannel";
        }
        if (props.location === "login") {
            window.location.href = "/Login";
        }
    };

    return isOpen && props.type === "error" &&
        <div className=' bg-white w-[300px] p-5 border-2 border-red rounded-2xl'>
            <div className="flex flex-col space-y-3 justify-center items-center text-center">
                <IoIosWarning size={70} color='red' />
                <p className='text-2xl font-bold text-black'>Warning</p>
                <p className='font-medium text-background'>{props.text}</p>
                <button className='px-4 py-2 rounded-xl bg-red font-medium text-white' onClick={closePopup}>Close</button>
            </div>
        </div> ||
        isOpen && props.type === "ok" &&
        <div className=' bg-white w-[300px] p-5 border-2 border-gridGreen rounded-2xl'>
            <div className="flex flex-col space-y-3 justify-center items-center text-center">
                <FaCircleCheck size={70} color='#56C53A' />
                <p className='text-2xl font-bold text-black'>Successful</p>
                <p className='font-medium text-background'>{props.text}</p>
                <button className='px-4 py-2 rounded-xl bg-gridGreen font-medium text-white' onClick={closePopup}>Close</button>
            </div>
        </div>
};

export default Popup;
