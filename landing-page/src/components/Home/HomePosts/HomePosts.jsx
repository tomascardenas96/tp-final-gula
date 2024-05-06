import React from "react";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import "./HomePosts.css";
import PostCard from "./PostCard.jsx";

function HomePosts() {
  return (
    <section className="home-posts_container">
      <div className="home-posts_advice">
        <img
          src="../../../../assets/videos/burger.gif"
          alt="Descripción de la imagen"
        />
      </div>
      <h1 className="home-posts_posts">Publicaciones</h1>
      <main className="home-posts">
        <PostCard />
        <PostCard />
        <PostCard />
      </main>
    </section>
  );
}

export default HomePosts;
