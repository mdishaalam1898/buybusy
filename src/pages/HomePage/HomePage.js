import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import styles from "./HomePage.module.css";
import Filter from "../../components/Home/Filter/Filter";
import MainContent from "../../components/Home/MainContent/MainContent";

// render homepage
export function HomePage() {
  // loading status by default true
  const [isLoading, setLoading] = useState(true);

  // to whether show/hide the filter bar on homepage
  const [applyFilter, setApplyFilter] = useState(false);

  // to filter item on the basis of price and item category
  const [price, setPrice] = useState(5000);
  const [category, setCategory] = useState("none");

  // for searched item
  const [search, setSearch] = useState("");

  // hide loader spinner
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  // return component
  return (
    <>
      {/* checking whether to show/hide loading spinner */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* page header */}
          <div className={styles.header}>
            {/* search bar */}
            <input
              type="text"
              placeholder="Search Item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* apply filter button  */}
            {/* show/hide on button click */}
            <button onClick={() => setApplyFilter(!applyFilter)}>
              {applyFilter ? "Cancel" : "Apply Filter"}
            </button>
          </div>

          {/* rendering all the products and filter bar */}
          <div className={styles.mainContainer}>
            {/* is applyFilter "true" then render it  */}
            {applyFilter && (
              <Filter
                price={price}
                setPrice={setPrice}
                setCategory={setCategory}
              />
            )}

            {/* show all the products */}
            {/* props to apply filter on the products */}
            <MainContent
              search={search}
              price={price}
              category={category}
              applyFilter={applyFilter}
            />
          </div>
        </>
      )}
    </>
  );
}