import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceImg from "../components/PlaceImg";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="fade-in mx-auto grid px-6 sm:px-10 lg:px-20 sm:grid-cols-3 lg:grid-cols-4 gap-y-6 sm:gap-x-4 lg:gap-x-6 my-6">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id} className="max-w-sm">
            <PlaceImg
              place={place}
              className={"object-cover rounded-xl aspect-video"}
            />

            <div className="mt-3">
              <h2 className="truncate">{place.title}</h2>
              <h3 className="text-sm text-gray-700 truncate">
                {place.address || "City, Country"}
              </h3>

              <h2 className="text-sm font-normal">
                <span className="text-lg">${place.price || "???"} </span>
                /night
              </h2>
            </div>
          </Link>
        ))}
    </div>
  );
}
