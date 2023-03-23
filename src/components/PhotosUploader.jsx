import axios from "axios";
import { useState } from "react";
import PlaceImg from "./PlaceImg";
import { IconStar, IconStarFill, IconUpload, IconX } from "./SvgIcon";

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
                <IconX />
              </button>
              <button
                onClick={(ev) => selectAsMainPhoto(ev, link)}
                className="absolute top-1 left-1 text-white cursor-pointer bg-black bg-opacity-20 rounded-full"
              >
                {link === newPlace.photos[0] && (
                  <IconStarFill className="w-5 h-5 text-yellow-300" />
                )}
                {link !== newPlace.photos[0] && <IconStar />}
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
          <IconUpload className="w-7 h-7" />
          Upload
        </label>
      </div>
    </>
  );
}
