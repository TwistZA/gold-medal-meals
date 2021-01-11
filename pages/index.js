import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/Layout/Layout";
import MealsTable from "../src/components/MealsTable/MealsTable";

export default function Home({ categories }) {
  return <Layout>{<MealsTable categories={categories} />}</Layout>;
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const categories = await res.json();
  return {
    props: {
      categories,
    },
  };
};
