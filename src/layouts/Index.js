import { React, useContext } from "react";
import { Redirect } from "react-router-dom";

// context

import { UserContext } from '../services/UserContext';

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


export default function Index() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    isLoggedIn ?
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="relative pt-32">
              <p className="text-center text-xl font-bold"> Welcome to TANK Admin Page!</p>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </> :
    <>
      <Redirect to="/auth/login"/>
    </>
    
  );
}