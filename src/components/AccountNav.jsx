import { Link, useLocation } from "react-router-dom";
import { IconBook, IconHome, IconUser } from "./SvgIcon";

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
        <IconUser className="w-6 h-6 shrink-0" />
        <h3 className={textClasses("profile")}>My profile</h3>
      </Link>
      <Link to={"/account/bookings"} className={linkClasses("bookings")}>
        <IconBook className="w-5 h-5 shrink-0" />
        <h3 className={textClasses("bookings")}>My bookings</h3>
      </Link>
      <Link to={"/account/places"} className={linkClasses("places")}>
        <IconHome className="w-6 h-6 shrink-0" />
        <h3 className={textClasses("places")}>My places</h3>
      </Link>
    </nav>
  );
}
