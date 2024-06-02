import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./SettingsHeader.css";

function SettingsHeader({ title }) {
  const navigate = useNavigate();

  function goBack() {
    navigate("/home");
  }

  return (
    <div className="settings-header_container">
      <IoMdArrowRoundBack onClick={goBack} className="settings-header_arrow" />
      <h1>{title}</h1>
    </div>
  );
}

export default SettingsHeader;
