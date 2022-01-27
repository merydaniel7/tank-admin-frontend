import { React, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// context

import { UserContext } from '../services/UserContext';

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Tables from "views/admin/Tables.js";
import MonthlyStats from "views/admin/MonthlyStats";

export default function Admin() {
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
          <Switch>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/tables" component={Tables} />
            <Route exact path="/admin/stats" component={MonthlyStats} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </> :
    <>
      <Redirect to="/auth/login"/>
    </>
    
  );
}
