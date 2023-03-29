import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";

export default function PlacesFormPage() {
  const { id } = useParams();

  const [newPlace, setNewPlace] = useState({
    title: "",
    address: "",
    photoLink: "",
    photos: [],
    description: "",
    bedroom: 0,
    bed: 0,
    bath: 0,
    maxGuests: 0,
    perks: [],
    extraInfo: "",
    checkin: "",
    checkout: "",
    price: 0,
  });

  const [redirect, setRedirect] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setNewPlace(data);
    });
  }, [id]);

  const placeInfo = {
    title: [
      "Title",
      "Title for your place, should be short and catchy as in advertisement.",
    ],
    address: ["Address", "Your place location such as cityname, country, etc."],
    photos: ["Photos", "Photos for your place, more = better"],
    description: ["Description", "description of the place"],
    room: ["Room", "add number of rooms and facility your place have"],
    perks: ["Perks", "select all the perks of your place"],
    extraInfo: ["Extra info", "house rule, etc"],
    checkinCheckout: [
      "Check-in & Checkout",
      "add check in and out times, remember to have some time window for cleaning the room between guests",
    ],
    price: [
      "Price per night",
      "Price for your place, it should be in USD/night",
    ],
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setNewPlace((prevState) => ({ ...prevState, [name]: value }));
  }

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm mb-2">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    if (id) {
      newPlace.id = id;
      await axios.put("/places", newPlace);
      Toast.fire({
        icon: "success",
        title: "Your place has been updated.",
      });
    } else {
      await axios.post("/places", newPlace);
      Toast.fire({
        icon: "success",
        title: "Your place has been saved.",
      });
    }

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="mx-auto px-6 mb-10 sm:px-10 lg:px-20 sm:w-11/12 lg:w-10/12">
      <AccountNav />
      <form onSubmit={savePlace} className="fade-in">
        {preInput(placeInfo.title[0], placeInfo.title[1])}
        <input
          type="text"
          name="title"
          value={newPlace.title}
          onChange={handleChange}
          required
          placeholder="title, for my lovely apt."
        />

        {preInput(placeInfo.address[0], placeInfo.address[1])}
        <input
          type="text"
          name="address"
          value={newPlace.address}
          onChange={handleChange}
          required
          placeholder="ex. Bang Sue, Bangkok, Thailand"
        />

        {preInput(placeInfo.photos[0], placeInfo.photos[1])}
        <PhotosUploader
          newPlace={newPlace}
          handleChange={handleChange}
          setNewPlace={setNewPlace}
        />

        {preInput(placeInfo.description[0], placeInfo.description[1])}
        <textarea
          name="description"
          value={newPlace.description}
          onChange={handleChange}
          required
        />

        {preInput(placeInfo.room[0], placeInfo.room[1])}
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <h3 className="mt-2">Bedroom</h3>
            <input
              type="number"
              name="bedroom"
              min="1"
              max="1000"
              step="1"
              placeholder="number of your bedroom(s)"
              value={newPlace.bedroom || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h3 className="mt-2">Bed</h3>
            <input
              type="number"
              name="bed"
              min="1"
              max="1000"
              step="1"
              placeholder="number of your bed(s)"
              value={newPlace.bed || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h3 className="mt-2">Bath</h3>
            <input
              type="number"
              name="bath"
              min="1"
              max="1000"
              step="1"
              placeholder="number of your bath(s)"
              value={newPlace.bath || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h3 className="mt-2">Max guests</h3>
            <input
              type="number"
              name="maxGuests"
              min="1"
              max="1000"
              step="1"
              placeholder="minimum 1"
              value={newPlace.maxGuests || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {preInput(placeInfo.perks[0], placeInfo.perks[1])}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <Perks newPlace={newPlace} setNewPlace={setNewPlace} />
        </div>

        {preInput(placeInfo.extraInfo[0], placeInfo.extraInfo[1])}
        <textarea
          name="extraInfo"
          value={newPlace.extraInfo}
          onChange={handleChange}
          required
        />

        {preInput(placeInfo.checkinCheckout[0], placeInfo.checkinCheckout[1])}
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <h3 className="mt-2">Check-in time</h3>
            <input
              type="time"
              name="checkin"
              value={newPlace.checkin}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h3 className="mt-2">Check out time</h3>
            <input
              type="time"
              name="checkout"
              value={newPlace.checkout}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {preInput(placeInfo.price[0], placeInfo.price[1])}
        <input
          type="number"
          name="price"
          min="1"
          max="1000000"
          step="1"
          placeholder="ex. $100/night"
          value={newPlace.price || ""}
          onChange={handleChange}
          required
        />

        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}
