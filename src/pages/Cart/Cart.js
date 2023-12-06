// Cart page

import { useState } from "react";
import { useProductContext } from "../../contexts/productContext";
import { UseAuthValue } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Cart() {
  // To show/hide loading spinner on the page
  const [isLoading, setLoading] = useState(true);
  const { cart, total, clearCart, purchaseAll, itemInCart } =
    useProductContext();
  const { userLoggedIn } = UseAuthValue();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // Purchase button handler
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
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <div className={styles.userInfo}>
              <h1>
                Hey,{userLoggedIn.name},<small>your cart has</small>
              </h1>
            </div>
            <div className={styles.cartDetail}>
              <div>
                Item:{itemInCart}
                <br />
                <button className={styles.removeAll} onClick={{ clearCart }}>
                  Remove All
                </button>
              </div>
              <div>
                Total Amount:₹{total}
                <br />
                <button className={styles.purchaseAll} onClick={handlePurchase}>
                  Purchase All
                </button>
              </div>
            </div>
          </div>
          <div className={styles.itemContainer}>
            {/* if cart is empty  */}
            {cart.length === 0 ? (
              // render this msg
              <h1>Nothing in Your Cart !!!</h1>
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
