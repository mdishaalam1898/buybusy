import { useContext } from "react";
import { createContext } from "react";
import { UseAuthValue } from "./authContext";
import { useState } from "react";
import { useEffect } from "react";
import { data } from "../Assets/data";
import { db } from "../firebaseInit";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// Create contextAPI for product
export const productContext = createContext();

// Custom context hook
export function useProductContext() {
  const value = useContext(productContext);
  return value;
}

// Custom provider
export function ProductContext({ children }) {
  // User's login status and loggedIn user
  const { isLoggedIn, userLoggedIn, setLoggedIn, setUserLoggedIn } =
    UseAuthValue();

  // Number of items in Cart
  const [itemInCart, setItemInCart] = useState(0);

  // All products in Cart
  const [cart, setCart] = useState([]);

  // all order placed by user
  const [myOrders, setMyOrders] = useState([]);

  // Total amount of user's cart
  const [total, setTotal] = useState(0);

  // Retunr date in yy/mm/dd format
  function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  // To check if the user is still logged inon page refresh
  useEffect(() => {
    // Getting user authentication token from local page
    const token = window.localStorage.getItem("token");
    if (token) {
      // LoggedIn user's data
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);
      setLoggedIn(token);
      setUserLoggedIn(user);
    }
  }, []);

  // Getting real time update of user's cart
  useEffect(() => {
    // Checking whether user is logged in or not
    if (isLoggedIn) {
      // getting real time update of data
      const unSub = onSnapshot(doc(db, "buybusy", userLoggedIn.id), (doc) => {
        setCart(doc.data().cart);
        setMyOrders(doc.data().orders);
      });
      // Total amount of products in cart
      let sum = 0;
      cart.map((item) => Number((sum += item.price)));
      setTotal(sum);
      setItemInCart(cart.length);
    }
  }, [userLoggedIn]);
  // To increase item's quantity
  async function increaseQuant(product) {
    // Finding items index in cart arrar
    const index = cart.findIndex((item) => item.name === product.name);
    cart[index].quantity++;
    setCart(cart);

    // Update cart in firebase database
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });

    // Increase itemCount and total amount
    setItemInCart(itemInCart + 1);
    setTotal(Number(total + cart[index].price));
  }

  async function decreaseQuant(product) {
    const index = cart.findIndex((item) => item.name === product.name);
    setTotal(Number(total - cart[index].price));
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    setCart(cart);
    setItemInCart(itemInCart - 1);

    const useRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(useRef, {
      cart: cart,
    });
  }
  // Function to add product to cart
  async function addToCart(product) {
    if (!isLoggedIn) {
      toast.error("Please login first!");
      return;
    }
    // Checking whether the product already in cart or not
    const index = cart.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      // if product already in cart then increase quantitiy
      increaseQuant(cart[index]);
      toast.success("product quantity increased!");
      return;
    }
    // Add product to the cart of loggedInusser
    const useRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(useRef, {
      cart: arrayUnion({ quantity: 1, ...product }),
    });
    // Increase item count and total amount
    setTotal(Number(total + product.price));
    setItemInCart(itemInCart + 1);
    toast.success("Added to your cart");
  }

  async function removeFromCart(product) {
    // update database
    const useRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(useRef, {
      cart: arrayRemove(product),
    });
    setTotal(Number(total - product.quantity * product.price));
    setItemInCart(itemInCart - product.quantity);
    toast.success("Removed from cart!");
  }
  // Clear cart
  async function clearCart() {
    if (itemInCart === 0) {
      toast.error("Nothing to remove from cart");
      return;
    }
    // Empty cart array in database
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: [],
    });
    setTotal(0);
    setItemInCart(0);
    toast.success("Empty cart");
  }
  async function purchaseAll() {
    const currentDate = getDate();
    // Adding order to database
    const useRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(useRef, {
      orders: arrayUnion({ data: currentDate, list: cart, amount: total }),
    });
    clearCart();
  }
  return (
    <productContext.Provider
      value={{
        data,
        addToCart,
        cart,
        total,
        setTotal,
        removeFromCart,
        clearCart,
        purchaseAll,
        myOrders,
        increaseQuant,
        decreaseQuant,
        itemInCart,
      }}
    >
      {children}
    </productContext.Provider>
  );
}
