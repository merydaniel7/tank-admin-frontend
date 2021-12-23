import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { UserInfoProvider } from './services/UserContext';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

function App() {
  return (
    // <>
    //   <BrowserRouter>
    //     <Switch>
    //     {/* add routes with layouts */}
    //     {/* <Route path="/" component={Admin} /> */}
    //     <Route path="/admin" component={Admin} />
    //     <Route path="/auth" component={Auth} />
    //     <Redirect from="*" to="/admin" />
    //     </Switch>
    //   </BrowserRouter>,
    // </>
    <>
    <BrowserRouter>
      {/* add routes with layouts */}
      {/* <Route path="/" component={Admin} /> */}
      <UserInfoProvider>
        <Route exact path="/" component={Admin} />
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
      </UserInfoProvider>
    </BrowserRouter>,
  </>
  );
}
	
export default App;