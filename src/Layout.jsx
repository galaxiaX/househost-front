import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="flex flex-col relative min-h-screen" id="toppage">
      <div className="z-50">
        <Header />
      </div>
      <div className="z-10">
        <Outlet />
      </div>
    </div>
  );
}
