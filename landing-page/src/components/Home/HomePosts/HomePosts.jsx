import React, { useEffect, useState } from "react";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import PostCard from "./PostCard.jsx";
import useGetPosts from "../../../hooks/useGetPosts.jsx";
import NewPost from "./NewPost.jsx";
import Advertise from "../Advertise/Advertise.jsx";
import "./HomePosts.css";
import ShopPost from "../../Shop/Posts/Shop-post.jsx";

function HomePosts() {
  const { posts, postsLoading, postsError, timeElapsed } = useGetPosts();

  return (
    <section className="home-posts_container" id="posts">
      <main className="home-posts">
        <div className="home-posts_section">
          <h1>Publicaciones</h1>
        </div>
        <div className="home-posts_new-post_container">
          <NewPost />
        </div>
        <div className="home-posts_post-cards">
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <ShopPost
                key={post.postId}
                profilePicture={post.shop.picture}
                profileName={post.shop.profilename}
                name={post.shop.name}
                image={post.image}
                time={timeElapsed(post.postedAt)}
                description={post.description}
                stars={post.stars}
              />
            ))}
        </div>
      </main>
    </section>
  );
}

export default HomePosts;
