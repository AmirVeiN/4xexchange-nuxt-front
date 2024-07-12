'use client'

import { useEffect, useState } from 'react';

const UtcDateClock = () => {
    const [utcDateTime, setUtcDateTime] = useState(formatUtcDateTime(new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
            setUtcDateTime(formatUtcDateTime(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function formatUtcDateTime(date) {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns 0-11
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className='flex flex-row space-x-1 sm:text-base text-sm'>
            <p className='text-black'>{utcDateTime}</p>
            <p className='text-mainBlue'>(UTC)</p>
        </div>
    );
};

export default UtcDateClock;
