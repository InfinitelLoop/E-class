import React, { useState } from "react";

import ClassCard from "../classCard/ClassCard";
import Button from "../ui/button/Button";
import classes from "./Classes.module.css";
import Backdrop from "../modals/backdrop/Backdrop";
import CreateClass from "../modals/createClassModal/CreateClass";
import JoinClass from "../modals/joinClassModal/JoinClass";

const Classes = (props) => {
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);

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
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
    </div>
  );
};

export default Classes;
