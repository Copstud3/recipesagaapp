import { useState } from "react";
import Search from "./components/Search";
import RecipeList from "./components/RecipeList";
import Nav from "./components/Nav";
import "./app.css";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [recipeData, setRecipeData] = useState([]);
  const [recipeId, setRecipeId] = useState("658615");
  function load() {
    window.scrollTo(0, 0);
  };
  load();
  return (
    <>
      <Nav />
      <Search recipeData={recipeData} setRecipeData={setRecipeData} />
      <Container>
        <InnerContainer>
          <RecipeList setRecipeId={setRecipeId} recipeData={recipeData} />
        </InnerContainer>
        <InnerContainer>
          <RecipeDetails recipeId={recipeId} />
        </InnerContainer>
      </Container>
    </>
  );
}

export default App;
