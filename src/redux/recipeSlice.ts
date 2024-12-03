import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Recipe, RecipesState } from "../types";
import { fetchRecipeById, fetchRecipesFromAPI } from "../services/fetchRecipes";

export const fetchRecipes = createAsyncThunk<Recipe[]>(
  "recipes/fetchRecipes",
  async () => {
    const response = await fetchRecipesFromAPI();
    return response.data;
  }
);

export const fetchRecipeDetails = createAsyncThunk<Recipe, string>(
  "recipes/fetchRecipeDetails",
  async (id) => {
    const response = await fetchRecipeById(id);
    return response.data;
  }
);

// Initial State
const initialState: RecipesState = {
  recipes: [],
  currentRecipe: null,
  filteredRecipes: [],
  searchQuery: "",
  selectedRecipes: [],
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    filterRecipesByCategory: (state, action: PayloadAction<string>) => {
      state.filteredRecipes = state.recipes.filter(
        (recipe) => recipe.category === action.payload
      );
    },
    searchRecipes: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredRecipes = state.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    toggleRecipeSelection: (state, action: PayloadAction<Recipe>) => {
      const exists = state.selectedRecipes.find(
        (recipe) => recipe.id === action.payload.id
      );
      if (exists) {
        state.selectedRecipes = state.selectedRecipes.filter(
          (recipe) => recipe.id !== action.payload.id
        );
      } else {
        state.selectedRecipes.push(action.payload);
      }
    },
    clearSelectedRecipes: (state) => {
      state.selectedRecipes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          console.log(action);
          state.loading = false;
          state.recipes = action.payload;
          state.filteredRecipes = action.payload;
        }
      )
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipes";
      })
      .addCase(
        fetchRecipeDetails.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.currentRecipe = action.payload;
        }
      );
  },
});

// Export Actions
export const {
  filterRecipesByCategory,
  searchRecipes,
  toggleRecipeSelection,
  clearSelectedRecipes,
} = recipesSlice.actions;

export default recipesSlice.reducer;
