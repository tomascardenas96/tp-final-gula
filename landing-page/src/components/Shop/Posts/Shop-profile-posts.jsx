import React from "react";
import useGetPostsByShop from "../../../hooks/useGetPostsByShop";
import "./Shop-profile-posts.css";
import ShopPost from "./Shop-post";

function ShopProfilePosts() {
  const { posts, postsLoading, postsError } = useGetPostsByShop();

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
            />
          ))}
        <h1 className="shop-posts_no-more-posts">No hay mas publicaciones.</h1>
      </div>
    </>
  );
}

export default ShopProfilePosts;
