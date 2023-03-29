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
import Swal from "sweetalert2";

export default function NavMenu({ toggleMenu, handleToggle }) {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  async function logout() {
    await axios.post("/logout");
    handleToggle();
    setUser(null);
    setRedirect(true);
    Toast.fire({
      icon: "success",
      title: "You are now logged out.",
    });
  }

  redirect && <Navigate to={"/login"} />;

  return (
    <>
      <button
        onClick={handleToggle}
        className={`fixed sm:hidden w-full z-50 left-0 h-full top-0 bg-black flex ${
          toggleMenu ? "opacity-30" : "invisible opacity-0"
        } transition-opacity duration-500`}
      ></button>
      <ul
        id="mySideMenu"
        className={`fixed w-2/3 z-50 h-full top-0 sm:h-auto sm:w-auto font-normal sm:left-auto sm:right-16 lg:right-28 sm:top-16 shadow-gray-500 sm:rounded-xl overflow-hidden bg-white sm:border flex flex-col ${
          toggleMenu
            ? "left-0 sm:opacity-100 shadow-lg"
            : "-left-full left sm:opacity-0 sm:invisible"
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
            <IconUser className="w-6 h-6 -mr-px" />
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
            <IconHome className="w-6 h-6 -mr-px" />
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
            <IconLogout className="w-6 h-6 -mr-px" />
          </button>
        </li>
      </ul>
    </>
  );
}
