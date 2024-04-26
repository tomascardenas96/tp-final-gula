import { useState } from "react";

function useLogOut() {
  const [logOutLoading, setLogOutLoading] = useState(false);

  function handleLogOut() {
    setLogOutLoading(true);
    setTimeout(() => {
      localStorage.clear();
      location.reload();
    }, 1000);
  }

  return { handleLogOut, logOutLoading };
}

export default useLogOut;
