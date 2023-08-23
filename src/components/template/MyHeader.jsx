import { useState } from 'react'

import { Popover } from '@headlessui/react'



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

function FriendIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      fill="none" v
      ViewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function AlarmIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
    </svg>
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
          <a href="/login" className="text-sm font-semibold leading-6 text-gray-900 border rounded-md p-2">
            Login
          </a>
        </div>
      </nav>

    </header>
  )
}