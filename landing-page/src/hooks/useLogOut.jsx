import { useState } from "react";

function useLogOut() {
  const [logOutLoading, setLogOutLoading] = useState(false);

  function handleLogOut() {
    setLogOutLoading(true);
    localStorage.clear();
    location.reload();
  }

  return { handleLogOut, logOutLoading };
}

export default useLogOut;
