import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import BookingsOrder from "../components/BookingsOrder";
import { IconBin, IconTriangle, IconX } from "../components/SvgIcon";

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
          <IconX className="w-6 h-6 rotate-45" />
          Add new place
        </Link>
      </div>

      <div className="mt-4 mx-auto w-full sm:w-9/12 lg:w-7/12 flex flex-col">
        {places.length > 0 &&
          places.map((place) => (
            <div className="relative mb-4" key={place.title}>
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
                className="absolute flex overflow-hidden w-7 transition-all duration-300 hover:w-24 hover:px-2 top-2 right-2 sm:top-3 sm:right-3 items-center bg-red-600 text-white rounded-full"
              >
                <div className="w-7 h-7 p-1">
                  <IconBin />
                </div>
                <h3>remove</h3>
              </button>

              <button
                className={`absolute p-1 justify-center transition-all duration-500 flex top-24 sm:top-32 right-2 sm:right-3 bg-blue-500 hover:bg-blue-400 text-white rounded-full ${
                  toggleBookings && "rotate-180"
                }`}
                onClick={() => getPlaceBookings(place._id)}
              >
                <IconTriangle />
              </button>
              <div className={`${!toggleBookings && "hidden"} flex flex-col`}>
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
