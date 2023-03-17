import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

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
      setRedirect("/login");
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
    setRedirect("/account/bookings");
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      {isReservePage ? null : (
        <div className="fade-in-in fixed z-10 sm:hidden bottom-0 left-0 w-full border-t-2 bg-white">
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
        className="sm:sticky z-20 flex sm:top-32 sm:right-0 h-100 my-8 sm:w-1/3 border-2 rounded-lg shadow-xl bg-white"
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
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-7 border border-r-0 border-gray-300 rounded-l-full px-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3.5a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-2a.5.5 0 00-1 0v2A1.5 1.5 0 006.5 14h8a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-8A1.5 1.5 0 005 3.5v2a.5.5 0 001 0v-2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M11.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 10-.708.708L10.293 7.5H1.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708l3-3z"
                    />
                  </svg>
                  <input
                    type="date"
                    name="checkin"
                    value={reserve.checkin}
                    onChange={handleChange}
                    className="w-full px-2 border border-gray-300 rounded-r-full"
                  />
                </div>
              </label>

              <label className="p-1 border-t border-gray-400 font-normal">
                <h3 className="block px-1">Checkout:</h3>
                <div className="flex font-normal px-1 mb-1">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-7 border border-r-0 border-gray-300 rounded-l-full px-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 12.5a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-8a.5.5 0 00-.5.5v2a.5.5 0 01-1 0v-2A1.5 1.5 0 016.5 2h8A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 015 12.5v-2a.5.5 0 011 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M.146 8.354a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L1.707 7.5H10.5a.5.5 0 010 1H1.707l2.147 2.146a.5.5 0 01-.708.708l-3-3z"
                    />
                  </svg>
                  <input
                    type="date"
                    name="checkout"
                    value={reserve.checkout}
                    onChange={handleChange}
                    className="w-full px-2 border border-gray-300 rounded-r-full"
                  />
                </div>
              </label>

              <label className="border-t border-gray-400 px-1 font-normal">
                <h3 className="px-1">Guests:</h3>
                <div className="flex font-normal px-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-6 border border-r-0 border-gray-300 rounded-l-full px-1"
                  >
                    <path d="M12 2a5 5 0 105 5 5 5 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3zm9 11v-1a7 7 0 00-7-7h-4a7 7 0 00-7 7v1h2v-1a5 5 0 015-5h4a5 5 0 015 5v1z" />
                  </svg>
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
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 border border-r-0 border-gray-300 rounded-l-full px-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-6 border border-r-0 border-gray-300 rounded-l-full px-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>

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
              disabled={!reserve.phone && !reserve.guests}
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
