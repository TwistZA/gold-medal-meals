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
  //get country by demonym, since mealDB API is returns demonym only ಠ_ಠ
  //Also doing some error checking for robustness since the API returns unknown for some fields

  let country_code = "EU";
  console.log(recipe[0].idMeal);
  const area = recipe[0].strArea.toUpperCase();
  if (area === "UNKNOWN") {
    country_code = "EU";
  } else if (area === "FRENCH") {
    country_code = "FR";
  } else if (area === "AMERICAN") {
    country_code = "US";
  } else {
    country_code = getCountry(recipe[0].strArea);
  }

  const flag_image_src = `https://www.countryflags.io/${country_code}/shiny/64.png`;

  const ingredientImageList = [
    recipe[0].strIngredient1,
    recipe[0].strIngredient2,
    recipe[0].strIngredient3,
    recipe[0].strIngredient4,
    recipe[0].strIngredient5,
    recipe[0].strIngredient6,
    recipe[0].strIngredient7,
    recipe[0].strIngredient8,
    recipe[0].strIngredient9,
    recipe[0].strIngredient10,
    recipe[0].strIngredient11,
    recipe[0].strIngredient12,
    recipe[0].strIngredient13,
    recipe[0].strIngredient14,
    recipe[0].strIngredient15,
    recipe[0].strIngredient16,
    recipe[0].strIngredient17,
    recipe[0].strIngredient18,
    recipe[0].strIngredient19,
    recipe[0].strIngredient20,
  ];

  const imageSources = ingredientImageList.map((item) => {
    if (item !== null) {
      if (item.length !== 0) {
        return `https://www.themealdb.com/images/ingredients/${item}.png`;
      }
    }
  });

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

          <img
            className={styles.flag}
            src={flag_image_src}
            alt={recipe[0].strArea}
          ></img>
          <div className={styles.recipeSubHeadingContainer}>
            <div className={styles.recipeSubHeadingCategory}>
              <h4 className={styles.Title}>Category:</h4>
              <h4>{recipe[0].strCategory}</h4>
            </div>
            <div className={styles.recipeSubHeadingCountry}>
              <h4 className={styles.Title}>Country:</h4>
              <h4>{recipe[0].strArea}</h4>
            </div>
          </div>
        </div>
        <div className={styles.recipeCard}>
          <h2>Ingredients</h2>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient1}</div>
            <div>{recipe[0].strMeasure1}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient2}</div>
            <div>{recipe[0].strMeasure2}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient3}</div>
            <div>{recipe[0].strMeasure3}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient4}</div>
            <div>{recipe[0].strMeasure4}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient5}</div>
            <div>{recipe[0].strMeasure5}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient6}</div>
            <div>{recipe[0].strMeasure6}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient7}</div>
            <div>{recipe[0].strMeasure7}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient8}</div>
            <div>{recipe[0].strMeasure8}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient9}</div>
            <div>{recipe[0].strMeasure9}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient10}</div>
            <div>{recipe[0].strMeasure10}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient11}</div>
            <div>{recipe[0].strMeasure11}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient12}</div>
            <div>{recipe[0].strMeasure12}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient13}</div>
            <div>{recipe[0].strMeasure13}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient14}</div>
            <div>{recipe[0].strMeasure14}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient15}</div>
            <div>{recipe[0].strMeasure15}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient16}</div>
            <div>{recipe[0].strMeasure16}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient17}</div>
            <div>{recipe[0].strMeasure17}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient18}</div>
            <div>{recipe[0].strMeasure18}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient19}</div>
            <div>{recipe[0].strMeasure19}</div>
          </div>
          <div className={styles.ingredientsContainer}>
            <div>{recipe[0].strIngredient20}</div>
            <div>{recipe[0].strMeasure20}</div>
          </div>

          <div className={styles.ingredientsImages}>
            {imageSources.map((src) =>
              src ? (
                <img src={src} alt={recipe[0].strMeal} key={src}></img>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
        <div className={styles.recipeCard}>
          <h2>Method</h2>

          <p>{recipe[0].strInstructions}</p>
        </div>
        <div className={styles.card}>
          <h2>More {recipe[0].strArea} recipes</h2>
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

  // HACK DELETE!!!!!!!!!!!!!!!
  // const filteredCategories = ["Goat"];
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
