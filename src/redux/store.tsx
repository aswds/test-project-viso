import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../redux/recipeSlice";
import favoritesReducer from "../redux/favoriteSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
