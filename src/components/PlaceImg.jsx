export default function PlaceImg({
  place,
  index = 0,
  className = "object-cover",
}) {
  if (!place.photos?.length) {
    return "";
  }

  return <img src={place.photos[index]} className={className} loading="lazy" />;
}
