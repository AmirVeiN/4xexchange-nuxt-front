"use client"

import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode, ColorType } from 'lightweight-charts';
import UtcClock from "./clock"

const WebSocketComponent = ({ onLastClosePriceUpdate, onVolume24hUpdate }) => {
    const socket = useRef(null);
    const [response, setResponse] = useState([]);
    const [page, setPage] = useState(1);
    const [timeFrame, setTimeFrame] = useState('1Min');
    const [loading, setLoading] = useState(true);
    const [receivingData, setReceivingData] = useState(false);
    const chartContainerRef = useRef();
    const seriesRef = useRef();
    const hasRequestedMoreDataRef = useRef(false);

    useEffect(() => {

        socket.current = new WebSocket('ws://localhost:8000/ws/chart/');

        socket.current.onopen = () => {
            console.log('WebSocket is open now.');
            sendMessage(timeFrame, 1);
            socket.current.send(JSON.stringify({ request: "volume" }))
        };

        socket.current.onclose = () => {
            console.log('WebSocket is closed now.');
        };

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.volume_24h !== undefined) {
                onVolume24hUpdate(data.volume_24h);
                return;
            }
            if (data.error) {
                return;
            }

            setResponse(prevData => {
                const combinedData = Array.isArray(data) ? [...prevData, ...data] : [...prevData, data];
                combinedData.sort((a, b) => a.time - b.time);

                const uniqueData = combinedData.filter((item, index, self) =>
                    index === self.findIndex((t) => t.time === item.time)
                );

                console.log('Updated uniqueData:', uniqueData);
                console.log(uniqueData);

                if (uniqueData.length > 0) {
                    const lastClosePrice = uniqueData[uniqueData.length - 1].close;
                    onLastClosePriceUpdate(lastClosePrice);

                    if (data.volume_24h !== undefined) {
                        onVolume24hUpdate(data.volume_24h);
                    }
                }

                return uniqueData;
            });

            setReceivingData(false);
            setLoading(false);
            hasRequestedMoreDataRef.current = false;
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [timeFrame, onVolume24hUpdate, onLastClosePriceUpdate]);

    const sendMessage = (keyword, page) => {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            console.log(`Sending message: keyword=${keyword}, page=${page}`);

            socket.current.send(JSON.stringify({ request: "chart", keyword, page }));
            setReceivingData(true);
        }
    };

    useEffect(() => {
        console.log("Rendering chart...");

        if (response.length === 0) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: "#000000",
            },
            height: 500,
            timeScale: {
                timeVisible: true,
            },
            localization: {
                timeFormatter: businessDayOrTimestamp => {
                    return new Date(businessDayOrTimestamp * 1000).toLocaleString();
                },
            },
            priceScale: {
                borderColor: '#cccccc', // Border color to light grey
            },
            grid: {
                vertLines: {
                    color: '#e0e0e0', // Vertical grid lines to light grey
                },
                horzLines: {
                    color: '#e0e0e0', // Horizontal grid lines to light grey
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
                vertLine: {
                    color: '#758696',
                    width: 1,
                    style: 0,
                    visible: true,
                    labelVisible: true,
                },
                horzLine: {
                    color: '#758696',
                    width: 1,
                    style: 0,
                    visible: true,
                    labelVisible: true,
                },
            },
        });

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const newSeries = chart.addCandlestickSeries({
            upColor: 'rgb(86, 197, 58)', // Green color for up candles
            borderUpColor: 'rgb(86, 197, 58)',
            wickUpColor: 'rgb(86, 197, 58)',
            downColor: 'rgb(255, 116, 116)', // Red color for down candles
            borderDownColor: 'rgb(255, 116, 116)',
            wickDownColor: 'rgb(255, 116, 116)',
            priceFormat: {
                type: 'price',
                precision: 8, // Precision for price display
                minMove: 0.00000001,
            },
        });

        const newData = response.map((e) => ({
            time: e.time,
            open: e.open,
            high: e.high,
            low: e.low,
            close: e.close,
        }));

        newSeries.setData(newData);
        seriesRef.current = newSeries;

        window.addEventListener('resize', handleResize);

        const handleTimeRangeChange = (newVisibleTimeRange) => {
            const { from } = newVisibleTimeRange;
            const firstDataTime = newData[0].time;

            if (from <= firstDataTime && !hasRequestedMoreDataRef.current && !receivingData) {
                console.log("Requesting more data...");
                setReceivingData(true);
                hasRequestedMoreDataRef.current = true;
                setPage(prevPage => {
                    const newPage = prevPage + 1;
                    sendMessage(timeFrame, newPage);
                    return newPage;
                });
            }
        };

        chart.timeScale().subscribeVisibleTimeRangeChange(handleTimeRangeChange);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [response, receivingData, timeFrame]);

    return (
        <div className='flex flex-col w-full h-fit justify-center space-y-3 items-center'>
            <div ref={chartContainerRef} style={{ width: '100%', height: '500px' }} />
            <div className='flex flex-row w-full justify-between items-center'>
                <div className="flex justify-start items-center w-full space-x-4 sm:text-base text-sm text-black">
                    <button className={timeFrame === "1Min" ? ` delay-150 duration-300 ease-in-out text-mainBlue border-b-2 border-mainBlue` : `delay-150 duration-300 ease-in-out text-black`} onClick={() => {
                        setTimeFrame('1Min');
                        setResponse([]); // Clear previous data
                        setPage(1); // Reset page
                    }}>1Min</button>
                    <button className={timeFrame === "5Min" ? ` delay-150 duration-300 ease-in-out text-mainBlue border-b-2 border-mainBlue` : `delay-150 duration-300 ease-in-out text-black`} onClick={() => {
                        setTimeFrame('5Min');
                        setResponse([]); // Clear previous data
                        setPage(1); // Reset page
                    }}>5Min</button>
                    <button className={timeFrame === "1Hour" ? ` delay-150 duration-300 ease-in-out text-mainBlue border-b-2 border-mainBlue` : `delay-150 duration-300 ease-in-out text-black`} onClick={() => {
                        setTimeFrame('1Hour');
                        setResponse([]);
                        setPage(1);
                    }}>1Hour</button>
                    <button className={timeFrame === "1Day" ? ` delay-150 duration-300 ease-in-out text-mainBlue border-b-2 border-mainBlue` : `delay-150 duration-300 ease-in-out text-black`} onClick={() => {
                        setTimeFrame('1Day');
                        setResponse([]);
                        setPage(1);
                    }}>1Day</button>
                </div>
                <UtcClock />
            </div>
        </div>
    );
}

export default WebSocketComponent;