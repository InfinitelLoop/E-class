import React, { useState } from "react";
import ClassDashboard from "../classdashboard/ClassDashboard";
import classes from "./ClassView.module.css";
import People from "../people/People";
import BackIcon from "../../assets/images/back.svg";
import MyCalendar from "../myCalendar/MyCalendar";
import RegistrationForm from '../registrationForm/RegistrationForm';
import Requests from "../requests/Requests";

const ClassView = (props) => {
  const [showDashboard, setshowDashboard] = useState(props.scheduleMode ? false : true);
  const [showScheduler, setshowScheduler] = useState(props.scheduleMode ? true : false);
  const [showPeople, setshowPeople] = useState(false);
  const [showRegister, setshowRegister] = useState(false);

  function viewDashboard() {
    setshowDashboard(true);
    setshowScheduler(false);
    setshowPeople(false);
    setshowRegister(false);
  }

  function viewScheduler() {
    setshowDashboard(false);
    setshowScheduler(true);
    setshowPeople(false);
    setshowRegister(false);
  }

  function viewPeople() {
    setshowDashboard(false);
    setshowScheduler(false);
    setshowPeople(true);
    setshowRegister(false);
  }

  function viewRegister() {
    setshowDashboard(false);
    setshowScheduler(false);
    setshowPeople(false);
    setshowRegister(true);
  }

  return (
    <div className={classes.ClassView}>
      <div className={classes.SideView}>
        <label className={classes.Icon} onClick={props.close}>
          <img src={BackIcon} alt="back" style={{ width: 40 }} />
        </label>
        <label
          className={classes.SideLink}
          style={showDashboard ? { backgroundColor: "#185473", color: 'white', boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" } : {}}
          onClick={viewDashboard}
        >
          Dashboard
        </label>
        <label
          className={classes.SideLink}
          style={showScheduler ? { backgroundColor: "#185473", color: 'white', boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" } : {}}
          onClick={viewScheduler}
        >
          Scheduler
        </label>
        <label
          className={classes.SideLink}
          style={showPeople ? { backgroundColor: "#185473", color: 'white', boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" } : {}}
          onClick={viewPeople}
        >
          People
        </label>
        <label
          className={classes.SideLink}
          style={showRegister ? { backgroundColor: "#185473", color: 'white', boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" } : {}}
          onClick={viewRegister}
        >
          {props.type === 'Student' ? <label>Registration</label> : <label>Requests</label>}
        </label>
      </div>
      <div className={classes.MainView}>
        {showDashboard ? (
          <ClassDashboard
            classObj={props.classObj}
            type={props.type}
          />
        ) : null}
        {showScheduler ? <MyCalendar classCode={props.classObj.classCode} type={props.type} /> : null}
        {showPeople ? <People teacher={props.classObj.teacher} students={props.classObj.students} /> : null}
        {showRegister ? props.type === 'Student' ? <RegistrationForm classCode={props.classObj.classCode} /> : <Requests classCode={props.classObj.classCode} /> : null}
      </div>
    </div>
  );
};

export default ClassView;
