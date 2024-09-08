import "./Shop-profile-posts.css";
import useGetPostsByShop from "../../../hooks/useGetPostsByShop";
import ShopPost from "./Shop-post";
import useGetPosts from "../../../hooks/useGetPosts";
import Spinner from "../../Common/Spinner/Spinner";
import Error from "../../Common/Error/Error";

function ShopProfilePosts() {
  const { posts, postsLoading, postsError } = useGetPostsByShop();
  const { timeElapsed } = useGetPosts();

  return (
    <>
      <h1 className="main-content_posts-h1">Publicaciones</h1>
      <div className="shop-posts">
        {postsLoading ? (
          <div className="shop-posts_loading">
            <Spinner />
            <p>Cargando publicaciones...</p>
          </div>
        ) : postsError ? (
          <div className="shop-posts_error">
            <Error />
          </div>
        ) : posts?.length > 0 ? (
          <>
            {posts
              .slice()
              .reverse()
              .map((post) => (
                <ShopPost
                  key={post.postId}
                  description={post.description}
                  image={post.image}
                  time={timeElapsed(post.postedAt)}
                />
              ))}
            <h1 className="shop-posts_no-more-posts">
              No hay mas publicaciones.
            </h1>
          </>
        ) : (
          <h1 className="shop-posts_no-more-posts">No hay publicaciones.</h1>
        )}
      </div>
    </>
  );
}

export default ShopProfilePosts;
