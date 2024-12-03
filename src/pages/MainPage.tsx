import { useEffect, useState } from "react";
import Title from "../components/Title";
import useRecipeActions from "../hooks/useRecipeActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import RecipeItem from "../components/MealItem";
import { Link } from "react-router-dom";

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
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-blue-600 border-blue-500 hover:bg-blue-100"
          }`}
          aria-label="Previous Page"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "text-blue-600 border-blue-500 hover:bg-blue-100"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-blue-600 border-blue-500 hover:bg-blue-100"
          }`}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MainPage;
