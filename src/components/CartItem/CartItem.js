import { useProductContext } from "../../contexts/productContext";
import styles from "./CartItem.module.css"
// Render single cart item
export default function CartItem(props) {
  // Product data from props
  // console.log(props.product);
  const { name, image, price, category, quantity } = props.product;
 
  const { removeFromCart, increaseQuant, decreaseQuant } = useProductContext();
  return (
    <>
     {/* item card container */}
     <div className={styles.cardContainer} >
                {/* image container */}
                <div className={styles.imageContainer}>
                    {/* product image */}
                    <img src={image} alt={category} />
                </div>

                {/* description of the product name,price, add button */}
                <div className={styles.itemInfo}>
                    {/* product name */}
                    <div className={styles.namePrice}>
                        {name}
                    </div>
                    
                    <div className={styles.priceQuant}>
                        {/* price of the product */}
                        <div className={styles.price}>
                            ₹{price}   
                        </div>

                        {/* quantity of the product */}
                        <div className={styles.quantity}>

                            {/* to decrease product quantity */}
                            <span className={styles.minus}>
                                <i class="fa-solid fa-circle-minus"
                                    onClick={() => decreaseQuant(props.product)} ></i> 
                            </span>

                            {/* quantity */}
                             &nbsp; {quantity} &nbsp;

                            {/* increase product quantity */}
                            <span className={styles.plus}>
                                <i class="fa-solid fa-circle-plus"
                                    onClick={() => increaseQuant(props.product)}></i>    
                            </span>
                            
                        </div>

                    </div>

                    {/* remove from cart button */}
                    <div className={styles.btnContainer}>
                        <button className={styles.removeBtn}
                                onClick={() => removeFromCart(props.product)}>
                            Remove From Cart
                        </button>
                    </div>

                </div>

            </div>
    </>
  );
}
