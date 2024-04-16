import React from "react";
import "./Home.css";
import useLogOut from "../../hooks/useLogOut";

function Home() {
  const { handleLogOut } = useLogOut();

  return (
    <>
      <div>Home</div>
      <input type="button" value="Cerrar sesion" onClick={handleLogOut} />
    </>
  );
}

export default Home;