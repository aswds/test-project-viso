import { Link } from "react-router-dom";
import { Recipe } from "../types";

const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  const { strMeal, strMealThumb, strCategory, strArea } = recipe;

  return (
    <Link to={`/recipe/${recipe?.idMeal}`}>
      <div className="p-6 bg-gray-50 ">
        {/* Recipe Image */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={strMealThumb}
            alt={strMeal}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Recipe Details */}
        <div className="mt-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{strMeal}</h1>
          <div className="flex items-center justify-between text-gray-600">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
              {strCategory}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
              {strArea}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeItem;
