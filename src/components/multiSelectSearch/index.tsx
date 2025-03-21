"use client";

import { useState, useEffect, useRef } from "react";
import XInCircle from "../xInCircle";
import { PropTypes } from "./types";

const MultiSelectSearch = (props: PropTypes) => {
  const {
    options,
    setSelected: setDebouncedSelected,
    setInputValue: setDebouncedInputValue,
  } = props;

  const [selected, setSelected] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputValue(inputValue.toLowerCase());
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, setDebouncedInputValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSelected(selected);
    }, 500);

    return () => clearTimeout(handler);
  }, [selected, setDebouncedSelected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    if (!selected.includes(option)) {
      setSelected((prev) => [...prev, option]);
    } else {
      setSelected((prev) => prev.filter((s) => s !== option));
    }
  };

  const handleRemove = (option: string) => {
    setSelected(selected.filter((item) => item !== option));
  };

  const onResetSearch = () => {
    setInputValue("");
    setSelected([]);
  };

  return (
    <div className="w-full my-4 relative flex">
      <div className="relative" ref={dropdownRef}>
        <button
          className="h-full inline-flex items-center py-2.5 px-4 text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          Select categories
        </button>
        <div
          className={
            "absolute left-0 top-14 bg-white ring-1 shadow-lg ring-black/5 rounded-md z-10" +
            (isExpanded ? "" : " hidden")
          }
        >
          <div>
            {Object.keys(options).map((key) => (
              <div
                key={key}
                onClick={() => handleSelect(key)}
                className={`p-2 cursor-pointer ${
                  selected.includes(key) ? "bg-gray-300" : "hover:bg-blue-100"
                }`}
              >
                {options[key]}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-r-lg flex-grow min-h-[42px]">
        {selected.map((item) => (
          <div
            key={item}
            className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-md"
          >
            {options[item]}
            <div
              onClick={() => handleRemove(item)}
              className="ml-1 cursor-pointer"
            >
              <XInCircle />
            </div>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow outline-none p-1"
          placeholder="Type to search..."
        />
        <button
          onClick={onResetSearch}
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-red-700 rounded-e-lg border border-red-700 hover:bg-red-800"
        >
          Reset Search
        </button>
      </div>
    </div>
  );
};

export default MultiSelectSearch;
