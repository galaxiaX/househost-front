import axios from "axios";
import { useState } from "react";
import PlaceImg from "./PlaceImg";

export default function PhotosUploader({ newPlace, setNewPlace }) {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setNewPlace((prevState) => ({
      ...prevState,
      ["photos"]: [...prevState.photos, filename],
    }));

    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i in files) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        header: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setNewPlace((prevState) => ({
          ...prevState,
          ["photos"]: [...prevState.photos, ...filenames],
        }));
      });
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    setNewPlace((prevState) => ({
      ...prevState,
      ["photos"]: [...prevState.photos.filter((photo) => photo !== filename)],
    }));
  }

  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    setNewPlace((prevState) => ({
      ...prevState,
      ["photos"]: [
        filename,
        ...newPlace.photos.filter((photo) => photo !== filename),
      ],
    }));
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="url"
          value={photoLink}
          onChange={(ev) => {
            setPhotoLink(ev.target.value);
          }}
          placeholder="place a link image here"
        />
        <button
          className="bg-gray-200 hover:bg-gray-300 hover:shadow-md px-4 mb-2 rounded-2xl whitespace-nowrap"
          onClick={addPhotoByLink}
          disabled={!photoLink}
        >
          <h3 className="sm:hidden">+</h3>
          <h3 className="hidden sm:block">Add photo</h3>
        </button>
      </div>

      <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        {newPlace.photos.length > 0 &&
          newPlace.photos.map((link, index) => (
            <div key={link} className="flex h-20 sm:h-28 lg:h-32 relative">
              <PlaceImg
                place={newPlace}
                className={"rounded-2xl w-full object-cover"}
                index={index}
              />
              <button
                onClick={(ev) => removePhoto(ev, link)}
                className="absolute top-1 right-1 text-white cursor-pointer bg-black bg-opacity-20 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={(ev) => selectAsMainPhoto(ev, link)}
                className="absolute top-1 left-1 text-white cursor-pointer bg-black bg-opacity-20 rounded-full"
              >
                {link === newPlace.photos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== newPlace.photos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}

        <label className="flex flex-col sm:flex-row justify-center items-center h-20 sm:h-28 lg:h-32 sm:gap-1 cursor-pointer border bg-transparent rounded-2xl p-2 text-xl text-gray-600 hover:bg-gray-200 hover:shadow-md">
          <input
            type="file"
            multiple
            className="hidden"
            accept="image/*"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}