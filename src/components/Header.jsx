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
    <header className="flex justify-between border-b border-gray-300 px-6 sm:px-10 lg:px-20 py-4 sm:relative">
      <Link to={"/"} className="flex items-center gap-1">
        <IconHome className="w-8 h-8" />
        <span className="font-bold text-3xl sm:text-xl">HouseHost</span>
      </Link>
      <div className="hidden sm:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-gray-300">
        <div>Anywhere</div>
        <div className="border border-l border-gray-300"></div>
        <div>Any week</div>
        <div className="border border-l border-gray-300"></div>
        <div>Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full w-7 h-7">
          <IconZoom />
        </button>
      </div>
      <button
        type="button"
        className="hidden sm:flex items-center gap-2 shadow rounded-full py-2 px-3 sm:px-2"
        onClick={handleToggle}
      >
        <IconHamburger className="w-6 h-6" />
        <div className="bg-gray-500 text-white rounded-full border-2 border-gray-500 overflow-hidden hidden sm:block">
          <IconUser className="w-6 h-6 top-1" />
        </div>
      </button>
      <button
        type="button"
        className="sm:hidden flex items-center gap-2 shadow border border-gray-300 rounded-full py-2 px-3 sm:px-2"
        onClick={handleToggle}
      >
        <IconHamburger className="w-6 h-6" />
      </button>
      <NavMenu toggleMenu={toggleMenu} handleToggle={handleToggle} />
    </header>
  );
}
