import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import PlaceImg from "../components/PlaceImg";
import { IconSlideUp } from "../components/SvgIcon";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [limit, setLimit] = useState(12);
  const { ready } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/places");
        const shuffledPlaces = response.data.sort(() => 0.5 - Math.random());
        setPlaces(shuffledPlaces);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!ready) {
    return (
      <div className="flex justify-center pt-60 h-screen w-full">
        <div className="loader"></div>
      </div>
    );
  }

  const visiblePlaces = places.slice(0, limit);

  return (
    <>
      {visiblePlaces?.length > 0 ? (
        <div className="fade-in mx-auto grid px-6 sm:px-10 lg:px-20 sm:grid-cols-3 lg:grid-cols-4 gap-y-6 sm:gap-x-4 lg:gap-x-6 my-6">
          {visiblePlaces.map((place) => (
            <Link
              to={`/place/${place._id}#toppage`}
              key={place._id}
              className="max-w-sm"
            >
              <div className="h-72 w-full sm:h-52 lg:h-80 rounded-xl overflow-hidden flex">
                <PlaceImg
                  place={place}
                  className="object-cover h-72 w-full sm:h-52 lg:h-80"
                />
              </div>

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
      ) : (
        <div className="flex justify-center mt-56">
          <h3 className="text-2xl sm:text-3xl">No places to show</h3>
        </div>
      )}

      {places.length > limit && (
        <div className="flex justify-center w-full mt-6">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md"
            onClick={() => setLimit(limit + 12)}
          >
            Show more
          </button>
        </div>
      )}
      {places.length > 0 && (
        <a
          href="#toppage"
          className="p-2 flex text-xl gap-2 my-10 justify-end sm:justify-center"
        >
          <h3>Back to top</h3>
          <IconSlideUp className="w-6 h-6 mt-1" />
        </a>
      )}
    </>
  );
}
