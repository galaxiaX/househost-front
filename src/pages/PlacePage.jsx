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
      <a
        href="#toppage"
        onClick={() => setShowAllPhotos(false)}
        className="fade-in z-50 absolute inset-0 bg-zinc-800 h-full w-full"
      >
        <div className="h-60 bg-zinc-800 flex flex-col justify-center items-center text-white text-2xl">
          Click anywhere to close
          <IconSlideUp className="w-10 h-10 mt-12" />
        </div>
        <div className=" sm:px-32 lg:px-60 bg-zinc-800 grid">
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div className="sticky top-0" key={photo}>
                <PlaceImg place={place} className="w-full" index={index} />
                <div className="h-6 w-full bg-zinc-800"></div>
              </div>
            ))}
        </div>
        <div className="sticky top-0 h-screen bg-zinc-800 flex justify-center items-center text-white text-2xl">
          Click anywhere to close
        </div>
      </a>
    );
  }

  return (
    <div className="fade-in mt-2 sm:mt-6 w-full max-w-screen-xl px-6 sm:px-10 lg:px-48 mx-auto">
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
      <div
        className="grid photos-height grid-cols-[3fr_2fr] gap-1 sm:gap-2 mt-6 rounded-xl overflow-hidden cursor-pointer"
        onClick={() => setShowAllPhotos(true)}
      >
        {place.photos?.[0] && (
          <div className="flex object-cover">
            <PlaceImg place={place} index={0} />
          </div>
        )}

        <div className="grid grid-rows-[2fr_1fr] gap-1 sm:gap-2">
          {place.photos?.[1] && (
            <div className="flex">
              <PlaceImg place={place} index={1} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-1 sm:gap-2 relative sm:static">
            {place.photos?.[2] && (
              <div className="flex">
                <PlaceImg place={place} index={2} />
              </div>
            )}

            {place.photos?.[3] && (
              <div className="flex relative">
                <PlaceImg place={place} index={3} />
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="flex flex-col justify-center items-center text-gray-700 object-cover absolute bottom-0 right-0 w-full h-full p-1 bg-white bg-opacity-70 hover:bg-opacity-60"
                >
                  <IconPhoto className="w-4 sm:w-8 shrink-0" />
                  <h6 className="text-xs font-normal leading-none sm:text-sm">
                    {place.photos.length - 3} more photos
                  </h6>
                </button>
              </div>
            )}
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
