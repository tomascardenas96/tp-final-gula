import React from "react";
import { RiAdvertisementLine } from "react-icons/ri";
import "./Advertise.css";

function Advertise() {
  return (
    <article className="advertise_container">
      <div className="advertise">
        <div>
          Publicidad
          <RiAdvertisementLine />
        </div>
        <div>
          Publicidad
          <RiAdvertisementLine />
        </div>
        <div>
          Publicidad
          <RiAdvertisementLine />
        </div>
      </div>
    </article>
  );
}

export default Advertise;
