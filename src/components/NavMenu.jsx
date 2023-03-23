import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import {
  IconGithub,
  IconX,
  IconUser,
  IconBook,
  IconHome,
  IconLogin,
  IconLogout,
} from "./SvgIcon";

export default function NavMenu({ toggleMenu, handleToggle }) {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    handleToggle();
    setUser(null);
    setRedirect(true);
  }

  if (redirect && !user) {
    setRedirect(false);
    return <Navigate to={"/login"} />;
  }

  return (
    <ul
      id="mySideMenu"
      className={`absolute w-2/3 z-50 h-full top-0 sm:h-auto sm:w-auto font-normal sm:left-auto sm:right-16 lg:right-28 sm:top-16 shadow-gray-500 sm:rounded-xl overflow-hidden bg-white sm:border flex flex-col ${
        toggleMenu
          ? "left-0 sm:opacity-100 shadow-lg"
          : "-left-2/3 sm:opacity-0 sm:invisible"
      } t transition-move duration-500`}
    >
      <li>
        <div className="cursor-pointer mt-16 sm:mt-0 flex">
          <a
            target="_blank"
            href="https://github.com/galaxiaX"
            className="w-1/2 hover:bg-slate-200 flex justify-center py-5 sm:py-1"
          >
            <IconGithub className="w-9 sm:w-7" />
          </a>
          <div
            onClick={handleToggle}
            className="w-1/2 flex justify-center hover:bg-slate-200"
          >
            <IconX className="w-10 sm:w-8" />
          </div>
        </div>
      </li>
      <li>
        <div className="text-xl sm:text-sm border-y sm:w-40 py-5 sm:py-3 sm:px-4 px-6 flex hover:bg-slate-200">
          <h3 className="truncate">
            {user ? user?.firstname + " " + user?.lastname : "Anonymous"}
          </h3>
        </div>
      </li>
      <li>
        <Link
          to={user ? "/account" : "/login"}
          onClick={handleToggle}
          className="font-normal text-xl sm:text-sm sm:w-40 py-5 sm:py-3 sm:px-4 px-6 flex hover:bg-slate-200 justify-between items-center"
        >
          <h3>My Profile</h3>
          <IconUser className="w-6 h-6" />
        </Link>
      </li>
      <li>
        <Link
          to={user ? "/account/bookings" : "/login"}
          onClick={handleToggle}
          className="font-normal text-xl sm:text-sm sm:w-40 py-5 sm:py-3 sm:px-4 px-6 flex hover:bg-slate-200 justify-between items-center"
        >
          <h3>My Bookings</h3>
          <IconBook />
        </Link>
      </li>
      <li>
        <Link
          to={user ? "/account/places" : "/login"}
          onClick={handleToggle}
          className="font-normal border-b text-xl sm:text-sm sm:w-40 py-5 sm:py-3 sm:px-4 px-6 flex hover:bg-slate-200 justify-between items-center"
        >
          <h3>My Places</h3>
          <IconHome className="w-6 h-6" />
        </Link>
      </li>
      <li>
        <Link
          to={"/login"}
          onClick={handleToggle}
          className={`font-normal text-xl sm:text-sm sm:w-40 py-5 sm:py-3 sm:px-4 px-6 flex hover:bg-slate-200 w-full justify-between items-center ${
            user && "hidden"
          }`}
        >
          <h3>Login</h3>
          <IconLogin className="w-6 h-6" />
        </Link>
      </li>
      <li>
        <button
          onClick={logout}
          className={`font-normal text-xl sm:text-sm sm:w-40 py-5 sm:py-3 sm:px-4 px-6 flex hover:bg-slate-200 w-full justify-between items-center ${
            !user && "hidden"
          }`}
        >
          <h3>Logout</h3>
          <IconLogout className="w-6 h-6" />
        </button>
      </li>
    </ul>
  );
}
