import axios from "axios";
import { useEffect, useState } from "react";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import {
  IconArrow,
  IconBin,
  IconCalendar,
  IconCreditCard,
  IconMoon,
} from "../components/SvgIcon";

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
    <>
      {bookings?.length > 0 ? (
        <div className="fade-in mt-4 mx-auto px-6 sm:px-10 lg:px-20 w-full sm:w-9/12 lg:w-7/12 flex flex-col gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="relative">
              <Link
                to={`/place/${booking.place._id}`}
                className="flex gap-2 bg-gray-200 shadow-lg rounded-2xl overflow-hidden"
              >
                <div className="flex h-32 w-32 sm:h-40 sm:w-64 overflow-hidden grow-0 shrink-0">
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
                      <IconCalendar />
                    </div>
                    <h3>{format(new Date(booking.checkin), "MMM dd")}</h3>
                    <div className="flex items-center">
                      <IconArrow />
                    </div>
                    <h3>{format(new Date(booking.checkout), "MMM dd")}</h3>
                  </div>
                  <div className="flex gap-2 items-center">
                    <IconMoon />
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
                    <IconCreditCard />

                    <h3>Total: ${booking.price}</h3>
                  </div>
                </div>
              </Link>
              <button
                onClick={(ev) => removeBooking(ev, booking._id)}
                className="absolute flex overflow-hidden w-7 transition-all duration-300 hover:w-24 hover:px-2 top-2 right-2 sm:top-3 sm:right-3 items-center bg-red-600 text-white rounded-full"
              >
                <div className="w-7 h-7 p-1">
                  <IconBin />
                </div>
                <h3>cancel</h3>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-40 items-center">
          <h3 className="text-xl sm:text-2xl">
            You don't have any bookings yet.
          </h3>
          <Link to={"/"} className="underline text-red-500">
            Go to book places?
          </Link>
        </div>
      )}
    </>
  );
}
