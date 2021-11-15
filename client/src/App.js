import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Classes from "./components/classes/Classes";
import Settings from "./components/settings/Settings";
import MySubjects from "./components/mySubjects/MySubjects";
import Scheduler from "./components/scheduler/Scheduler";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import Welcome from "./components/Welcome/Welcome";


function App() {
  
  const [signedIn, setSignedIn] = React.useState(false);
  
  function login(){
    setSignedIn(true);
  }
  function logout(){
    setSignedIn(false);
  }

  return (
    <BrowserRouter basename='/'>
      <div style={{ display: "flex", position: "fixed", top: "0px", left: "0px", height: "100%", width: "100%" }}>
        {signedIn ?
          <React.Fragment>
            <Sidebar logout={logout}/>
            <Routes>
              <Route
                path="/classes"
                exact
                element={
                  <Classes />
                }
              />
              <Route
                path="/my-subjects"
                exact
                element={
                  <MySubjects />
                }
              />
              <Route
                path="/settings"
                exact
                element={
                  <Settings />
                }
              />
              <Route
                path="/scheduler"
                exact
                element={
                  <Scheduler />
                }
              />
              <Route
                path="/"
                element={
                  <Home />
                }
              />
            </Routes>
          </React.Fragment> : <Welcome login={login}/>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
