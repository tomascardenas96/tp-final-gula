import React, { useEffect, useState } from "react";

function useSearchBar() {
  const [changeSearchInput, setChangeSearchInput] = useState("");
  const [isEmptyInput, setIsEmptyInput] = useState(true);

  function handleSubmitSearchBar(e) {
    e.preventDefault();
    console.log(changeSearchInput);
  }

  function handleChangeSearchBar(e) {
    const { value } = e.target;
    setChangeSearchInput(value);
  }

  useEffect(() => {
    function verifyEmptyField() {
      const isEmpty = changeSearchInput === "";
      setIsEmptyInput(isEmpty);
    }

    verifyEmptyField();
  }, [changeSearchInput]);

  return { handleSubmitSearchBar, handleChangeSearchBar, isEmptyInput };
}

export default useSearchBar;
