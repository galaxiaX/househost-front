import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import BookingsPage from "./BookingsPage";
import { IconLogout } from "../components/SvgIcon";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/login");
  }

  if (!ready) {
    return (
      <div className="flex justify-center pt-60 h-screen w-full">
        <h2 className="text-4xl">Loading...</h2>
      </div>
    );
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="fade-in text-center px-6 sm:px-10 lg:px-20 max-w-lg mx-auto">
          Logged in as {user.firstname} {user.lastname} ({user.email})
          <button
            onClick={logout}
            className="primary max-w-sm mt-5 flex justify-center gap-2 items-center"
          >
            <div>
              <IconLogout className="w-4 h-4 mt-px" />
            </div>
            <h3>Logout</h3>
          </button>
        </div>
      )}
      {subpage === "bookings" && <BookingsPage />}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
