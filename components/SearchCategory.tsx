'use client';

import React, { useState, useEffect, ChangeEvent, FC } from "react";
import CategoryCard from "./CategoryCard"; // Adjust the import path as needed
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

// Define the Category interface
interface Category {
  _id: string;
  name: string;
  votes: {
    count: number;
    userIds: string[];
  };
  description: string;
  tags: string[];
  questionCount: number;
}

interface CategoryCardListProps {
  data: Category[];
  onCategorySelect: (id: string) => void;
  pressedCategory: string | null;
  handlePress: (id: string) => void;
}

const CategoryCardList: FC<CategoryCardListProps> = ({ data, onCategorySelect, pressedCategory, handlePress }) => {
  return (
    <div className='z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 mx-14'>
      {data.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          buttonLabel="Select"
          onButtonClick={() => handlePress(category._id)}
          clickable={true}
          selected={pressedCategory === category._id} // Pass selected prop
        />
      ))}
    </div>
  );
};

interface SearchCategoryProps {
  categories: Category[];
  onCategorySelect: (id: string) => void;
}

const SearchCategory: FC<SearchCategoryProps> = ({ categories, onCategorySelect }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<Category[]>(categories);
  const [pressedCategory, setPressedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSearchedResults(categories.sort((a, b) => b.votes.count - a.votes.count)); // Sort categories by votes by default
  }, [categories]);

  // Function to filter categories based on search text
  const filterCategories = (searchText: string): Category[] => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return categories.filter(
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
      setSearchedResults(categories.sort((a, b) => b.votes.count - a.votes.count)); // Sort categories by votes if no search text
    } else {
      const filteredCategories = filterCategories(searchValue);
      setSearchedResults(filteredCategories);
    }
  };

  // Function to handle category selection
  const handlePress = (categoryId: string) => {
    setPressedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <section className="w-full z-10 flex flex-col items-center">
      <form className="relative flex items-center w-full max-w-md mb-4">
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

      <CategoryCardList
        data={searchedResults}
        onCategorySelect={onCategorySelect}
        pressedCategory={pressedCategory}
        handlePress={handlePress}
      />
    </section>
  );
};

export default SearchCategory;