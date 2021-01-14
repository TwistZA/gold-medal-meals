<div className={styles.recipe_list_container}>
  <div className={styles.card}>
    <img src={recipe.strMealThumb} alt={recipe.strMeal}></img>
    <div className={styles.recipe_button}>
      <a href="#">
        <h3>{recipe.strMeal}</h3>
        <button className={styles.recipe_button_inner}>Recipe</button>
      </a>
    </div>
  </div>
</div>;
