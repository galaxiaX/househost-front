import { Link } from "react-router-dom";
import { useState } from "react";

import NavMenu from "./NavMenu";

export default function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleToggle() {
    setToggleMenu((prevState) => !prevState);
  }

  return (
    <header className="flex justify-between border-b border-gray-300 px-6 sm:px-10 lg:px-20 py-4 sm:relative">
      <Link to={"/"} className="flex items-center gap-1">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
          <path
            fillRule="evenodd"
            d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
            clipRule="evenodd"
          />
        </svg>

        <span className="hidden sm:inline-flex font-bold text-xl">
          HomeHost
        </span>
      </Link>
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-gray-300">
        <div>Anywhere</div>
        <div className="border border-l border-gray-300 hidden sm:inline-flex"></div>
        <div className="hidden sm:inline-flex">Any week</div>
        <div className="border border-l border-gray-300 hidden sm:inline-flex"></div>
        <div className="hidden sm:inline-flex">Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full w-7 h-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <button
        type="button"
        className="hidden sm:flex items-center gap-2 shadow-lg border border-gray-300 rounded-full py-2 px-3 sm:px-2"
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border-2 border-gray-500 overflow-hidden hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
      <button
        type="button"
        className="sm:hidden flex items-center gap-2 shadow-lg border border-gray-300 rounded-full py-2 px-3 sm:px-2"
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <NavMenu toggleMenu={toggleMenu} handleToggle={handleToggle} />
    </header>
  );
}
