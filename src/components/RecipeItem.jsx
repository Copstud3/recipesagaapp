import styles from "./recipeitem.module.css";

export default function RecipeItem({ recipe, setRecipeId }) {
  return (
    <div className={styles.itemContainer}>
      <img
        className={styles.itemImg}
        src={recipe.image}
        alt={`image of ${recipe.title}`}
      />
      <div className={styles.itemContent}>
        <p className={styles.itemName}>{recipe.title}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            setRecipeId(recipe.id);
          }}
          className={styles.itemButton}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}
