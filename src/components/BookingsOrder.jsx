import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import {
  IconArrow,
  IconBin,
  IconCalendar,
  IconCreditCard,
  IconMoon,
  IconPhone,
  IconUserLine,
} from "./SvgIcon";

export default function BookingsOrder({ bookings, setBookings, placeId }) {
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
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <div
            key={booking._id}
            className={`${placeId === booking.place ? "" : "hidden"}`}
          >
            <div className="mt-2 w-full sm:w-1/2 lg:w-2/3 flex flex-col gap-2 float-right relative">
              <div className="flex pl-2 bg-gray-200 shadow-lg rounded-2xl overflow-hidden">
                <div className="overflow-hidden p-2 flex flex-col gap-1">
                  <div className="flex gap-2 items-center border-b border-gray-300">
                    <h3>Name: {booking.name}</h3>
                  </div>

                  <div className="text-sm sm:text-md font-normal flex gap-2 items-center">
                    <IconPhone />
                    <h3>{booking.phone}</h3>
                  </div>

                  <div className="text-sm sm:text-md font-normal flex gap-2">
                    <div className="flex items-center">
                      <IconCalendar />
                    </div>
                    <h3>{format(new Date(booking.checkin), "yyyy/MM/dd")}</h3>
                    <div className="flex items-center">
                      <IconArrow />
                    </div>
                    <h3>{format(new Date(booking.checkout), "yyyy/MM/dd")}</h3>
                  </div>

                  <div className="text-sm sm:text-md font-normal flex gap-2 items-center">
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

                  <div className="text-sm sm:text-md font-normal flex gap-2 items-center">
                    <IconUserLine />
                    <h3>
                      {booking.guests} guest{booking.guests > 1 && "s"}
                    </h3>
                  </div>

                  <div className="flex gap-2 items-center">
                    <IconCreditCard />
                    <h3>Total: ${booking.price}</h3>
                  </div>
                </div>
              </div>
              <button
                onClick={(ev) => removeBooking(ev, booking._id)}
                className="absolute flex overflow-hidden w-7 transition-all duration-300 hover:w-24 hover:px-2 top-2 right-2 sm:top-3 sm:right-3 items-center bg-gray-400 hover:bg-red-600 text-white rounded-full"
              >
                <div className="w-7 h-7 p-1">
                  <IconBin />
                </div>
                <h3>cancel</h3>
              </button>
            </div>
          </div>
        ))}
    </>
  );
}
