interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  ingredients: Ingredient[];
  strSource: string;
}

// Pagination State
export interface PaginationState {
  currentPage: number;
  totalPages: number;
}

// Recipes State
export interface RecipesState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  filteredRecipes: Recipe[];
  searchQuery: string;
  selectedRecipes: Recipe[];
  loading: boolean;
  error: string | null;
}
