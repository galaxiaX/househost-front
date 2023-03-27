import { Link } from "react-router-dom";
import { useState } from "react";
import NavMenu from "./NavMenu";
import { IconHamburger, IconHome, IconUser, IconZoom } from "./SvgIcon";

export default function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleToggle() {
    setToggleMenu((prevState) => !prevState);
  }

  return (
    <>
      <div className="w-full h-20 sm:hidden"></div>
      <header className="flex z-20 sm:grid sm:grid-cols-3 justify-between border-b w-full border-gray-300 px-6 sm:px-10 lg:px-20 py-4 fixed top-0 left-0 bg-white">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center gap-1 text-primary">
            <IconHome className="w-9" />
            <span className="font-bold mt-1 text-3xl sm:text-3xl">
              HouseHost
            </span>
          </Link>
        </div>
        <div className="sm:flex justify-center">
          <div className="hidden sm:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-gray-300">
            <div>Anywhere</div>
            <div className="hidden md:flex border border-l border-gray-300"></div>
            <div className="hidden md:flex">Anyweek</div>
            <div className="hidden lg:flex border border-l border-gray-300"></div>
            <div className="hidden lg:flex">Anytime</div>
            <button className="bg-primary text-white p-1 rounded-full w-7 h-7">
              <IconZoom />
            </button>
          </div>
        </div>
        <div className="sm:flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 border shadow rounded-full py-2 px-2 sm:px-4"
            onClick={handleToggle}
          >
            <IconHamburger className="w-6 h-6 shrink-0" />
            <div className="hidden sm:block bg-gray-500 text-white rounded-full border-2 border-gray-500 overflow-hidden">
              <IconUser className="w-6 h-6 top-1 shrink-0" />
            </div>
          </button>
        </div>
        <NavMenu toggleMenu={toggleMenu} handleToggle={handleToggle} />
      </header>
    </>
  );
}
