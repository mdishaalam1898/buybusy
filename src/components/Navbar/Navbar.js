// Navbar Component

import { NavLink, Outlet } from "react-router-dom";
import { UseAuthValue } from "../../contexts/authContext";
import styles from "./Navbar.module.css";
export default function Navbar() {
  // User's login status
  const { isLoggedIn, SignOut } = UseAuthValue();

  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.appName}>
          <NavLink to="/">Buy Busy</NavLink>
        </div>
        <div className={styles.navLinks}>
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
          {isLoggedIn && (
            <NavLink to="myorder">
              <span>My Order</span>
            </NavLink>
          )}
          {isLoggedIn && <NavLink to="/cart">Cart</NavLink>}
          <NavLink to={!isLoggedIn ? "/signin" : "/"}>
            <span>
              {!isLoggedIn ? (
                <>
                  {/* sign in icon */}
                  <i class="fa-solid fa-right-to-bracket"></i>
                  SignIn
                </>
              ) : (
                <>
                  {/* sign out icon */}
                  <i class="fa-solid fa-right-from-bracket"></i>
                  {/* sign out user  */}
                  <span onClick={SignOut}>SignOut</span>
                </>
              )}
            </span>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
}
