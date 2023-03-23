import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import Offers from "../components/Offers";
import PlaceImg from "../components/PlaceImg";
import { IconLocation, IconPhoto, IconSlideUp } from "../components/SvgIcon";

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
          <IconSlideUp className="w-10 h-10 mt-12" />
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
          <IconLocation />
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
                    <IconPhoto className="w-5 sm:w-16" />
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
        <IconSlideUp className="w-6 h-6 mt-1" />
      </a>
    </div>
  );
}
