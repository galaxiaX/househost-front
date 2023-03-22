import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import BookingsOrder from "../components/BookingsOrder";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [toggleBookings, setToggleBookings] = useState(false);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  function handleToggle() {
    setToggleBookings((prevState) => !prevState);
  }

  async function removePlace(ev, placeId) {
    ev.preventDefault();

    try {
      await axios.delete(`/places/${placeId}`);
      setPlaces(places.filter((place) => place._id !== placeId));
    } catch (error) {
      console.error(error);
    }
  }

  async function getPlaceBookings(placeId) {
    try {
      const { data } = await axios.get(`/places/${placeId}/bookings`);
      setBookings(data);
      handleToggle();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mb-10 px-6 sm:px-10 lg:px-20">
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex gap-1 shadow bg-gradient text-white py-2 px-6 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="mt-4 mx-auto w-full sm:w-9/12 lg:w-7/12 flex flex-col">
        {places.length > 0 &&
          places.map((place) => (
            <div className="relative mb-3" key={place.title}>
              <Link
                to={`/account/places/${place._id}`}
                className="relative flex gap-4 bg-gray-200 shadow cursor-pointer overflow-hidden rounded-2xl"
              >
                <div className="flex aspect-square sm:aspect-auto overflow-hidden bg-gray-300 grow-0 shrink-0">
                  <PlaceImg
                    place={place}
                    className={"object-cover h-32 w-32 sm:h-40 sm:w-64"}
                  />
                </div>
                <div className="h-32 sm:h-36 w-full flex flex-col overflow-y-auto py-2 pr-8">
                  <h2 className="sm:text-xl font-bold border-b border-gray-300 mr-3">
                    {place.title}
                  </h2>
                  <p className="text-sm font-normal pt-2 truncate">
                    {place.address}
                  </p>
                  <p className="text-sm font-normal pt-1">
                    ${place.price} /night
                  </p>
                  <p className="text-sm font-normal pt-1">
                    {place.photos.length} photos
                  </p>
                </div>
              </Link>
              <button
                onClick={(ev) => removePlace(ev, place._id)}
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
                <h3>remove</h3>
              </button>

              <button
                className="absolute p-1 justify-center flex top-24 sm:top-32 right-2 sm:right-3 bg-blue-500 hover:bg-blue-400 text-white rounded-full"
                onClick={() => getPlaceBookings(place._id)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 shrink-0"
                >
                  <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" />
                </svg>
              </button>
              <div className={`${!toggleBookings && "hidden"}`}>
                <BookingsOrder
                  bookings={bookings}
                  setBookings={setBookings}
                  placeId={place._id}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
