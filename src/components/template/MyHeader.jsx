import { Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'


function Tooltip({ label, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      onMouseEnter={() => setShowTooltip(true)} 
      onMouseLeave={() => setShowTooltip(false)} 
      aria-label={label}
      className="relative">
      {showTooltip && (
        <div 
          style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
          className="absolute px-4 py-2 mt-2 bg-gray-800 text-white rounded text-sm whitespace-nowrap"
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

function HomeIcon(props) {
  return (
    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      title="홈"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}
export default MyHeader => {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>

        
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
        <Tooltip label="홈">
        <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
        <HomeIcon />
          </a>
        </Tooltip>

        <Tooltip label="친구">
          <a href="/friend/Friend" className="text-sm font-semibold leading-6 text-gray-900">
          <FriendIcon />
          </a>
        </Tooltip>

        
        <Tooltip label="알람">
          <a href="/friend/Friend" className="text-sm font-semibold leading-6 text-gray-900">
          <AlarmIcon />
          </a>
        </Tooltip>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 border rounded-md p-2">
        Login
        </a>
        </div>
      </nav>

    </header>
  )
}