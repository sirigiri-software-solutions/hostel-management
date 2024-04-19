import React from "react";
import PlusIcon from "../images/Icons (8).png";

const Button = ({ icon, variant, text,onClick }) => {

  const handleClick = () => {
    if(onClick){
      onClick();
    }
  }

  
  return (
    <>
    <button
      style={{
        backgroundColor: `${variant.color}`,
        borderRadius: `${variant.radius}`,
        color: "white",
        border: "none",
        minWidth: "100px",
        padding: `${variant.padding}`,
        margin: `${variant.margin}`,
      }}
      onClick={handleClick}
      >
      {icon && <img src={PlusIcon} alt="Plus-Icon" style={{ width: "20px" }} />}
      {text}
    </button>    
    </>
  );
};

export default Button;
