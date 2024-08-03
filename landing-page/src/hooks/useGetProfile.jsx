import { useEffect, useState } from "react";

function useGetProfile() {
  const token = localStorage.getItem("accessToken");
  const [userImageURL, setUserImageURL] = useState("");
  const [userImageName, setUserImageName] = useState("");
  const [activeUserLoading, setActiveUserLoading] = useState(true);
  const [activeProfile, setActiveProfile] = useState({});

  useEffect(() => {
    async function getProfileByActiveUser() {
      try {
        const response = await fetch("http://localhost:3070/user/profile", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setActiveProfile(data);
        setUserImageName(data.profilePicture);
      } catch (err) {
      } finally {
        setActiveUserLoading(false);
      }
    }

    getProfileByActiveUser();
  }, [token]);

  useEffect(() => {
    const imageUrl = `http://localhost:3070/assets/uploads/profile/${userImageName}`;
    setUserImageURL(imageUrl);
  }, [userImageName]);

  return {
    activeProfile,
    userImageURL,
    userImageName,
    activeUserLoading,
  };
}

export default useGetProfile;
