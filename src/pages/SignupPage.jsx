import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { IconEyeOff, IconEyeOn } from "../components/SvgIcon";

export default function SignupPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);

  async function signupUser(ev) {
    ev.preventDefault();

    if (password !== confirmPassword) {
      setShowPasswordError(true);
      return;
    }

    try {
      await axios.post("/signup", {
        firstname,
        lastname,
        email,
        password,
      });
      await Swal.fire({
        icon: "success",
        title: "Signed up successfully ",
        text: "Now you can log in.",
        showConfirmButton: false,
        timer: 1500,
      });
      setRedirect("/login");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Signed up fail",
        text: "Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  function handlePasswordChange(ev) {
    setPassword(ev.target.value);
  }

  function handleConfirmPasswordChange(ev) {
    setConfirmPassword(ev.target.value);
    setShowPasswordError(ev.target.value !== password);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="fade-in flex mt-4 grow px-6 sm:px-10 lg:px-20 justify-center items-center">
      <div className="mb-24">
        <h1 className="text-4xl text-center mb-3">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={signupUser}>
          <div className="flex justify-between box-border">
            <input
              className="border w-1/2 mr-1"
              type="text"
              placeholder="Firstname"
              required
              value={firstname}
              onChange={(ev) => setFirstname(ev.target.value)}
            />
            <input
              className="border w-1/2 ml-1"
              type="text"
              placeholder="Lastname"
              required
              value={lastname}
              onChange={(ev) => setLastname(ev.target.value)}
            />
          </div>
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
              onChange={handlePasswordChange}
              autoComplete="new-password"
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

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            autoComplete="new-password"
          />

          <div className="text-red-500 text-sm px-3 py-1 h-7">
            {showPasswordError && "Passwords do not match."}
          </div>

          <button className="primary">Sign up</button>
          <div className="text-center py-2 text-gray-500">
            Have an account?
            <Link to={"/login"} className="underline text-black ml-1">
              Log in now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
