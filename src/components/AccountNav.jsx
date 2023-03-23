import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClasses(type = null) {
    let classes =
      "inline-flex gap-1 shadow-sm shadow-gray-300 rounded-full flex-nowrap overflow-hidden transition-all duration-500 justify-center items-center";
    if (type === subpage) {
      classes += " bg-primary text-white py-2 px-2 sm:px-4 h-14 w-36 sm:w-60";
    } else {
      classes += " bg-gray-200 py-2 px-4 h-14 w-14 sm:w-60";
    }
    return classes;
  }

  function textClasses(type = null) {
    let classes = "overflow-hidden whitespace-nowrap";
    if (type !== subpage) {
      classes += " hidden sm:block";
    }
    return classes;
  }

  return (
    <nav className="w-full flex justify-center mt-6 mb-8 gap-2">
      <Link to={"/account"} className={linkClasses("profile")}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 shrink-0"
        >
          <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
        </svg>
        <h3 className={textClasses("profile")}>My profile</h3>
      </Link>
      <Link to={"/account/bookings"} className={linkClasses("bookings")}>
        <svg
          viewBox="0 0 448 512"
          fill="currentColor"
          className="w-5 h-5 shrink-0"
        >
          <path d="M0 96C0 43 43 0 96 0h96v190.7c0 13.4 15.5 20.9 26 12.5l54-43.2 54 43.2c10.5 8.4 26 .9 26-12.5V0h64c17.7 0 32 14.3 32 32v320c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V96zm64 320c0 17.7 14.3 32 32 32h256v-64H96c-17.7 0-32 14.3-32 32z" />
        </svg>
        <h3 className={textClasses("bookings")}>My bookings</h3>
      </Link>
      <Link to={"/account/places"} className={linkClasses("places")}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 shrink-0"
        >
          <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
          <path
            fillRule="evenodd"
            d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className={textClasses("places")}>My places</h3>
      </Link>
    </nav>
  );
}
