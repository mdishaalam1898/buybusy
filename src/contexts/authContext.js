import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseInit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Create ContextAPI for Authentication
export const authContext = createContext();

// Custom Context Hook to return values
export function UseAuthValue() {
  const value = useContext(authContext);
  return value;
}
// Custom Context Provider

export function AuthContext({ children }) {
  // List of all the users in database
  const [userList, setUserList] = useState([]);

  // LoggedIn User's Status
  const [isLoggedIn, setLoggedIn] = useState(false);

  // User Who is logged in
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  // Getting all the users from database
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "buybusy"), (snapShot) => {
      const users = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUserList(users);
    });
  }, [isLoggedIn]);

  // Creating New User
  async function createUser(data) {
    // Checking whether email address already in use or not
    const index = userList.findIndex((user) => user.email === data.email);

    // If found display notification
    if (index !== -1) {
      toast.error("Email address already exist, Try again or signIn instead");
      return;
    }

    // If email not found create new User
    const docRef = await addDoc(collection(db, "buybusy"), {
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
      orders: [],
    });
    toast.success("New User created, Please login to continue");
  }

  // Sign in User

  async function SignIn(data) {
    // Finding User in databse
    const index = userList.findIndex((user) => user.email === data.email);

    // if user not display notification
    if (index === -1) {
      toast.error("Email does not exist, Try again or SignUp instead");
      return false;
    }
    // If email found in database then match password
    if (userList[index].password === data.password) {
      toast.success("Sign in Successfully!");

      // Logging in user and storing its data inlocal variable
      setLoggedIn(true);
      setUserLoggedIn(userList[index]);

      // Generating User's Login token and store user's data
      window.localStorage.setItem("token", true);
      window.localStorage.setItem("index", JSON.stringify(userList[index]));
      return true;
    } else {
      // If password does not match in database

      toast.error("Wrong userName/password, Try again");
      return false;
    }
  }

  // Sign out function
  function SignOut() {
    // Removing user's data and token from local storage
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("index");

    // Set log in status
    setLoggedIn(false);

    // LoggedIn user's data
    setUserLoggedIn(null);
    toast.success("Sign Out Successfully!");
  }
  return (
    // Context API with values
    <authContext.Provider
      value={{
        createUser,
        isLoggedIn,
        setLoggedIn,
        SignIn,
        userLoggedIn,
        setUserLoggedIn,
        SignOut,
      }}
    >
      <ToastContainer/>
      {children}
    </authContext.Provider>
  );
}
