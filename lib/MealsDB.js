export async function getCategories() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const categories = await res.json();

  return categories;
}
