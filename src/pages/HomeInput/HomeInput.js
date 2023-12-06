import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import styles from "./HomeInput.module.css"
import Filter from "../../components/Home/Filter/Filter";
import MainContent from "../../components/Home/MainContent/MainContent";
export function HomeInput() {
  const [isLoading, setLoading] = useState(true);
  const [applyFilter, setApplyFilter] = useState(false);
  const [price, setPrice] = useState(5000);
  const [category, setCategory] = useState("none");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {setLoading(false)}, 400);

  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.header}>
            <input
              type="text"
              placeholder="Search Products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => setApplyFilter(!applyFilter)}>
              {applyFilter ? "cancel" : "Apply Filter"}
            </button>
          </div>
          <div className={styles.mainContainer}>
            {applyFilter && (
              <Filter
                price={price}
                setPrice={setPrice}
                setCategory={setCategory}
              />
            )}
            <MainContent
              search={search}
              price={price}
              category={category}
              setApplyFilter={setApplyFilter}
            />
          </div>
        </>
      )}
    </>
  );
}
