import RecipeItem from "./RecipeItem";
import styles from './recipelist.module.css'

export default function RecipeList({ recipeData, setRecipeId }) {
  return (
    <div className={styles.recipeListContainer}>
      {recipeData.map((recipe) => (
        <RecipeItem setRecipeId={setRecipeId} key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
