import { useState } from "react";

function useGetUsersAndShopsByQuery() {
  const token = localStorage.getItem("accessToken");
  const [headerFilter, setHeaderFilter] = useState([]);
  const [headerFilterLoading, setHeaderFilterLoading] = useState(false);
  const [headerFilterError, setHeaderFilterError] = useState(false);
  const [filterInput, setFilterInput] = useState("");

  async function getShopsByQuery(value) {
    try {
      setHeaderFilterLoading(true);
      const response = await fetch(
        `http://localhost:3070/shop/filter?shop=${value}`,
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
        throw new Error(data.error);
      }
      setHeaderFilter((prevHeaderFilter) => ({
        ...prevHeaderFilter,
        shops: data,
      }));
    } catch (err) {
      setHeaderFilterError("Error trying to get list of shops", err);
    } finally {
      setHeaderFilterLoading(false);
    }
  }

  async function getUsersByQuery(value) {
    try {
      setHeaderFilterLoading(true);
      const response = await fetch(
        `http://localhost:3070/user/filter?name=${value}`,
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
        throw new Error(data.error);
      }
      setHeaderFilter((prevHeaderFilter) => ({
        ...prevHeaderFilter,
        users: data,
      }));
    } catch (err) {
      setHeaderFilterError("Error trying to get list of users", err);
    } finally {
      setHeaderFilterLoading(false);
    }
  }

  function handleChangeHeaderFilter(e) {
    const { value } = e.target;
    if (value.trim() === "" && value !== "") {
      return;
    }
    setFilterInput(value);
    getShopsByQuery(value);
    getUsersByQuery(value);
  }

  function clearInput() {
    setFilterInput("");
  }

  const isEmptyField = filterInput.length === 0;

  return {
    headerFilterLoading,
    headerFilterError,
    isEmptyField,
    handleChangeHeaderFilter,
    headerFilter,
    filterInput,
    clearInput
  };
}

export default useGetUsersAndShopsByQuery;
