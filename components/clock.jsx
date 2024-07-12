'use client'

import { useEffect, useState } from 'react';

const UtcClock = () => {
    const [utcTime, setUtcTime] = useState(formatUtcTime(new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
            setUtcTime(formatUtcTime(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function formatUtcTime(date) {
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className='flex flex-row space-x-1 sm:text-base text-sm'>
            <p className='text-black'>{utcTime}</p>
            <p className='text-mainBlue'>(UTC)</p>
        </div>
    );
};

export default UtcClock;