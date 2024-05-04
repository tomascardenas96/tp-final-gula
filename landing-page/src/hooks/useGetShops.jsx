import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function useGetShops() {
  const token = localStorage.getItem("accessToken");
  const [shops, setShops] = useState([]);
  const [shopsByQueryLoading, setShopsByQueryLoading] = useState(false);
  const [shopsByQueryError, setShopsByQueryError] = useState(false);

  useEffect(() => {
    async function getShopsByQuery() {
      try {
        setShopsByQueryLoading(true);
        const response = await fetch("http://localhost:3070/shop", {
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
        setShops(data);
      } catch (err) {
        setShopsByQueryError("Error trying to get shops by query", err);
      } finally {
        setShopsByQueryLoading(false);
      }
    }

    getShopsByQuery();
  }, [token]);

  return { shops, shopsByQueryLoading, shopsByQueryError };
}

export default useGetShops;
