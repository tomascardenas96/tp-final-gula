import { useEffect, useState } from "react";

function useHome() {
  const token = localStorage.getItem("accessToken");
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [homeLoading, setHomeLoading] = useState(false);

  useEffect(() => {
    async function getAuthorizationToHome() {
      setHomeLoading(true);
      try {
        const response = await fetch("http://localhost:3070/auth/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.error) {
          localStorage.clear();
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          setHomeLoading(false);
        }, 1000);
      }
    }

    getAuthorizationToHome();
  }, [token]);

  return { isAuthorized, homeLoading };
}

export default useHome;
