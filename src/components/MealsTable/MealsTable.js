import styles from "./MealsTable.module.css";
import Link from "next/link";

const MealsTable = ({ categories }) => {
  return (
    <div className={styles.meals_container}>
      {categories.categories.map((category) => (
        <Link
          href={`/recipe_list/${category.strCategory}`}
          key={category.strCategory}
        >
          <div className={styles.card} key={category.strCategory}>
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
            ></img>
            <div className={styles.recipe_button}>
              <a href={category.strCategory}>
                <h3>{category.strCategory} Recipes</h3>
              </a>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MealsTable;
