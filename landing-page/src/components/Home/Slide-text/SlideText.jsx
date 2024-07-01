import React from "react";
import useGetActiveUser from "../../../hooks/useGetActiveUser.jsx";
import "./SlideText.css";

function SlideText() {
  const { activeUser, activeuserError, activeuserLoading } = useGetActiveUser();

  console.log(activeUser.name)

  return (
    <section className="slide-text_container">
      <div className="slide-text">
        <p>
          {`!Hola ${activeUser.name}! te damos la bienvenida, Gula conecta a las personas con sus comidas
          preferidas, echa un vistazo.`}
        </p>
      </div>
    </section>
  );
}

export default SlideText;
