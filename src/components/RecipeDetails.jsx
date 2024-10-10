import { useEffect, useState, useRef } from "react";
import styles from "./recipedetails.module.css";
import ItemList from "./ItemList";
import stopwatch from '/images/stopwatch-svgrepo-com.svg'
import pizza from '/images/food-color-pizza-slice-svgrepo-com.svg'
import mun from "/images/food-mun-thai-svgrepo-com.svg"
import veg from "/images/vegetables-salad-svgrepo-com.svg"

const API_KEY = import.meta.env.VITE_RECIPE_SAGA_API_KEY;

export default function RecipeDetails({ recipeId }) {
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const recipeCardRef = useRef(null); // Reference to the recipe card section
  const URL = `https://api.spoonacular.com/recipes/${recipeId}/information`;
  const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

  useEffect(() => {
    const cachedData = localStorage.getItem(recipeId);
    const cachedTime = localStorage.getItem(`${recipeId}_time`);

    const scrollToElement = () => {
      if (recipeCardRef.current) {
        const rect = recipeCardRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY + rect.top - 90; // Adjust this offset to control exact position
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }
    };

    if (cachedData && Date.now() - cachedTime < CACHE_EXPIRATION_TIME) {
      const parsedData = JSON.parse(cachedData);
      setNote(parsedData);
      setIsLoading(false);
      console.log(
        `${parsedData.title} recipe was fetched from local cache storage`
      );
      console.log(parsedData);

      // Scroll to the exact position
      scrollToElement();
    } else {
      // If no cached data, fetch from the API
      async function fetchRecipe() {
        const response = await fetch(`${URL}?apiKey=${API_KEY}`);
        const data = await response.json();
        console.log("Fetched from API online:", data.title);
        console.log(data);
        setIsLoading(false);

        // Cache the data and set state
        localStorage.setItem(recipeId, JSON.stringify(data));
        localStorage.setItem(`${recipeId}_time`, Date.now());
        setNote(data);

        // Scroll to the exact position
        scrollToElement();
      }
      fetchRecipe();
    }
  }, [recipeId]);

  return (
    <div ref={recipeCardRef} className={styles.recipeCard}>
      <p className={styles.recipeHeading}>Recipe Details</p>
      <div>
        <p className={styles.recipeName}>{note.title}</p>
        <img
          className={styles.recipeImage}
          src={note.image}
          alt={`Image of ${note.title}`}
        />
      </div>
      <div className={styles.recipeDetails}>
        <span>
          <strong>
            <img
              className={styles.recipeDetailsclock}
              src={stopwatch}
            />
            <br />
            {note.readyInMinutes} Minutes
          </strong>
        </span>
        <span>
          <strong>
          <img
            className={styles.recipeDetailsImage}
            src={veg}
          />
          <br />
          Number of servings: {note.servings}
          </strong>
        </span>

        <span>
          <strong>
          <img
            className={styles.recipeDetailsImage}
            src={
              note.vegeterian
                ? mun
                : pizza
            }
          />
          <br />
          {note.vegeterian ? "Vegetarian food" : "Non-vegetarian food"}
          </strong>
        </span>
      </div>
      <h2>Ingredients</h2>
      <ItemList note={note} />
      <h2>Instructions</h2>
      <div className={styles.recipeInstructions}>
        <ol>
        {note.analyzedInstructions && note.analyzedInstructions.length > 0 ? (
          <ol>
            {note.analyzedInstructions[0].steps.map((step, index) => (
              <li key={index}>{step.step}</li>
            ))}
          </ol>
        ) : (
          <p>No instructions available.</p> // Fallback message
        )}
        </ol>
      </div>
    </div>
  );
}
