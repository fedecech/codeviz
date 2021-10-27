import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useScreenType } from "../../hooks/useScreenType";
import { MenuAlt3Icon, XIcon } from "@heroicons/react/outline";
import NavLinks from "./NavLinks";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const st = useScreenType();

  const toggleOpen = () => {
    setIsOpen((s) => !s);
  };

  const isMobile = st === "mobile";

  return (
    <div
      className={`w-full ${isOpen ? `h-full` : `h-16`}  relative`}
      style={{ backgroundColor: "#5332DA" }}
    >
      <div
        className={`flex items-center px-4 space-x-24 h-16 sticky top-0 w-full z-10 ${
          isMobile && `justify-between`
        }`}
      >
        <Link to="/">
          <a href="/" className="text-2xl text-white font-medium">
            CodeViz
          </a>
        </Link>
        {isMobile ? (
          <button onClick={toggleOpen}>
            {isOpen ? (
              <XIcon className="w-7 h-7 text-white" />
            ) : (
              <MenuAlt3Icon className="w-7 h-7 text-white" />
            )}
          </button>
        ) : (
          <NavLinks st={st} />
        )}
      </div>
      {isOpen && isMobile && (
        <div className="absolute top-0 bottom-0 w-full h-full">
          <NavLinks />
        </div>
      )}
    </div>
  );
};

export default NavBar;
