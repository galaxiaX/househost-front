import axios from "axios";
import { useEffect, useState } from "react";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  async function removeBooking(ev, bookingId) {
    ev.preventDefault();
    try {
      await axios.delete(`/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fade-in">
      <div className="mt-4 mx-auto px-6 sm:px-10 lg:px-20 w-full sm:w-9/12 lg:w-7/12 flex flex-col gap-8">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div key={booking._id} className="relative">
              <Link
                to={`/place/${booking.place._id}`}
                className="flex gap-2 bg-gray-200 shadow-lg rounded-2xl overflow-hidden"
              >
                <div className="flex aspect-square sm:aspect-auto shrink-0">
                  <PlaceImg
                    place={booking.place}
                    className={"object-cover h-32 w-32 sm:h-40 sm:w-64"}
                  />
                </div>
                <div className="overflow-hidden p-1 sm:p-2 flex flex-col gap-1">
                  <h2 className="sm:text-xl font-bold truncate border-b border-gray-300 mb-2">
                    {booking.place.title}
                  </h2>
                  <div className="text-sm sm:text-md font-normal flex gap-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                    </div>
                    <h3>{format(new Date(booking.checkin), "MMM dd")}</h3>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </div>
                    <h3>{format(new Date(booking.checkout), "MMM dd")}</h3>
                  </div>
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                    <h3>
                      {differenceInCalendarDays(
                        new Date(booking.checkout),
                        new Date(booking.checkin)
                      )}{" "}
                      night
                      {differenceInCalendarDays(
                        new Date(booking.checkout),
                        new Date(booking.checkin)
                      ) > 1 && "s"}
                    </h3>
                  </div>
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>

                    <h3>Total: ${booking.price}</h3>
                  </div>
                </div>
              </Link>
              <button
                onClick={(ev) => removeBooking(ev, booking._id)}
                className="absolute flex overflow-hidden w-7 transition-all duration-300 hover:w-24 hover:px-2 top-2 right-2 sm:top-3 sm:right-3 items-center bg-gray-400 hover:bg-red-600 text-white rounded-full"
              >
                <div className="w-7 h-7 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
                <h3>cancel</h3>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
