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
          className="home-posts_advice-1"
          src="../../../../assets/videos/burger.gif"
          alt="Descripción de la imagen"
        />
        <img
          className="home-posts_advice-2"
          src="../../../../assets/videos/advice-2.gif"
          alt="Descripción de la imagen"
        />
        <img
          className="home-posts_advice-3"
          src="../../../../assets/videos/advice-3.gif"
          alt="Descripción de la imagen"
        />
      </div>
      <main className="home-posts">
        {posts?.reverse().map((post) => (
          <PostCard
            key={post.postId}
            profilePicture={post.shop.picture}
            name={post.shop.name}
            image={post.image}
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
