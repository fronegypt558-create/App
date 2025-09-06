import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";

export default function Layout() {

  return (
    <>
    <Sidebar/>
    <div className="p-4 sm:ml-64">
        <Outlet/>
    </div>
    </>
  )
}