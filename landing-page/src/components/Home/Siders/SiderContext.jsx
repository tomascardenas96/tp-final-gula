import React, { useState } from "react";
import { createContext } from "react";

export const removeHeaderContext = createContext();

function SiderContext({ children }) {
  const [isRemovedHeader, setIsRemovedHeader] = useState(false);

  function removeHeader() {
    setIsRemovedHeader(true);
  }

  return (
    <>
      <removeHeaderContext.Provider value={{ removeHeader, isRemovedHeader }}>
        {children}
      </removeHeaderContext.Provider>
    </>
  );
}

export default SiderContext;
