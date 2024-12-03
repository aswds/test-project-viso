import { useSelector } from "react-redux";
import { Recipe } from "../types";
import RecipeItem from "../components/MealItem";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: any) => state.favorites.favorites);

  if (favorites.length === 0) {
    return <p className="text-center mt-6">No favorite recipes yet!</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Recipes</h1>
      <div className="grid grid-cols-3 gap-4">
        {favorites.map((recipe: Recipe) => (
          <RecipeItem key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
