import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

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
      alert("Registration successful, Now you can log in.");
      setRedirect("/login");
    } catch (err) {
      alert("Registration failed, Please try again.");
    }
  }

  function handlePasswordChange(ev) {
    setPassword(ev.target.value);
    setShowPasswordError(ev.target.value !== confirmPassword);
  }

  function handleConfirmPasswordChange(ev) {
    setConfirmPassword(ev.target.value);
    setShowPasswordError(ev.target.value !== password);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="fade-in flex mt-4 grow justify-center items-center">
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
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                </svg>
              )}
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
