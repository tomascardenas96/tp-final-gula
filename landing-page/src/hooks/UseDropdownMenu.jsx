//Este hook sirve para abrir o cerrar el modal del menu desplegable en la home page.
import React, { useState } from "react";

function UseDropdownMenu() {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  function handleDropdownMenu() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return { handleDropdownMenu, isDropdownMenuOpen };
}

export default UseDropdownMenu;
