import "./Advertise.css";
import React from "react";

function Advertise() {
  return (
    <section className="advertise_container">
      <h1>Promociones</h1>
      <div className="advertise">
        <img
          className="advertise-item1"
          src="../../../../assets/videos/advice.gif"
          alt="Descripción de la imagen"
        />
        <img
          className="advertise-item2"
          src="../../../../assets/videos/advice-2.gif"
          alt="Descripción de la imagen"
        />
        <img
          className="advertise-item3"
          src="../../../../assets/videos/advice-3.gif"
          alt="Descripción de la imagen"
        />
        <img
          className="advertise-item4"
          src="../../../../assets/videos/advice-4.gif"
          alt="Descripción de la imagen"
        />
      </div>
    </section>
  );
}

export default Advertise;
