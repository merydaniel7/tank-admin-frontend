import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import FooterSmall from "components/Footers/FooterSmall.js";

// views
import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";

export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Switch>
            <Route exact path="/auth/login"  component={Login} />
            <Route exact path="/auth/register" component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
