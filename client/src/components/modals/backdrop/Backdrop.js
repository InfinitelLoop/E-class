import React from "react";

const Backdrop = (props) => {
  return (
    <div
      style={{
        backgroundColor: "rgb(0,0,0,0.5)",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: "0px",
        top: "0px",
        height: "100vh",
        width: "100vw",
        zIndex: "500"
      }}

      onClick={props.closeModal}
    >
      {props.children}
    </div>
  );
};

export default Backdrop;
