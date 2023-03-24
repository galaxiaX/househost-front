import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center -mt-24 gap-3 h-screen">
      <h2 className="text-5xl sm:text-6xl font-bold italic">Oops!</h2>
      <h2 className="text-2xl italic">Error 404 : page not found</h2>
      <Link
        to="/"
        className="text-white bg-primary hover:opacity-80 my-4 px-4 py-2 rounded-xl"
      >
        GO BACK
      </Link>
    </div>
  );
}
