import React, { useEffect, useState } from "react";
import { GiMeat } from "react-icons/gi";
import { GiHamburger } from "react-icons/gi";
import { GiCakeSlice } from "react-icons/gi";
import { BiSolidDrink } from "react-icons/bi";
import { IoMdBeer } from "react-icons/io";
import { GiFrenchFries } from "react-icons/gi";
import { GiNoodles } from "react-icons/gi";
import { GiFullPizza } from "react-icons/gi";
import { GiHotDog } from "react-icons/gi";

function useGetAllCategories() {
  const token = localStorage.getItem("accessToken");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  const categoryIcons = [
    <GiMeat />,
    <GiHamburger />,
    <GiHotDog />,
    <BiSolidDrink />,
    <GiCakeSlice />,
    <IoMdBeer />,
    <GiFrenchFries />,
    <GiNoodles />,
    <GiFullPizza />,
  ];

  useEffect(() => {
    async function getCategories() {
      try {
        setCategoriesLoading(true);
        const response = await fetch("http://localhost:3070/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.error) {
          throw new Error(data);
        }
        setCategories(data);
      } catch (err) {
        setCategoriesError(true);
      } finally {
        setCategoriesLoading(false);
      }
    }

    getCategories();
  }, [token]);

  return { categories, categoriesLoading, categoriesError, categoryIcons };
}

export default useGetAllCategories;
