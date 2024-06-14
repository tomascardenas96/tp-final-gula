import React, { useState } from "react";

function useSwitchBarProfileShop() {
  const [profileBarState, setProfileBarState] = useState("");

  function switchToProfilePage() {
    setProfileBarState("profile");
  }

  function switchToLetterPage() {
    setProfileBarState("letter");
  }

  return { profileBarState, switchToProfilePage, switchToLetterPage };
}

export default useSwitchBarProfileShop;
