// Cart page

import { useState } from "react";
import { useProductContext } from "../../contexts/productContext";
import { UseAuthValue } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./Cart.module.css";
import Loader from "../../components/Loader/Loader";
import CartItem from "../../components/CartItem/CartItem";
// import styles from "./cart2.module.css"
// render the cart page
export function Cart() {
  // to show/hide the loading spinner on the page
  const [isLoading, setLoading] = useState(true);

  // data for product from custom hook (product)
  const { cart, total, clearCart, purchaseAll, itemInCart } =
    useProductContext();

  // data of user from custom hook (authentication)
  const { userLoggedIn } = UseAuthValue();

  // to navigate to some page
  const navigate = useNavigate();

  // to hide loading spinner after given time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // purchase button handler
  function handlePurchase() {
    // if cart empty return
    if (itemInCart === 0) {
      toast.error("Nothing to purchase in Cart!!");
      return;
    }

    // purchase function
    purchaseAll();
    // show notification
    toast.success("Your order has been Placed!!!");

    // navigate to myorder page
    navigate("/myorder");
  }
  console.log(cart, "cart");

  return (
    <>
      {/* condition to show/hide the loading spinner */}
      {isLoading ? (
        <Loader />
      ) : (
        // main container of the page
        <div className={styles.mainContainer}>
          {/* header within the page to show cart details */}
          <div className={styles.header}>
            {/* welcome message */}
            <div className={styles.userInfo}>
              <h1>
                Hey {userLoggedIn.name}, <small>Your Cart has</small>
              </h1>
            </div>

            {/* cart detail and purchase button */}
            <div className={styles.cartDetail}>
              <div>
                {/* items within the cart */}
                Item: {itemInCart}
                <br />
                {/* button to empty cart */}
                <button className={styles.removeAll} onClick={clearCart}>
                  Remove All
                </button>
              </div>

              <div>
                {/* total amount of all the products within the cart */}
                Total Amount: ₹{total}
                <br />
                {/* button to purchase product form cart */}
                <button className={styles.purchaseAll} onClick={handlePurchase}>
                  Purchase All
                </button>
              </div>
            </div>
          </div>

          {/* rendering all the products within the user's cart */}
          <div className={styles.itemContainer}>
            {/* if cart is empty  */}
            { cart.length ===0 ? (
              // render this msg
              <h1>Nothing in Your Cart!</h1>
            ) : (
              // else render all the product's one  by one
              cart.map((product, i) => <CartItem key={i} product={product} />)
            )}
          </div>
        </div>
      )}
    </>
  );
}
