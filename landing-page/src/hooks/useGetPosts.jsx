import { useEffect, useState } from "react";
import moment from "moment";

function useGetPosts() {
  const token = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    async function getShops() {
      try {
        setPostsLoading(true);
        const response = await fetch("http://localhost:3070/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setPosts(data);
      } catch (err) {
        setPostsError(err);
      } finally {
        setPostsLoading(false);
      }
    }

    getShops();
  }, [token]);

  //Funcion que compara dos fechas y retorna la diferencia de horario aproximada.
  function timeElapsed(date) {
    const parsedTime = moment(date);
    const diff = moment().diff(parsedTime, "seconds");
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
  
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    } else {
      if (hours === 0) {
        if (minutes === 0) {
          return `${seconds}s`;
        } else {
          return `${minutes}min`;
        }
      } else {
        return `${hours}h`;
      }
    }
  }

  return { posts, postsLoading, postsError, timeElapsed };
}

export default useGetPosts;
