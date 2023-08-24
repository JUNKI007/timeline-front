import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import './MainLeftRail.scss';

const mainLeftRailNavItems = [
    {
        display: 'Home',
        icon: (<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        ),
        to: '/',
        section: ''
    },
    {
        display: 'Messenger',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
        ),
        to: '/Messenger',
        section: 'Messenger'
    },
    {
        display: 'LiveStreaming',
        icon: (<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
        ),
        to: '/liveStreaming',
        section: 'LiveStreaming'
    },
    {
        display: 'Hot! Post',
        icon: (<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24" s
            strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>

        ),
        to: '/hotPost',
        section: 'HotPost'
    }
];

const MainLeftRail = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const mainLeftRailRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const handleMouseEnter = (index) => {
        setActiveIndex(index);
    };

    const [isModePopupOpen, setIsModePopupOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const mainLeftRailItem = mainLeftRailRef.current.querySelector('.mainLeftRail_menu_item');
            indicatorRef.current.style.height = `${mainLeftRailItem.clientHeight}px`;
            setStepHeight(mainLeftRailItem.clientHeight);
        }, 50);
    }, []);

    useEffect(() => {
        const curPath = location.pathname.split('/')[1] || ''; // 빈 문자열을 기본값으로 설정
        const activeItem = mainLeftRailNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(activeItem === -1 ? 0 : activeItem); // -1을 반환하는 경우 홈으로 설정
    }, [location]);



    return (
        <div style={{ padding: '50px 0px 0px 370px' }}>
            <div className="mainLeftRail">
                <div className="mainLeftRail_logo" style={{ marginBottom: '10px' }}>
                    <Link to="/">
                        <img
                            src="https://blog.kakaocdn.net/dn/bv7hY4/btsr62izhtl/SqGJatsoQiNjLDdadee1a1/img.png"
                            alt="Logo"
                            style={{ width: '55%', cursor: 'pointer', marginBottom: '10px', marginLeft: '20%' }}
                        />
                    </Link>
                </div>

                <div ref={mainLeftRailRef} className="mainLeftRail_menu">
                    <div
                        ref={indicatorRef}
                        className="mainLeftRail_menu_indicator"
                        style={{
                            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                        }}
                    ></div>
                    {
                        mainLeftRailNavItems.map((item, index) => (
                            <Link to={item.to} key={index} onMouseEnter={() => handleMouseEnter(index)}>
                                <div className={`mainLeftRail_menu_item ${activeIndex === index ? 'active' : ''}`}>
                                    <div className="mainLeftRail_menu_item_icon">
                                        {item.icon}
                                    </div>
                                    <div className="mainLeftRail_menu_item_text">
                                        {item.display}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div >
    );
};

export default MainLeftRail;
