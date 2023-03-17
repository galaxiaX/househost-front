import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import Offers from "../components/Offers";
import PlaceImg from "../components/PlaceImg";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <button
        onClick={() => setShowAllPhotos(false)}
        className="fade-in absolute inset-0 bg-white h-full w-full"
      >
        <div className="h-60 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white text-2xl">
          Click anywhere to close
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 mt-12"
          >
            <path
              fillRule="evenodd"
              d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className=" sm:px-32 lg:px-60 grid gap-4 bg-black bg-opacity-80">
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div className="sticky top-0" key={photo}>
                <PlaceImg place={place} className={"w-full"} index={index} />
              </div>
            ))}
        </div>
        <div className="sticky top-0 h-screen bg-black bg-opacity-80 flex justify-center items-center text-white text-2xl">
          Click anywhere to close
        </div>
      </button>
    );
  }

  return (
    <div className="fade-in mt-6 max-w-screen-xl  px-6 sm:px-10 lg:px-48 mx-auto">
      <div>
        <h1 className="text-2xl mb-1 flex-wrap">{place.title}</h1>
        <a
          target="_blank"
          href={`https://maps.google.com/?q=${place.address}`}
          rel="noopener noreferrer"
          title={`Go to Google Maps and search for ${place.address}`}
          className="underline text-gray-700 flex-wrap inline-flex gap-1 items-center"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2c3.31 0 6 2.66 6 5.95C18 12.41 12 19 12 19S6 12.41 6 7.95C6 4.66 8.69 2 12 2m0 4a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2m8 13c0 2.21-3.58 4-8 4s-8-1.79-8-4c0-1.29 1.22-2.44 3.11-3.17l.64.91C6.67 17.19 6 17.81 6 18.5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5c0-.69-.67-1.31-1.75-1.76l.64-.91C18.78 16.56 20 17.71 20 19z" />
          </svg>
          {place.address}
        </a>
      </div>
      <div className="mx-auto">
        <div
          className="grid grid-cols-[2fr_1fr] gap-2 mt-6 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setShowAllPhotos(true)}
        >
          {place.photos?.[0] && (
            <div className="flex grow">
              <PlaceImg place={place} index={0} />
            </div>
          )}

          <div className="grid gap-2">
            {place.photos?.[1] && (
              <div className="aspect-square flex">
                <PlaceImg place={place} index={1} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 relative">
              {place.photos?.[2] && (
                <div className="aspect-square flex">
                  <PlaceImg place={place} index={2} />
                </div>
              )}

              {place.photos?.[3] && (
                <div className="aspect-square">
                  <PlaceImg place={place} index={3} />
                  <button
                    onClick={() => setShowAllPhotos(true)}
                    className="flex flex-col justify-center items-center text-gray-600 hover:text-gray-700 object-cover absolute bottom-0 right-0 w-full h-full p-1 bg-white bg-opacity-60 hover:bg-opacity-40"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 sm:w-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <h1 className="text-xs sm:text-lg">Show more</h1>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative sm:flex">
        <main className="sm:w-3/5 sm:justify-items-start">
          <div className="my-8 border-b pb-8">
            <h2 className="text-2xl font-semibold">Room details</h2>
            <h3 className="font-normal">
              {place.maxGuests} guest{place.maxGuests > 1 && "s"} •{" "}
              {place.bedroom} bedroom{place.bedroom > 1 && "s"} • {place.bed}{" "}
              bed{place.bed > 1 && "s"} • {place.bath} bath
              {place.bath > 1 && "s"}
            </h3>
          </div>

          <Offers place={place} />

          <div className="my-8 border-b pb-8">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="font-normal w-full mt-3 max-h-72 overflow-y-auto">
              {place.description}
            </p>
          </div>

          <div className="my-8 border-b pb-8">
            <h2 className="text-2xl font-semibold">Extra info</h2>
            <div className="my-3">
              <p className="inline-block w-1/2 sm:w-40">
                Check-in: {place.checkin}
              </p>
              <p className="inline-block w-1/2 sm:w-40">
                Checkout: {place.checkout}
              </p>
            </div>
            <p className="font-normal w-full max-h-72 overflow-y-auto">
              {place.extraInfo}
            </p>
          </div>
        </main>
        <div className="hidden sm:block sm:w-1/12 sm:my-8"></div>
        <BookingWidget place={place} />
      </div>
      <a
        href="#toppage"
        className="p-2 flex text-xl gap-2 mb-10 justify-end sm:justify-center"
      >
        <h3>Back to top</h3>
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
            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
          />
        </svg>
      </a>
    </div>
  );
}
