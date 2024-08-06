'use client';

import React, { useState, useEffect, ChangeEvent, FC } from "react";
import CategoryCard from "./CategoryCard"; // Adjust the import path as needed
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface Category {
  _id: string;
  name: string;
  votes: number;
  description: string;
  tags: string[]; // Add tags to the category interface
}

interface CategoryCardListProps {
  data: Category[];
  onCategorySelect: (id: string) => void;
}

const CategoryCardList: FC<CategoryCardListProps> = ({ data, onCategorySelect }) => {
  return (
    <div className='mt-16 category_layout'>
      {data.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          buttonLabel='Choose Category'
          onButtonClick={() => onCategorySelect(category._id)}
        />
      ))}
    </div>
  );
};

interface SearchCategoryProps {
  routeEnd: string;
  onCategorySelect: (id: string) => void;
}

const SearchCategory: FC<SearchCategoryProps> = ({ routeEnd, onCategorySelect }) => {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<Category[]>([]);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/category/${routeEnd}`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setAllCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [routeEnd]); // Include routeEnd as a dependency to refetch if it changes

  // Function to filter categories based on search text
  const filterCategories = (searchtext: string): Category[] => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allCategories.filter(
      (category) =>
        regex.test(category.name) || 
        regex.test(category.description) || 
        category.tags.some((tag) => regex.test(tag))
    );
  };

  // Function to handle search input changes
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    if (!searchValue) {
      setSearchedResults([]);
    } else {
      const filteredCategories = filterCategories(searchValue);
      setSearchedResults(filteredCategories);
    }
  };

  return (
    <section className="w-full z-10 flex justify-center"> {/* Centering the section */}
      <form className="relative flex items-center w-full max-w-md"> {/* Adding max-width */}
        <div className="relative flex items-center w-full">
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a category"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </form>

      {/* Display filtered or all categories */}
      {searchText ? (
        <CategoryCardList data={searchedResults} onCategorySelect={onCategorySelect} />
      ) : (
        <CategoryCardList data={allCategories} onCategorySelect={onCategorySelect} />
      )}
    </section>
  );
};

export default SearchCategory;
