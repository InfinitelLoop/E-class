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

const Classes = (props) => {
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);
  const [enrolledClassCards, setEnrolledClassCards] = useState([]);
  const [myClassCards, setMyClassCards] = useState([]);

  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.post('http://localhost:3001/classes', {username : username})
    .then(res => {
      if(res.data.status==="SUCCESS"){
        setEnrolledClassCards(res.data.enrolledClassesData);
        setMyClassCards(res.data.myClassesData);
      } else {
        dispatch({
          type: actionType.SHOW_ERROR_TOASTER,
          payload: "Something went Wrong! Try again later."
      })
      }
    })
    .catch(err => dispatch({
      type: actionType.SHOW_ERROR_TOASTER,
      payload: "Something went Wrong! Try again later."
  }))
  }, [])

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
        
      {showCreateClassModal ? <Backdrop closeModal={closeCreateModal} >
        <CreateClass closeModal={closeCreateModal} />
      </Backdrop>: null}
      {showJoinClassModal ? <Backdrop closeModal={closeJoinModal} >
        <JoinClass closeModal={closeJoinModal} />
      </Backdrop>: null}

  {enrolledClassCards.length===0 && myClassCards.length===0 ? <React.Fragment>
    <Button
    type="Secondary"
    clicked={openCreateModal}
    height="50px"
    width="200px"
    >
    Create class
  </Button>
  <Button
    clicked={openJoinModal}
    backgroundColor="#6bd4cd"
    height="50px"
    width="200px"
    color="#185473"
    >
    Join class
  </Button> 
    </React.Fragment>
  : <React.Fragment>
    {myClassCards.map(item => <ClassCard type='Teacher' name={item.classname} subject={item.subject} section ={item.section} roomNo={item.room_no}/>)}
    {enrolledClassCards.map(item => <ClassCard type='Student' name={item.classname} subject={item.subject} section ={item.section} roomNo={item.room_no}/>)}
  </React.Fragment>
  }
      
    </div>
  );
};

export default Classes;
