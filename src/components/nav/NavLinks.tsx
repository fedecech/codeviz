import React from "react";
import { Link } from "react-router-dom";
import { ScreenType } from "../../hooks/useScreenType";

interface NavLinksProps {
  st?: ScreenType;
}

const NavLinks: React.FC<NavLinksProps> = ({ st = ScreenType.mobile }) => {
  const isMobile = st === ScreenType.mobile;
  const layout = isMobile
    ? `flex-col h-2/3 justify-evenly items-start`
    : `items-center space-x-12`;
  const text = isMobile ? `text-2xl` : `text-medium`;

  return (
    <div className={`flex items-center justify-center h-full`}>
      <div className={`flex ${layout} `}>
        <Link to="/docs">
          <a href="/docs" className={`${text} text-white`}>
            Help
          </a>
        </Link>
        <Link to="/docs">
          <a href="/docs" className={`${text} text-white`}>
            Documentation
          </a>
        </Link>
        <Link to="/docs">
          <a href="/docs" className={`${text} text-white`}>
            Documentation
          </a>
        </Link>
      </div>
    </div>
  );
};
export default NavLinks;
