import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import ClassCard from "../classCard/ClassCard";
import Button from "../ui/button/Button";
import classes from "./Classes.module.css";
import Backdrop from "../modals/backdrop/Backdrop";
import CreateClass from "../modals/createClassModal/CreateClass";
import JoinClass from "../modals/joinClassModal/JoinClass";
import actionType from "../../store/actionType";
import HomeCover from "../../assets/images/HomeCover.svg";
import Spinner from "../ui/spinner/Spinner";
import ClassView from "../classView/ClassView";

const Classes = (props) => {
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);
  const [showClassView, setShowClassView] = useState(false);
  const [selectedClass, setselectedClass] = useState(null);

  const loading = useSelector((state) => state.class.loading);
  const enrolledClassCards = useSelector((state) => state.class.enrolledClasses);
  const myClassCards = useSelector((state) => state.class.myClasses);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("http://localhost:3001/classes", { username: username })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          dispatch({
            type: actionType.SET_CLASSES,
            payload: {
              enrolledClasses: res.data.enrolledClassesData,
              myClasses: res.data.myClassesData,
              loading: false,
            },
          });
        } else {
          dispatch({
            type: actionType.SHOW_ERROR_TOASTER,
            payload: "Something went Wrong! Try again later.",
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: actionType.SET_CLASSES,
          payload: {
            enrolledClasses: [],
            myClasses: [],
            loading: false,
          },
        });
        dispatch({
          type: actionType.SHOW_ERROR_TOASTER,
          payload: "Something went Wrong! Try again later.",
        });
      });
  }, []);

  function fetchClasses() {
    axios
      .post("http://localhost:3001/classes", { username: username })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          dispatch({
            type: actionType.SET_CLASSES,
            payload: {
              enrolledClasses: res.data.enrolledClassesData,
              myClasses: res.data.myClassesData,
              loading: false,
            },
          });
        } else {
          dispatch({
            type: actionType.SHOW_ERROR_TOASTER,
            payload: "Something went Wrong! Try again later.",
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: actionType.SET_CLASSES,
          payload: {
            enrolledClasses: [],
            myClasses: [],
            loading: false,
          },
        });
        dispatch({
          type: actionType.SHOW_ERROR_TOASTER,
          payload: "Something went Wrong! Try again later.",
        });
      });
  }

  function viewClass(obj, type){
    setShowClassView(true);
    setselectedClass(<ClassView close={() => setShowClassView(false)} classObj={obj} type = {type}/>);
  }

  function openCreateModal() {
    setShowCreateClassModal(true);
  }

  function openJoinModal() {
    setShowJoinClassModal(true);
  }
  function closeCreateModal() {
    setShowCreateClassModal(false);
  }

  function closeJoinModal() {
    setShowJoinClassModal(false);
  }

  return (
    <div className={classes.classes}>
      {showCreateClassModal ? (
        <Backdrop closeModal={closeCreateModal}>
          <CreateClass closeModal={closeCreateModal} fetchClasses={fetchClasses} />
        </Backdrop>
      ) : null}
      {showJoinClassModal ? (
        <Backdrop closeModal={closeJoinModal}>
          <JoinClass closeModal={closeJoinModal} fetchClasses={fetchClasses} />
        </Backdrop>
      ) : null}

      {loading ? (
        <Spinner />
      ) : enrolledClassCards.length === 0 && myClassCards.length === 0 ? (
        <div className={classes.HomeContainer}>
          <div className={classes.HomeCover}>
            <img style={{ width: "100%", borderRadius: 30 }} src={HomeCover} alt=" " />
          </div>
          <div className={classes.ButtonContainer}>
            <Button type="Secondary" clicked={openCreateModal} height="50px" width="200px">
              Create class
            </Button>
            <Button clicked={openJoinModal} backgroundColor="#185473" height="50px" width="200px" color="white">
              Join class
            </Button>
          </div>
        </div>
      ) : showClassView ? (
        selectedClass
      ) : (
        <React.Fragment>
          {myClassCards.map((item) => (
            <ClassCard
              clicked={() => viewClass(item, 'Teacher')}
              type="Teacher"
              name={item.classname}
              subject={item.subject}
              section={item.section}
              roomNo={item.room_no}
            />
          ))}
          {enrolledClassCards.map((item) => (
            <ClassCard
              clicked={() => viewClass(item, 'Student')}
              type="Student"
              name={item.classname}
              subject={item.subject}
              section={item.section}
              roomNo={item.room_no}
            />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default Classes;
