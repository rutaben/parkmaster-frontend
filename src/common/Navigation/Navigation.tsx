import React, { useState, useEffect, useRef } from "react";
import styles from "./Navigation.module.scss";
import cx from "classnames";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../pages/Vehicle/Vehicles/Vehicles";
import { signOut } from "../../store/auth/reducer";
import { routes } from "../../routing/routes";
import { useNavigate } from "react-router-dom";
import { resetFeeSettingStore } from "../../store/feeSetting/reducer";
import { resetVehicleStore } from "../../store/vehicle/reducer";

const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [searchInputVisible, setSearchInputVisible] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(resetFeeSettingStore());
    dispatch(resetVehicleStore());
    navigate(routes.signIn);
  };

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.navigation}>
        <div
          className={cx(styles.logoContainer, {
            [styles.searchVisible]: searchInputVisible,
          })}
        >
          <span className={styles.logoText}>parkmaster</span>
        </div>

        <div className={styles.navigationItems}>
          <div className={styles.userBox}>
            <IconButton
              onClick={handleOpenUserMenu}
              className={styles.userIconButton}
            >
              <Avatar alt="" />
            </IconButton>
          </div>

          <Menu
            className={styles.userMenu}
            anchorEl={anchorElUser}
            keepMounted
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
