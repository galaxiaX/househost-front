import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div
      className="flex flex-col relative px-6- pt-4- sm:px-10- lg:px-20- min-h-screen"
      id="toppage"
    >
      <Header />
      <Outlet />
    </div>
  );
}
