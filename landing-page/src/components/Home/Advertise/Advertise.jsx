import React from "react";
import { RiAdvertisementLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import AdsTag from "./AdsTag";
import "./Advertise.css";

function Advertise() {
  return (
    <article className="advertise_container">
      <div className="advertise">
        <div>
          <Link to="https://www.quilmes.com.ar/agegate" target="blank">
            <img
              src="https://creativecorneragency.com/wp-content/uploads/2017/08/Cerveses-Argentines-02.jpg"
              alt=""
            />
            <div className="ads_grey-layout"></div>
          </Link>
          <AdsTag />
        </div>
        <div>
          <Link to="https://www.mostazaweb.com.ar" target="blank">
            <img
              src="https://dobleamarilla-assets.tadevel-cdn.com/photo_5af9eaf04c762d01fa9fe47d_720.jpeg"
              alt=""
            />
            <div className="ads_grey-layout"></div>
          </Link>
          <AdsTag />
        </div>
        <div>
          <Link to="https://www.burgerking.com.ar" target="blank">
            <img
              src="https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-bk-argentina/home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/Banner-Chilli-king-Arg_930x620_novedades-web.jpeg"
              alt=""
            />
            <div className="ads_grey-layout"></div>
          </Link>
          <AdsTag />
        </div>
      </div>
    </article>
  );
}

export default Advertise;
