import { toast } from "sonner";
import { CONFIG } from "../api/data";

function useDeletePost(setPosts) {
  const token = localStorage.getItem("accessToken");

  const deletePost = (postId) => {
    const fetchData = async () => {
      const response = await fetch(`${CONFIG.host}/post/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      setPosts((prev) => {
        const deletedFood = prev.filter((post) => post.postId !== postId);
        return deletedFood;
      });

      return data;
    };

    toast.promise(fetchData(), {
      loading: "Eliminando publicacion...",
      success: (data) => {
        return `La publicacion ha sido eliminada`;
      },
      error: "Ha ocurrido un error",
    });
  };

  return { deletePost };
}

export default useDeletePost;
