import React from "react";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import useGetPosts from "../../../hooks/useGetPosts.jsx";
import NewPost from "./NewPost.jsx";
import ShopPost from "../../Common/Posts/Shop-post.jsx";
import Error from "../../Common/Error/Error.jsx";
import "./HomePosts.css";

function HomePosts() {
  const { posts, postsLoading, postsError, timeElapsed } = useGetPosts();

  return (
    <section className="home-posts_container">
      <main className="home-posts">
        <div className="home-posts_section">
          <h1 id="posts">Publicaciones</h1>
        </div>
        <div className="home-posts_new-post_container">
          <NewPost />
        </div>
        <div className="home-posts_post-cards">
          {postsError ? (
            <div className="home-posts_error">
              <Error />
            </div>
          ) : postsLoading ? (
            <div className="home-posts_loading">
                <Spinner />
              <p>
                Cargando publicaciones...
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <ShopPost
                key={post.postId + 10000}
                profilePicture={post.shop.picture}
                profileName={post.shop.profilename}
                name={post.shop.name}
                image={post.image}
                time={timeElapsed(post.postedAt)}
                description={post.description}
                stars={post.stars}
              />
            ))
          )}
        </div>
      </main>
    </section>
  );
}

export default HomePosts;
