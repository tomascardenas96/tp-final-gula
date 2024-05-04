import React from "react";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import "./HomePosts.css";

function HomePosts() {
  return (
    <section className="home-posts_container">
      <div>
        <Spinner />
      </div>
    </section>
  );
}

export default HomePosts;
