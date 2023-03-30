import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { IconCalendar, IconPhone, IconStar, IconUserLine } from "./SvgIcon";
import Swal from "sweetalert2";

export default function BookingWidget({ place }) {
  const [reserve, setReserve] = useState({
    checkin: "",
    checkout: "",
    guests: 0,
    phone: "",
    name: "",
  });
  const [redirect, setRedirect] = useState("");
  const [isReservePage, setIsReservePage] = useState(false);
  const { user } = useContext(UserContext);
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

  useEffect(() => {
    if (user) {
      setReserve((prevState) => ({
        ...prevState,
        ["name"]: user.firstname + " " + user.lastname,
      }));
    }
  }, [user]);

  useEffect(() => {
    const reserveEl = document.getElementById("reserve");
    const handleScroll = () => {
      if (window.scrollY > reserveEl.offsetTop) {
        setIsReservePage(true);
      } else {
        setIsReservePage(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let numberOfNights = 1;
  if (reserve.checkin && reserve.checkout) {
    numberOfNights = differenceInCalendarDays(
      new Date(reserve.checkout),
      new Date(reserve.checkin)
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setReserve((prevState) => ({ ...prevState, [name]: value }));
  }

  async function reserveThisPlace() {
    if (!user) {
      Toast.fire({
        icon: "warning",
        title: "Please log in before making a reservation.",
      });
      setRedirect("/login");
      return;
    }

    if (
      !reserve.checkin ||
      !reserve.checkout ||
      !reserve.guests ||
      !reserve.phone ||
      !reserve.name
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please fill out the form.",
      });
      return;
    }

    await axios.post("/bookings", {
      place: place._id,
      checkin: reserve.checkin,
      checkout: reserve.checkout,
      guests: reserve.guests,
      phone: reserve.phone,
      name: reserve.name,
      price: numberOfNights * place.price,
    });

    Toast.fire({
      icon: "success",
      title: "Reserved successfully",
    });
    setRedirect("/account/bookings");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      {isReservePage ? null : (
        <div className="fade-in-in fixed z-10 shadow sm:hidden bottom-0 left-0 w-full border-t bg-white">
          <div className="flex justify-between items-center px-6 h-16">
            <div>
              <h2 className="text-xl sm:text-2xl font-normal">
                <span>${place.price} </span>
                /night
              </h2>
            </div>
            <div className="flex sm:block sm:w-full items-center">
              <a
                href="#reserve"
                className="py-3 px-6 sm:w-full bg-gradient hover:opacity-70 active:opacity-90 rounded-lg text-white"
              >
                Reserve
              </a>
            </div>
          </div>
        </div>
      )}
      <aside
        className="sm:sticky flex sm:top-32 sm:right-0 h-100 my-8 sm:w-1/3 border rounded-lg shadow-xl bg-white"
        id="reserve"
      >
        <div className="flex flex-col w-full p-7 h-100 items-center">
          <div className="flex flex-col w-full gap-4">
            <h2 className="text-2xl font-normal">
              <span>${place.price} </span>
              /night
            </h2>

            <div className="flex flex-col text-sm border border-gray-400 rounded-lg relative">
              <label className="p-1 font-normal">
                <h3 className="px-1">Check-in:</h3>
                <div className="flex font-normal px-1 mb-1">
                  <IconCalendar className="w-7 border border-r-0 border-gray-300 rounded-l-full px-1" />
                  <input
                    type="date"
                    name="checkin"
                    placeholder="Check-in date"
                    value={reserve.checkin}
                    onChange={handleChange}
                    className="w-full px-2 border border-gray-300 rounded-r-full"
                  />
                </div>
              </label>

              <label className="p-1 border-t border-gray-400 font-normal">
                <h3 className="block px-1">Checkout:</h3>
                <div className="flex font-normal px-1 mb-1">
                  <IconCalendar className="w-7 border border-r-0 border-gray-300 rounded-l-full px-1" />
                  <input
                    type="date"
                    name="checkout"
                    placeholder="Checkout date"
                    value={reserve.checkout}
                    onChange={handleChange}
                    className="w-full px-2 border border-gray-300 rounded-r-full"
                  />
                </div>
              </label>

              <label className="border-t border-gray-400 px-1 font-normal">
                <h3 className="px-1">Guests:</h3>
                <div className="flex font-normal px-1">
                  <IconUserLine className="w-7 h-6 border border-r-0 border-gray-300 rounded-l-full px-1" />
                  <input
                    type="number"
                    name="guests"
                    value={reserve.guests || ""}
                    onChange={handleChange}
                    min="1"
                    max={place.maxGuests}
                    step="1"
                    placeholder={`maximum ${place.maxGuests}`}
                    className="w-full py-1 h-6 border-gray-300"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      paddingLeft: 8,
                      paddingRight: 8,
                    }}
                  />
                </div>
              </label>
              <label className="p-1 border-t border-gray-400 font-normal">
                <h3 className="px-1">Phone number:</h3>
                <div className="flex font-normal px-1 mb-1">
                  <IconPhone className="w-7 border border-r-0 border-gray-300 rounded-l-full px-1" />
                  <input
                    type="tel"
                    name="phone"
                    value={reserve.phone}
                    onChange={handleChange}
                    placeholder="000-000-0000"
                    className="w-full px-2 border border-gray-300 rounded-r-full"
                  />
                </div>
              </label>

              <label className="p-1 border-t border-gray-400 font-normal">
                <h3 className="px-1">Your name:</h3>
                <div className="flex font-normal px-1">
                  <IconStar className="w-7 h-6 border border-r-0 border-gray-300 rounded-l-full px-1" />
                  <input
                    type="text"
                    name="name"
                    value={reserve.name}
                    onChange={handleChange}
                    placeholder="ex. John Doe"
                    className="w-full py-1 h-6 border-gray-300"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      paddingLeft: 8,
                      paddingRight: 8,
                    }}
                  />
                </div>
              </label>
            </div>
            <div className="mb-4">
              <h4 className="font-normal text-gray-500">
                ${place.price} x {numberOfNights} night
                {numberOfNights > 1 && "s"}
              </h4>
              <h2 className="text-2xl font-normal">
                Total:
                <span> ${place.price * numberOfNights} </span>
              </h2>
            </div>
          </div>

          <div className="w-full items-center">
            <button
              onClick={reserveThisPlace}
              className="py-3 px-6 w-full bg-gradient hover:opacity-70 active:opacity-90 rounded-lg text-white"
            >
              Reserve
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
