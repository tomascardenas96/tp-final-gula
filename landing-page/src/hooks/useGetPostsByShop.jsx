import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useGetPostsByShop() {
  const token = localStorage.getItem("accessToken");
  const { profilename } = useParams("profilename");
  const [posts, setPosts] = useState();
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    async function getPostsByShop() {
      try {
        setPostsLoading(true);
        const response = await fetch(
          `http://localhost:3070/post/shop/${profilename}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.error) {
          throw new Error();
        }
        setPosts(data);
      } catch (err) {
        setPostsError(err);
      } finally {
        setPostsLoading(false);
      }
    }

    getPostsByShop();
  }, [token, profilename]);

  return { posts, postsLoading, postsError, setPosts };
}

export default useGetPostsByShop;
