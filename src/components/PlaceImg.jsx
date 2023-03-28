import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function PlaceImg({
  place,
  index = 0,
  className = "object-cover h-full",
}) {
  if (!place.photos?.length) {
    return "";
  }

  return (
    <LazyLoadImage
      src={place.photos[index]}
      className={className}
      loading="lazy"
      effect="blur"
    />
  );
}
