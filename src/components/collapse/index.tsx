"use client";

import { useState } from "react";
import { PropTypes } from "./types";

const Collapse = ({ data }: PropTypes) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center mb-2">
        {isExpanded
          ? data.map((s, index) => <div key={index}>{s}</div>)
          : data.slice(0, 2).map((s, index) => <div key={index}>{s}</div>)}
      </div>
      {data.length > 2 && (
        <button
          className="border border-blue-500 rounded-lg w-max p-1 cursor-pointer hover:text-black hover:bg-white text-white bg-blue-500 text-xs"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  );
};

export default Collapse;
