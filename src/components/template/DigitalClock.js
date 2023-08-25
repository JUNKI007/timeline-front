import React, { useState, useEffect } from "react";
import './DigitalClock.scss';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
    });

    const [hours, ampm] = formattedTime.split(' ');
    const [hoursFormatted, minutes] = hours.split(':');

    return (
        <div className="clock">
            <img src="https://blog.kakaocdn.net/dn/dtWdAs/btsr60lsi1G/Fh3K0ek5mn7wUNQKurUYm0/img.png" alt="Clock" />
            <h2>{hoursFormatted}:{minutes} <br /></h2>
            <h4>{ampm}</h4>
        </div>
    );
};


export default Clock;
