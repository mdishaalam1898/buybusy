import { useProductContext } from "../../../contexts/productContext";
import styles from "./mainContent.module.css"
import ItemCard from "../ItemCard/ItemCard";

// To show all the products
export default function MainContent(props) {
  const { search, price, category, applyFilter } = props;

  const { data } = useProductContext();

  return (
    <div className={styles.itemContainer}>
    {/* filter on the basis of search bar */}
    {data.filter((item) => {
            return search.toLocaleLowerCase() === ''
            ? item
            :item.name.toLocaleLowerCase().includes(search)})
    // filter on the basis of price range
    .filter((item) => {
            return !applyFilter
            ? item
            :item.price <= price})
    // filter on the basis of category
    .filter((item) => {
            return !applyFilter || category === 'none'
            ? item
            :item.category === category})
    // map to each item of the array
    .map((item) => <ItemCard 
                            key={item.id} 
                            item={item} />)}
</div>

  );
}
