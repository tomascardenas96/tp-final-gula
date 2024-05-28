import { useContext, useState } from "react";
import { removeHeaderContext } from "../components/Home/Siders/SiderContext";

function useLogOut() {
  const [logOutLoading, setLogOutLoading] = useState(false);
  const { removeHeader } = useContext(removeHeaderContext);

  function handleLogOut() {
    removeHeader();
    setLogOutLoading(true);
    setTimeout(() => {
      localStorage.clear();
      location.reload();
    }, 1000);
  }

  return { handleLogOut, logOutLoading };
}

export default useLogOut;
