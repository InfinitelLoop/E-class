import React, { Component } from "react";
import classes from "./People.module.css";
import Student from "../../assets/images/student.svg";
import Teacher from "../../assets/images/teacher.svg";
const People = (props) => {
  return (
    <div className={classes.People}>
      <label className={classes.Heading}>
         Teacher{" "}
      </label>
      <label className={classes.Row}>
      <img src={Teacher} alt="" style={{ border: '1px solid black', width: "40px", borderRadius: "50%",  marginRight: "20px"}} />
          {props.teacher}</label>
      <label className={classes.Heading}>Students </label>
      {props.students
        ? props.students.map((student) => {
            return (
              <label className={classes.Row} key={student.email}>
                <img src={Student} alt="" style={{ border: '1px solid black', width: "40px", borderRadius: "50%",  marginRight: "20px"}} />
                {student.name}
              </label>
            );
          })
        : null}
    </div>
  );
};

export default People;
