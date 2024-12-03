import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as recipesActions from "../redux/recipeSlice";
import * as favoriteActions from "../redux/favoriteSlice";
const useRecipeActions = () => {
  const dispatch = useDispatch();

  const recipeActions = bindActionCreators(recipesActions, dispatch);
  const boundFavoriteActions = bindActionCreators(favoriteActions, dispatch);
  return {
    ...recipeActions,
    ...boundFavoriteActions,
  };
};

export default useRecipeActions;
