import React, { useState } from "react";
import ClassDashboard from "../classdashboard/ClassDashboard";
import classes from "./ClassView.module.css";
import People from "../people/People";
import MyScheduler from "../myScheduler/MyScheduler";
import BackIcon from "../../assets/images/back.svg";
import MyCalendar from "../myCalendar/MyCalendar";

const ClassView = (props) => {
  const [showDashboard, setshowDashboard] = useState(true);
  const [showScheduler, setshowScheduler] = useState(false);
  const [showPeople, setshowPeople] = useState(false);

  function viewDashboard() {
    setshowDashboard(true);
    setshowScheduler(false);
    setshowPeople(false);
  }

  function viewScheduler() {
    setshowDashboard(false);
    setshowScheduler(true);
    setshowPeople(false);
  }

  function viewPeople() {
    setshowDashboard(false);
    setshowScheduler(false);
    setshowPeople(true);
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
      </div>
      {/* <p>{props.classObj.teacher}</p>
      
            <p>
            <ul>Students:
                {props.classObj.students ? props.classObj.students.map(student => {
                    return <li>{student.name}, {student.email}</li>
                }) : <li>no list</li> }
            </ul> */}
    </div>
  );
};

export default ClassView;
