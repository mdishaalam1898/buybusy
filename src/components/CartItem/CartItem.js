import { useProductContext } from "../../contexts/productContext";
import styles from "./CartItem.module.css"
// Render single cart item
export default function CartItem(props) {
  // Product data from props
  const { name, image, price, category, quantity } = props.product;
  const { removeFromCart, increaseQuant, decreaseQuant } = useProductContext();
  return (
    <>
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img src={image} alt={category} />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.namePrice}>{name}</div>
        <div className={styles.priceQuant}>
          <div className={styles.price}>₹{price}</div>
          <div className={styles.quantity}>
            <span className={styles.minus}>
              <i
                class="fa-solid fa-circle-minus"
                onClick={() => decreaseQuant(props.product)}
              ></i>
            </span>
            &nbsp;{quantity} &nbsp;
            <span className={styles.plus}>
              <i
                class="fa-solid fa-circle-plus"
                onClick={() => increaseQuant(props.product)}
              ></i>
            </span>
          </div>
        </div>
        <div className={styles.btnConatiner}>
          <button
            className={styles.removeBtn}
            onClick={() => removeFromCart(props.product)}
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
