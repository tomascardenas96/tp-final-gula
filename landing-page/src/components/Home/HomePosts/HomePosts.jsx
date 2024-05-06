import React from "react";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import "./HomePosts.css";
import PostCard from "./PostCard.jsx";
import useGetPosts from "../../../hooks/useGetPosts.jsx";
import moment from "moment";

function HomePosts() {
  const { posts, postsLoading, postsError, timeElapsed } = useGetPosts();

  return (
    <section className="home-posts_container">
      <div className="home-posts_advice">
        <img
          src="../../../../assets/videos/burger.gif"
          alt="Descripción de la imagen"
        />
        <img
          src="../../../../assets/videos/burger.gif"
          alt="Descripción de la imagen"
        />
      </div>
      <h1 className="home-posts_posts">Publicaciones</h1>
      <main className="home-posts">
        {posts?.map((post) => (
          <PostCard
            key={post.postId}
            image={post.shop.picture}
            name={post.shop.name}
            time={timeElapsed(post.postedAt)}
            body={post.description}
            stars={post.stars}
          />
        ))}
      </main>
    </section>
  );
}

export default HomePosts;
