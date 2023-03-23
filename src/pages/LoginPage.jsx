import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { IconEyeOff, IconEyeOn } from "../components/SvgIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState("");
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
      alert("Login successfull");
      setRedirect(true);
    } catch (err) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="fade-in flex px-6 sm:px-10 lg:px-20 mt-4 grow justify-center items-center">
      <div className="mb-48">
        <h1 className="text-4xl text-center mb-3">Login</h1>
        <form
          className="w-full sm:max-w-md mx-auto"
          onSubmit={handleLoginSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            autoComplete="email"
          />
          <label className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              autoComplete="current-password"
              style={{ paddingRight: 40 }}
            />
            <button
              type="button"
              className="flex absolute -top-2 right-3 bg-transparent translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IconEyeOff /> : <IconEyeOn />}
            </button>
          </label>

          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500 sm:flex sm:justify-center">
            <div>Don't have an account yet?</div>
            <Link to={"/signup"} className="underline text-black ml-1">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
