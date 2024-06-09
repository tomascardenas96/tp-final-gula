import "./Shop-info.css";
import { FiClock } from "react-icons/fi";
import { IoMdCall } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import React from "react";

function ShopInfo() {
  return (
    <div className="shop-info_container">
      <div className="shop-info">
        <div className="shop-info_image">
          <img
            src="http://localhost:3070/assets/uploads/shop/profile/pablo.jpg"
            alt="shop-profile-img_gula"
          />
        </div>

        <div className="shop-info_header">
          <div className="shop-title">
            <h1>Rotiseria 'Lo de pablo'</h1>
            <h2>Avellaneda 85, Benito Juarez</h2>
            <div className="shop-state">
              <p>Abierto ahora</p>
              <GoDotFill className="shop-state_icon" />
            </div>
          </div>

          <div className="shop-contact">
            <ul className="shop-contact_list">
              <li>
                <div className="shop-schedules">
                  <FiClock className="shop-contact_list-icon" />
                  <h1>Horarios de atencion</h1>
                </div>
                <div className="shop-schedules_paragraph">
                  <p className="am-pm">Mañana: </p>
                  <p>9:00hs - 13:00hs</p>
                  <p className="am-pm">Tarde: </p>
                  <p>17:00hs - 21:00hs</p>
                </div>
              </li>
              <li className="shop-phone">
                <div className="shop-schedules">
                  <IoMdCall className="shop-contact_list-icon" />
                  <h1>Telefono</h1>
                </div>
                <p>2281-404433</p>
              </li>
            </ul>
          </div>

          <div className="shop-statistics">
            <div className="shop-statistics_posts">
              <h1>Publicaciones</h1>
              <p>133</p>
            </div>

            <div className="shop-statistics_posts">
              <h1>Recomendaciones</h1>
              <p>
                <span>4.5</span> /10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopInfo;
