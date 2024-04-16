import React, { useState } from "react";

function useShowHidePassword() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return { togglePasswordVisibility, showPassword };
}

export default useShowHidePassword;
