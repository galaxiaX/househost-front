import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="flex flex-col relative min-h-screen" id="toppage">
      <div className="z-20">
        <Header />
      </div>

      <Outlet />
    </div>
  );
}
