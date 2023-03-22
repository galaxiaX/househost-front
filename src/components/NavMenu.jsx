import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";

export default function NavMenu({ toggleMenu, handleToggle }) {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/login");
    handleToggle();
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <ul
      id="mySideMenu"
      className={`absolute w-2/3 z-50 h-full top-0 sm:h-auto sm:w-auto font-normal sm:left-auto sm:right-16 lg:right-28 sm:top-16 shadow-lg sm:rounded-xl overflow-hidden bg-white border flex flex-col ${
        toggleMenu
          ? "left-0 sm:opacity-100"
          : "-left-2/3 sm:opacity-0 sm:invisible"
      } t transition-move duration-500`}
    >
      <li>
        <div
          onClick={handleToggle}
          className="sm:hidden- cursor-pointer mt-16 sm:mt-0 py-5 sm:py-1 px-4 flex justify-end  hover:bg-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 sm:w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
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
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
          </svg>
        </Link>
      </li>
      <li>
        <Link
          to={user ? "/account/bookings" : "/login"}
          onClick={handleToggle}
          className="font-normal text-xl sm:text-sm sm:w-40 py-5 sm:py-3 sm:px-4 px-6 flex hover:bg-slate-200 justify-between items-center"
        >
          <h3>My Bookings</h3>
          <svg viewBox="0 0 448 512" fill="currentColor" className="w-5">
            <path d="M0 96C0 43 43 0 96 0h96v190.7c0 13.4 15.5 20.9 26 12.5l54-43.2 54 43.2c10.5 8.4 26 .9 26-12.5V0h64c17.7 0 32 14.3 32 32v320c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V96zm64 320c0 17.7 14.3 32 32 32h256v-64H96c-17.7 0-32 14.3-32 32z" />
          </svg>
        </Link>
      </li>
      <li>
        <Link
          to={user ? "/account/places" : "/login"}
          onClick={handleToggle}
          className="font-normal border-b text-xl sm:text-sm sm:w-40 py-5 sm:py-3 sm:px-4 px-6 flex hover:bg-slate-200 justify-between items-center"
        >
          <h3>My Places</h3>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
            <path
              fillRule="evenodd"
              d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
              clipRule="evenodd"
            />
          </svg>
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
          <svg viewBox="0 0 900 1000" fill="currentColor" className="w-6 h-6">
            <path d="M800 50c28 0 51.667 9.667 71 29s29 43 29 71v700c0 26.667-9.667 50-29 70s-43 30-71 30H350c-26.667 0-49.667-10-69-30s-29-43.333-29-70V750h98v100h450V150H350v150h-98V150c0-28 9.667-51.667 29-71s42.333-29 69-29h450M450 720V600H0V450h450V330l200 194-200 196" />
          </svg>
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
          <svg viewBox="0 0 900 1000" fill="currentColor" className="w-6 h-6">
            <path d="M502 850V750h98v100c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 876.667 0 850V150c0-28 10-51.667 30-71s43.333-29 70-29h400c28 0 51.667 9.667 71 29s29 43 29 71v150h-98V150H100v700h402m398-326L702 720V600H252V450h450V330l198 194" />
          </svg>
        </button>
      </li>
    </ul>
  );
}