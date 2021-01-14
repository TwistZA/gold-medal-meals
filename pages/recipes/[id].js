import Layout from "../../src/components/Layout/Layout";
import styles from "./Recipes.module.css";
import { useRouter } from "next/router";

export const getRecipe = async (id) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const recipe_list = await res.json();

  return recipe_list.meals;
};

export const getCategory = () => {
  return "Beef";
};

export const getAllCategories = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  const allCats = await res.json();

  return allCats;
};

const getAllRecipes = async (allCategoryIDs) => {
  const recipesAppended = [];
  for (var id in allCategoryIDs) {
    // console.log(allCategoryIDs[id]);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${allCategoryIDs[id]}`
    );

    const recipe_list = await res.json();
    // console.log(recipe_list.meals);

    const newRecipesIDs = recipe_list.meals.map((item) => item.idMeal);
    recipesAppended.push(newRecipesIDs);
    // console.log(recipesAppended);
  }
  // const allRecipeIDs = recipe_list.meals.map((item) => item.idMeal);
  return recipesAppended.flat();
};

export default function Recipe({ recipe }) {
  return (
    <Layout>
      <div className={styles.recipe_list_container}>
        <div className={styles.card}>
          <img src={recipe[0].strMealThumb} alt={recipe[0].strMeal}></img>
          <div className={styles.recipe_button}>
            <a href="#">
              <h3>{recipe[0].strMeal}</h3>
              <button className={styles.recipe_button_inner}>Recipe</button>
              <p>{recipe[0].strInstructions}</p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  //loop through for every category
  // get recipelist
  //loop through for every recipelist item
  console.log("===================================");
  const allCategories = await getAllCategories();
  const filteredCategories = allCategories.categories.map(
    (item) => item.strCategory
  );
  // console.log(filteredCategories);

  const allRecipes = await getAllRecipes(filteredCategories);

  console.log(allRecipes);
  allRecipes.map((id) => {
    console.log(id);
  });

  const paths = allRecipes.map((id) => ({
    params: {
      id: id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const recipe = await getRecipe(params.id);

  return {
    props: {
      recipe,
    },
  };
};
