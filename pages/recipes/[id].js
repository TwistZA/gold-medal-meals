import Layout from "../../src/components/Layout/Layout";
import styles from "./Recipes.module.css";
import { countries } from "../../lib/Countries";

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

const getCountry = (demonym) => {
  const country = countries.filter((c) => c.demonyms.eng.m === demonym);

  if (country !== null) {
    return country[0].cca2;
  } else {
    return "EU";
  }
};

export default function Recipe({ recipe }) {
  //get country by demonym, sonce mealDB API is returns demonym only ಠ_ಠ
  let country_code = "EU";
  console.log(recipe[0].idMeal);
  if (recipe[0].strArea.toUpperCase() !== "UNKNOWN") {
    country_code = getCountry(recipe[0].strArea);
  }
  const flag_image_src = `https://www.countryflags.io/${country_code}/shiny/64.png`;

  console.log(recipe[0].strArea + ":" + country_code);

  return (
    <Layout>
      <div className={styles.recipe_list_container}>
        <div className={styles.card}>
          <img
            className={styles.mealThumb}
            src={recipe[0].strMealThumb}
            alt={recipe[0].strMeal}
          ></img>
          <h1>{recipe[0].strMeal}</h1>

          <div className={styles.recipeSubHeadingContainer}>
            <div className={styles.recipeSubHeadingCategory}>
              <h4 className={styles.Title}>Category:</h4>
              <h4>{recipe[0].strCategory}</h4>
            </div>
            <img src={flag_image_src} alt={recipe[0].strArea}></img>

            <div className={styles.recipeSubHeadingCountry}>
              <h4 className={styles.Title}>Country:</h4>
              <h4>{recipe[0].strArea}</h4>
            </div>
          </div>
        </div>
        <div className={styles.recipeCard}>
          <h2>Ingredients</h2>
        </div>
        <div className={styles.recipeCard}>
          <h2>Method</h2>

          <p>{recipe[0].strInstructions}</p>
        </div>
        {recipe[0].strYoutube ? (
          <div className={styles.card}>
            <iframe
              width="320"
              height="200"
              src={recipe[0].strYoutube}
            ></iframe>
          </div>
        ) : (
          <div className={styles.card}></div>
        )}
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

  // HACK DELETE!!!!!!!!!!!!!!!
  //const filteredCategories = ["Goat"];
  //////////////////////////////

  //console.log(filteredCategories);

  const allRecipes = await getAllRecipes(filteredCategories);

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
