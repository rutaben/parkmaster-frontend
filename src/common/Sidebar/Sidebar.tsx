import { Button } from "@mui/material";
import styles from "./Sidebar.module.scss";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";

export type SidebarLink = {
  title: string;
  icon: JSX.Element;
  link: string;
};

const sidebarLinks = [
  { title: "Vehicles", icon: <DirectionsCarIcon />, link: "/vehicles-list" },
  { title: "Settings", icon: <SettingsIcon />, link: "/settings" },
];

// Returns Sidebar with Navigation links (Desktop only)
const Sidebar = () => {
  return (
    <>
      <div className={styles.sidebarContainer}>
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
    </>
  );
};

export default Sidebar;
