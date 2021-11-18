import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import classes from "./CreateClass.module.css";
import axios from "axios";
import actionType from "../../../store/actionType";


const CreateClass = (props) => {
  let initialState = {
    value: "",
    valid: true,
    touched: false,
  };
  const [className, setClassName] = useState(initialState);
  const [subject, setSubject] = useState(initialState);
  const [section, setSection] = useState(initialState);
  const [roomNo, setRoomNo] = useState(initialState);
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();

  function inputChangedHandler(event, key) {
    let value = event.target.value;
    switch (key) {
      case "classname":
        validateInput(value, key);
        break;

      case "subject":
        validateInput(value, key);
        break;

      case "section":
        validateInput(value, key);
        break;

      case "room_no":
        validateInput(value, key);
        break;
      default:
        break;
    }
  }


  function validateInput(value, key) {
    switch (key) {
      case "classname":
        let updatedClassName = { ...className };
        updatedClassName.value = value;
        if (!updatedClassName.touched) {
          updatedClassName.touched = true;
        }
        updatedClassName.valid = updatedClassName.value.trim() === "" ? false : true;
        setClassName(updatedClassName);
        break;

      case "subject":
        let updatedSubject = { ...subject };
        updatedSubject.value = value;
        if (!updatedSubject.touched) {
          updatedSubject.touched = true;
        }
        updatedSubject.valid = updatedSubject.value.trim() === "" ? false : true;
        setSubject(updatedSubject);
        break;

      case "section":
        let updatedSection = { ...section };
        updatedSection.value = value;
        if (!updatedSection.touched) {
          updatedSection.touched = true;
        }
        updatedSection.valid = updatedSection.value.trim() === "" ? false : true;
        setSection(updatedSection);
        break;

      case "room_no":
        let updatedRoomNo = { ...roomNo };
        updatedRoomNo.value = value;
        if (!updatedRoomNo.touched) {
          updatedRoomNo.touched = true;
        }
        updatedRoomNo.valid = updatedRoomNo.value.trim() === "" ? false : true;
        setRoomNo(updatedRoomNo);
        break;
      default:
        break;
    }
  }

  function close() {
    setClassName(initialState);
    setRoomNo(initialState);
    setSection(initialState);
    setSubject(initialState);
    props.closeModal();
  }

  function createClass() {
    let obj = {
      classname: className.value,
      section: section.value,
      subject: subject.value,
      room_no: roomNo.value,
      username: username
    }

    axios.post('http://localhost:3001/classes/create', obj)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          setClassName(initialState);
          setRoomNo(initialState);
          setSection(initialState);
          setSubject(initialState);
          props.closeModal();
          dispatch({
             type: actionType.SHOW_SUCCESS_TOASTER,
             payload: "Class created"
            })
        }
      })
  }

  return (
    <div className={classes.CreateClass} onClick={(event) => event.stopPropagation()}>
      <h2 style={{ marginTop: 30 }}>Create new Class</h2>
      <div className={classes.InputContainer}>
        <label className={classes.Label}>Class name</label>
        <Input
          value={className.value}
          type="text"
          placeholder=""
          width="300px"
          touched={className.touched}
          valid={className.valid}
          changed={(event) => inputChangedHandler(event, "classname")}
        />
        {!className.valid && className.touched ? <label className={classes.ErrorLabel}>Required Field</label> : null}
      </div>
      <div className={classes.InputContainer}>
        <label className={classes.Label}>Subject</label>
        <Input
          value={subject.value}
          type="text"
          placeholder=""
          width="300px"
          touched={subject.touched}
          valid={subject.valid}
          changed={(event) => inputChangedHandler(event, "subject")}
        />
        {!subject.valid && subject.touched ? <label className={classes.ErrorLabel}>Required Field</label> : null}
      </div>
      <div className={classes.InputContainer}>
        <label className={classes.Label}>Section</label>
        <Input
          value={section.value}
          type="text"
          placeholder=""
          width="300px"
          touched={section.touched}
          valid={section.valid}
          changed={(event) => inputChangedHandler(event, "section")}
        />
        {!section.valid && section.touched ? <label className={classes.ErrorLabel}>Required Field</label> : null}
      </div>
      <div className={classes.InputContainer}>
        <label className={classes.Label}>Room number</label>
        <Input
          value={roomNo.value}
          type="text"
          placeholder=""
          width="300px"
          touched={roomNo.touched}
          valid={roomNo.valid}
          changed={(event) => inputChangedHandler(event, "room_no")}
        />
        {!roomNo.valid && roomNo.touched ? <label className={classes.ErrorLabel}>Required Field</label> : null}
      </div>
      <div className={classes.ButtonContainer}>
        <Button clicked={close} width="100px" marginBottom='28px' type='Secondary'>
          Cancel
        </Button>
        <Button clicked={createClass} width="100px" marginBottom='28px'>
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateClass;
