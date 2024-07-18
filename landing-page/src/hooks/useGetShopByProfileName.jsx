// Este custom hook obtiene un negocio por nombre de perfil.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useGetShopByProfileName() {
  const token = localStorage.getItem("accessToken");
  const { profilename } = useParams("profilename");
  const [shopByProfileName, setShopByProfileName] = useState({});
  const [shopByProfileNameLoading, setShopByProfileNameLoading] =
    useState(false);
  const [shopByProfileNameError, setShopByProfileNameError] = useState(null);

  useEffect(() => {
    async function getShopByProfileName() {
      try {
        setShopByProfileNameLoading(true);
        const response = await fetch(
          `http://localhost:3070/shop/filter/profile/${profilename}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.error) {
          throw new Error();
        }
        setShopByProfileName(data);
      } catch (err) {
        setShopByProfileNameError(err);
      } finally {
        setShopByProfileNameLoading(false);
      }
    }

    getShopByProfileName();
  }, [token, profilename]);

  return {
    shopByProfileName,
    shopByProfileNameLoading,
    shopByProfileNameError,
  };
}

export default useGetShopByProfileName;
