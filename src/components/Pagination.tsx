export const PaginationButton = ({ onClick, disabled, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 border rounded ${
      disabled
        ? "text-gray-400 border-gray-300 cursor-not-allowed"
        : "text-blue-600 border-blue-500 hover:bg-blue-100"
    }`}
    aria-label={`${label} Page`}
  >
    {label}
  </button>
);

export const SimplePagination = ({ totalPages, currentPage, onPageChange }) => (
  <>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
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
  </>
);

export const EllipsisPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];
  const visiblePages = 7; // Number of pages to show before ellipsis

  // If the current page is within the first 7 pages
  if (currentPage <= visiblePages) {
    for (let i = 1; i <= visiblePages; i++) {
      pages.push(renderPageButton(i, currentPage, onPageChange));
    }
    pages.push(renderEllipsis());
    pages.push(renderPageButton(totalPages, currentPage, onPageChange));
  }
  // If the current page is near the last few pages
  else if (currentPage > totalPages - visiblePages) {
    pages.push(renderPageButton(1, currentPage, onPageChange));
    pages.push(renderEllipsis());
    for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
      pages.push(renderPageButton(i, currentPage, onPageChange));
    }
  }
  // If the current page is somewhere in the middle
  else {
    pages.push(renderPageButton(1, currentPage, onPageChange));
    pages.push(renderEllipsis());
    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
      pages.push(renderPageButton(i, currentPage, onPageChange));
    }
    pages.push(renderEllipsis());
    pages.push(renderPageButton(totalPages, currentPage, onPageChange));
  }

  return <>{pages}</>;
};

// Helper Functions for EllipsisPagination
const renderPageButton = (page, currentPage, onPageChange) => (
  <button
    key={page}
    onClick={() => onPageChange(page)}
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
);

const renderEllipsis = () => (
  <span key={`ellipsis-${Math.random()}`} className="px-2 text-gray-500">
    ...
  </span>
);
