import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";
import Classes from "./components/classes/Classes";
import Settings from "./components/settings/Settings";
import MySubjects from "./components/mySubjects/MySubjects";
import Scheduler from "./components/scheduler/Scheduler";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import Welcome from "./components/Welcome/Welcome";
import ErrorBar from "./components/ui/toaster/ErrorBar";
import SuccessBar from "./components/ui/toaster/SuccessBar";
import InfoBar from "./components/ui/toaster/InfoBar";
import './App.css'


function App() {

  const signedIn = useSelector(state => state.auth.signedIn);
  const toaster = useSelector(state => state.toaster);
  

  return (
    <BrowserRouter basename='/'>
      <SuccessBar show={toaster.successToaster} message={toaster.successToasterMessage} />
      <ErrorBar show={toaster.errorToaster} message={toaster.errorToasterMessage} />
      <InfoBar show={toaster.infoToaster} message={toaster.infoToasterMessage} />
      <div style={{ display: "flex", position: "fixed", top: "0px", left: "0px", height: "100%", width: "100%" }}>
        {signedIn ?
          <React.Fragment>
            <Sidebar />
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
          </React.Fragment> : <Welcome />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
