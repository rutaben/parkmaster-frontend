import { Button, IconButton } from "@mui/material";
import styles from "./Sidebar.module.scss";
import cx from "classnames";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import { useScreenSize, isDesktop } from "../../utilities/screenSize";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { routes } from "../../routing/routes";

export type SidebarLink = {
  title: string;
  icon: JSX.Element;
  link: string;
};

const sidebarLinks = [
  {
    title: "Vehicles",
    icon: <DirectionsCarIcon />,
    link: routes.vehicles.list,
  },
  { title: "Settings", icon: <SettingsIcon />, link: routes.settings },
];

// Returns Sidebar with Navigation links
const Sidebar = () => {
  const screenSize = useScreenSize();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktopSidebar, setIsDesktopSidebar] = useState(
    isDesktop(screenSize.dynamicWidth)
  );

  useEffect(() => {
    setIsDesktopSidebar(isDesktop(screenSize.dynamicWidth));
  }, [screenSize.dynamicWidth]);

  const handleExpandSidebarClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {isDesktopSidebar || isExpanded ? (
        <div
          className={cx(styles.sidebarContainer, {
            [styles.expandedSidebar]: isExpanded,
          })}
        >
          {isExpanded && (
            <IconButton
              onClick={() => setIsExpanded(false)}
              className={styles.closeButton}
            >
              <CloseIcon />
            </IconButton>
          )}
          <ul className={styles.sidebarItemList}>
            {sidebarLinks.map(({ title, icon, link }: SidebarLink) => (
              <li className={styles.sidebarItem} key={title}>
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    isActive ? styles.activeNavLink : styles.navLink
                  }
                >
                  <Button startIcon={icon} className={styles.button}>
                    {title}
                  </Button>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <IconButton
          onClick={handleExpandSidebarClick}
          className={styles.expandButton}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default Sidebar;
