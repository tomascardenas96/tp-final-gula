import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";

function useGetPosts() {
  const token = localStorage.getItem("accessToken");
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);

  //Web socket que escucha cuando se genera un nuevo evento, y almacena ese nuevo objeto dentro del array de posts.
  useEffect(() => {
    const socket = io("http://localhost:8001");

    socket.on("newPost", (newPost) => {
      console.log(newPost);
      setPosts((prev) => [newPost, ...prev]);
    });

    return () => {
      socket.off("newPost");
      socket.disconnect();
    };
  }, []);

  const getShops = useCallback(async () => {
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
      //Invertimos el flujo en que se guardan los posts en el array, para que los mas nuevos nos aparezcan al principio y no al final.
      const inverseData = data.slice().reverse();
      setPosts(inverseData);
    } catch (err) {
      setPostsError(err);
    } finally {
      setPostsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getShops();
  }, [getShops]);

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
