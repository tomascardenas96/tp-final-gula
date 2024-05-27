import { useEffect, useState } from "react";

function useGetActiveUser() {
  const token = localStorage.getItem("accessToken");
  const [activeUser, setActiveUser] = useState({});
  const [activeuserError, setActiveUserError] = useState(null);
  const [activeuserLoading, setActiveUserLoading] = useState(false);

  useEffect(() => {
    async function getActiveUser() {
      try {
        setActiveUserLoading(true);
        const response = await fetch("http://localhost:3070/user/active", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.error) {
          throw new Error(data.message);
        }
        setActiveUser(data);
      } catch (err) {
        setActiveUserError(err);
      } finally {
        setActiveUserLoading(false);
      }
    }

    getActiveUser();
  }, [token]);

  return { activeUser, activeuserError, activeuserLoading };
}

export default useGetActiveUser;
