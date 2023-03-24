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
      src={`${import.meta.env.VITE_IMG_URL}/${place.photos[index]}`}
      className={className}
      loading="lazy"
    />
  );
}
