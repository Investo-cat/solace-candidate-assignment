"use client";

import { PropTypes } from "./types";

const Pagination = (props: PropTypes) => {
  const { currentPage, totalCount, pagePerCount, setCurrentPage } = props;

  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const onNext = () => {
    if (currentPage < totalCount / pagePerCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <button
        onClick={onPrevious}
        className="relative inline-flex items-center p-2 hover:bg-blue-500 border cursor-pointer bg-blue-700 disabled:bg-gray-100 text-white disabled:text-gray-500"
        disabled={currentPage === 1}
      >
        {"<< Previous"}
      </button>

      <p className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-medium">
          {pagePerCount * (currentPage - 1) + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium">
          {Math.min(pagePerCount * currentPage, totalCount)}
        </span>{" "}
        of <span className="font-medium">{totalCount}</span> results
      </p>

      <button
        onClick={onNext}
        disabled={currentPage === Math.ceil(totalCount / pagePerCount)}
        className="relative inline-flex items-center p-2 hover:bg-blue-500 border cursor-pointer bg-blue-700 disabled:bg-gray-100 text-white disabled:text-gray-500"
      >
        {"Next >>"}
      </button>
    </div>
  );
};

export default Pagination;
