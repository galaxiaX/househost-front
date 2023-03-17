import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import BookingsPage from "./BookingsPage";

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
    return "Loading...";
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
        <div className="fade-in">
          <div className="text-center max-w-lg mx-auto shadow">
            Logged in as {user.firstname} {user.lastname} ({user.email})
            <button onClick={logout} className="primary max-w-sm mt-5">
              Logout
            </button>
          </div>
        </div>
      )}
      {subpage === "bookings" && <BookingsPage />}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
