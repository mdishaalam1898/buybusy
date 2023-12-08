// Navbar Component

import { NavLink, Outlet } from "react-router-dom";
// import { UseAuthValue } from "../../contexts/authContext";
import { UseAuthValue } from "../../contexts/authContext";
import styles from "./Navbar.module.css";
export default function Navbar() {
  // User's login status
  const { isLoggedIn, SignOut } = UseAuthValue();

  return (
    <>
       {/* main container */}
       <div className={styles.navbar}> 
                {/* app heading */}
                <div className={styles.appName}>
                    <NavLink to="/">
                        {/* logo of the app */}
                        <i class="fa-solid fa-shop"></i>
                        Buy Busy
                    </NavLink>
                </div>

                {/* all the navigation link */}
                <div className={styles.navLinks}>

                    {/* homepage link */}
                    <NavLink to="/">
                        <span>
                            {/* home logo */}
                            <i class="fa-solid fa-house"></i>
                            Home
                        </span>
                    </NavLink>

                    {/* myorder link */}
                    {/* show when user is logged in */}
                    {isLoggedIn && <NavLink to="/myorder">
                        <span>
                            {/* my order logo */}
                            <i class="fa-solid fa-bag-shopping"></i>
                            My Order
                        </span>
                    </NavLink> }


                    {/* cart link */}
                    {/* show when user is logged in */}
                    {isLoggedIn && <NavLink to="/cart">
                        <span>
                            {/* cart icon */}
                            <i class="fa-sharp fa-solid fa-cart-shopping"></i>
                            Cart
                        </span>
                    </NavLink> }


                    {/* for signIN and signOut */}
                    <NavLink to={!isLoggedIn?"/signin":"/"}>
                        <span>
                            {!isLoggedIn?
                                <>
                                    {/* sign in icon */}
                                    <i class="fa-solid fa-right-to-bracket"></i>
                                    SignIn
                                </>
                                :
                                <>
                                    {/* sign out icon */}
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    {/* sign out user  */}
                                    <span onClick={SignOut}>SignOut</span>
                                </>
                            }
                        </span>
                    </NavLink>
                </div>
            </div>
            {/* render child pages */}
            <Outlet />
    </>
  );
}
