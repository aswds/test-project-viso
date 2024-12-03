import axios from "axios";
import { Recipe } from "../types";

export const fetchRecipesFromAPI = async (): Promise<{
  data: Recipe[];
}> => {
  const allMeals: Recipe[] = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  try {
    const mealRequests = alphabet.map((letter) =>
      axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      )
    );

    const mealsResults = await Promise.all(mealRequests);

    mealsResults.forEach((response) => {
      if (response.data.meals) {
        allMeals.push(...response.data.meals);
      }
    });
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
  return { data: allMeals };
};

export const fetchRecipeById = async (id: string) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const meal = response.data.meals ? response.data.meals[0] : null;
    return meal;
  } catch (error) {
    console.error("Error fetching the recipe:", error);
    throw new Error("Could not fetch the recipe");
  }
};
