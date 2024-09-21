import React, { useState } from "react";
import { createContext } from "react";
import { Toaster } from "sonner";

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
        <Toaster />
      </removeHeaderContext.Provider>
    </>
  );
}

export default SiderContext;
