import { useEffect, useState } from "react";
import { useProductContext } from "../../contexts/productContext";
import { Link } from "react-router-dom";
import OrderDetail from "../../components/Order/OrderDetails";
import styles from "./myOredr.module.css";
import Loader from "../../components/Loader/Loader";

// render my order page
export function MyOrder() {
  // getting all order's from custom context hook
  const { myOrders } = useProductContext();

  // to show/hide loading spinner on the page
  const [isLoading, setLoading] = useState(true);

  // hide the spinner after given time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    // conditions to show/hide spinner
    <>
      {isLoading ? (
        <Loader />
      ) : (
        // main page container
        <div className={styles.mainContainer}>
          <h1 className={styles.orderHeading}>My Orders</h1>

          {/* to show message if no order in list */}
          {myOrders.length === 0 ? (
            <>
              <h1>You haven't placed any order yet!</h1>
              {/* link to redirect to home page */}
              <Link to="/">Start Shopping!</Link>
            </>
          ) : (
            // if contains order than render them one by one
            // order list container
            <div className={styles.orderListContainer}>
              {myOrders.map((order, i) => (
                <OrderDetail key={i} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
