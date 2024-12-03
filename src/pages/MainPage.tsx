import { useEffect, useState } from "react";
import Title from "../components/Title";
import useRecipeActions from "../hooks/useRecipeActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import RecipeItem from "../components/MealItem";
import { Link } from "react-router-dom";
import {
  EllipsisPagination,
  PaginationButton,
  SimplePagination,
} from "../components/Pagination";

function MainPage() {
  const { fetchRecipes } = useRecipeActions();
  const { recipes } = useTypedSelector((state) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 3 columns * 5 rows
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes || []);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      const filtered = recipes?.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredRecipes(filtered || []);
      setCurrentPage(1);
    } else {
      setFilteredRecipes(recipes || []);
    }
  }, [debouncedQuery, recipes]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (!recipes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Title title="Recipes" />
      <div className="flex-row">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a recipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <header className="p-4 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              Recipe App
            </Link>
            <nav>
              <Link to="/favorites" className="ml-4 hover:underline">
                Favorites
              </Link>
            </nav>
          </div>
        </header>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {currentRecipes.map((recipe, index) => (
          <RecipeItem key={index} recipe={recipe} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {/* Previous Button */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          label="Previous"
        />

        {/* Page Numbers */}
        {totalPages <= 10 ? (
          <SimplePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        ) : (
          <EllipsisPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Next Button */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          label="Next"
        />
      </div>
    </div>
  );
}

export default MainPage;
