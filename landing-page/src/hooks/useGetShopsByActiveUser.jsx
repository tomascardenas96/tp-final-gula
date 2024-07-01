import React, { useEffect, useState } from "react";

function useGetShopsByActiveUser() {
  const token = localStorage.getItem("accessToken");
  const [shops, setShops] = useState([]);
  const [shopsLoading, setShopsLoading] = useState(false);
  const [shopsError, setShopsError] = useState(null);
  const [isShopsEmpty, setIsShopsEmpty] = useState(false);

  useEffect(() => {
    async function getShopsByActiveUser() {
      try {
        setShopsLoading(true);
        const response = await fetch("http://localhost:3070/shop/active-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.length) {
          setIsShopsEmpty(true);
          return;
        }
        if (data.error) {
          throw new Error(data.error);
        }
        setShops(data);
      } catch (err) {
        setShopsError(err);
      } finally {
        setShopsLoading(false);
      }
    }

    getShopsByActiveUser();
  }, [token]);

  function getFormatedDate(date) {
    const newDateFormat = new Date(date);
    const day = newDateFormat.getDate();
    const month = newDateFormat.getMonth() + 1;
    const year = newDateFormat.getFullYear();

    const formatedDay = day.toString().padStart(2, "0");
    const formatedMonth = month.toString().padStart(2, "0");

    return `${formatedDay}/${formatedMonth}/${year}`;
  }

  return { shops, shopsLoading, shopsError, isShopsEmpty, getFormatedDate };
}

export default useGetShopsByActiveUser;
