export default function PlaceImg({
  place,
  index = 0,
  className = "object-cover",
}) {
  if (!place.photos?.length) {
    return "";
  }

  return (
    <img
      src={`${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/${
        place.photos[index]
      }`}
      className={className}
    />
  );
}
