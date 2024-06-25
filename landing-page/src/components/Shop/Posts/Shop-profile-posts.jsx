import React from "react";
import useGetPostsByShop from "../../../hooks/useGetPostsByShop";
import ShopPost from "./Shop-post";
import PostCard from "../../Home/HomePosts/PostCard";
import "./Shop-profile-posts.css";
import useGetPosts from "../../../hooks/useGetPosts";

function ShopProfilePosts() {
  const { posts, postsLoading, postsError } = useGetPostsByShop();
  const { timeElapsed } = useGetPosts();

  return (
    <>
      <h1 className="main-content_posts-h1">Publicaciones</h1>
      <div className="shop-posts">
        {posts
          ?.slice()
          .reverse()
          .map((post) => (
            <ShopPost
              key={post.postId}
              description={post.description}
              image={post.image}
              time={timeElapsed(post.postedAt)}
            />
          ))}
        <h1 className="shop-posts_no-more-posts">No hay mas publicaciones.</h1>
      </div>
    </>
  );
}

export default ShopProfilePosts;
