import { useEffect, useState } from "react";
import styles from "./search.module.css";
import Welcome from "./Welcome";

const URL = import.meta.env.VITE_RECIPE_SAGA_API_URL;
const API_KEY = import.meta.env.VITE_RECIPE_SAGA_API_KEY;

export default function Search({ recipeData, setRecipeData }) {
  const [query, setQuery] = useState("");
  const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours
  useEffect(() => {
    const cachedData = localStorage.getItem(query);
    const cachedTime = localStorage.getItem(`${query}_time`);

    if (cachedData && Date.now() - cachedTime < CACHE_EXPIRATION_TIME) {
      setRecipeData(JSON.parse(cachedData));
    } else {
      async function fetchRecipe() {
        const response = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
        const data = await response.json();
        setRecipeData(data.results);
        localStorage.setItem(query, JSON.stringify(data.results));
        localStorage.setItem(`${query}_time`, Date.now());
      }

      fetchRecipe();
    }
  }, [query]);

  return (
    <div className={styles.body}>
      <Welcome />
      <p className={styles.searchText}>What are you craving today? Type it in, and let's start your next delicious discovery!</p>
    <div className={styles.searchContainer}>
      <input placeholder="Enter food here (e.g pizza, pancakes, etc)..."
        className={styles.input}
        value={query}
        onChange={(c) => setQuery(c.target.value)}
        type="text"
      />
    </div>
    </div>
  );
}
