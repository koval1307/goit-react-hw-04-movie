import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./headerNav.module.css";

export const HeaderNav = () => {
  return (
    <ul className={styles.list}>
      <li>
              <NavLink className={styles.link}
        activeClassName={styles.active}        exact  to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={styles.link}
          activeClassName={styles.active}
          to="/movies"
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};
