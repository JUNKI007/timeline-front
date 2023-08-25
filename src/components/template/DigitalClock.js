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
            <img src="https://blog.kakaocdn.net/dn/ZUTmc/btssauNg8uo/8S045wr8s9YMM7iK8WZ5kk/img.png" alt="Clock" width="150" height="150" style={{ marginLeft: "1rem" }} />
            <h2>{hoursFormatted}:{minutes} <br /></h2>
            <h4>{ampm}</h4>
        </div>
    );
};

export default Clock;
