import React, { useEffect, useState } from "react";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import PostCard from "./PostCard.jsx";
import useGetPosts from "../../../hooks/useGetPosts.jsx";
import NewPost from "./NewPost.jsx";
import "./HomePosts.css";

function HomePosts() {
  const { posts, postsLoading, postsError, timeElapsed } = useGetPosts();

  return (
    <section className="home-posts_container" id="posts">
      <div className="home-posts_advice">
        <img
          className="home-posts_advice-3"
          src="../../../../assets/videos/advice.gif"
          alt="Descripción de la imagen"
        />
        <img
          className="home-posts_advice-3"
          src="../../../../assets/videos/advice-2.gif"
          alt="Descripción de la imagen"
        />
        <img
          className="home-posts_advice-3"
          src="../../../../assets/videos/advice-3.gif"
          alt="Descripción de la imagen"
        />
        <img
          className="home-posts_advice-3"
          src="../../../../assets/videos/advice-4.gif"
          alt="Descripción de la imagen"
        />
      </div>
      <main className="home-posts">
        <div className="home-posts_section">
          <div className="home-posts_section-line"></div>
          <h1 >Publicaciones</h1>
        </div>
        <div className="home-posts_new-post_container">
          <NewPost />
        </div>
        <div className="home-posts_post-cards">
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <PostCard
                className="prueba"
                key={post.postId}
                profilePicture={post.shop.picture}
                profilename={post.shop.profilename}
                name={post.shop.name}
                image={post.image}
                time={timeElapsed(post.postedAt)}
                body={post.description}
                stars={post.stars}
              />
            ))}
        </div>
      </main>
    </section>
  );
}

export default HomePosts;
