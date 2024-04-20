import React from "react";
import "./Header.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return <header className="header_container">Header</header>;
}

export default Header;
