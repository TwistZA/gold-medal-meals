import Layout from "../../src/components/Layout/Layout";
import styles from "./RecipeList.module.css";
import Link from "next/link";

export const getRecipeList = async (id) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );

  const recipe_list = await res.json();

  return recipe_list.meals;
};

export default function RecipeList({ recipe_list }) {
  const recipePathPrefix = "/recipes/";

  return (
    <Layout>
      <div className={styles.recipe_list_container}>
        {recipe_list.map((recipe) => (
          <Link href={`/recipes/${recipe.idMeal}`} key={recipe.idMeal}>
            <div className={styles.card} key={recipe.idMeal}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal}></img>
              <div className={styles.recipe_button}>
                <a href={`${recipePathPrefix}${recipe.strMeal}`}>
                  <h3>{recipe.strMeal}</h3>
                  <button className={styles.recipe_button_inner}>Recipe</button>
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const categories = await res.json();

  const paths = categories.categories.map((category) => ({
    params: { id: category.strCategory },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const recipe_list = await getRecipeList(params.id);
  return {
    props: {
      recipe_list,
    },
  };
};
