import React from "react";
import { useLoaderData } from "react-router-dom";
import { Recipe } from "../types";
import { useTypedSelector } from "../hooks/useTypedSelector";
import useRecipeActions from "../hooks/useRecipeActions";

const MealPage: React.FC = () => {
  const recipe = useLoaderData() as Recipe;
  const { addFavorite, removeFavorite } = useRecipeActions();

  const favorites = useTypedSelector((state: any) => state.favorites.favorites);
  const isFavorite = favorites.some(
    (fav: Recipe) => fav.idMeal === recipe.idMeal
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };
  return (
    <div className="meal-page max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      {/* Image Section */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-h-72 object-cover rounded-lg shadow-md mb-6"
      />

      {/* Content Section */}
      <div className="content">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {recipe.strMeal}
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {recipe.strCategory} - {recipe.strArea}
        </h2>
        <p className="text-gray-600 mb-6">{recipe.strInstructions}</p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Ingredients
        </h3>
        <ul className="list-disc pl-5 mb-6">
          {Object.keys(recipe)
            .filter((key) => key.startsWith("strIngredient"))
            .map((key, index) => {
              const ingredient = recipe[key as keyof Recipe] as string;
              const measure = recipe[
                `strMeasure${index + 1}` as keyof Recipe
              ] as string;
              return ingredient ? (
                <li key={index} className="text-gray-700">
                  <span className="font-medium">{ingredient}</span>{" "}
                  <span className="text-gray-500">({measure})</span>
                </li>
              ) : null;
            })}
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Video Tutorial
        </h3>
        {recipe.strYoutube && (
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mb-6 block"
          >
            Watch the Recipe Video
          </a>
        )}

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Source</h3>
        {recipe.strSource && (
          <a
            href={recipe.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Recipe Source
          </a>
        )}
      </div>
      <button
        onClick={toggleFavorite}
        className={`mt-2 px-4 py-2 rounded ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MealPage;
