import { useEffect, useState } from "react";
import { useProductContext } from "../../contexts/productContext";
import { Link } from "react-router-dom";

// Render my order page
export function MyOrder() {
  const { MyOrders } = useProductContext();
  const [isLoading, setLoading] = useState(true);
  // Hide the spinner after given time
  useEffect(() => {
    setTimeout(() => {}, 300);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainContainer}>
          <h1 className={styles.orderHeading}>My Orders</h1>
          {MyOrders.length === 0 ? (
            <>
              <h1> You haven't placed any order yet!</h1>
              <Link to="/">Start Shopping</Link>
            </>
          ) : (
            <div className={styles.orderListContainer}>
              {MyOrders.map((order, i) => (
                <OrderDetail key={i} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
