import React from "react";
import styles from "./MealsTable.module.css";

const MealsTable = ({ categories }) => {
  return (
    <div className={styles.meals_container}>
      {categories.categories.map((category) => (
        <div className={styles.card} key={category.strCategory}>
          <img src={category.strCategoryThumb} alt={category.strCategory}></img>
          <div className={styles.recipe_button}>
            <a href="#">
              <h1>{category.strCategory} Recipes</h1>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealsTable;
