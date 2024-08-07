'use client';

import React, { useState, useEffect } from 'react';
import BlueShape from '../icons/blueShape';
import CategoryCard from '../CategoryCard'; // Import your CategoryCard component
import SearchCategory from '../SearchCategory';

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

// Define the props for the ChooseCategoryPage component
interface ChooseCategoryPageProps {
  onNavigate: (page: string, gameTypeParam?: string) => void; // Updated the onNavigate function signature
  user: {
    id: string;
  } | null;
  gameType: string | null; // Accept gameType as a prop
}

// Update the component definition to accept the props
const ChooseCategoryPage: React.FC<ChooseCategoryPageProps> = ({ onNavigate, user, gameType }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pressedCategory, setPressedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories by gameType when component mounts or gameType changes
  useEffect(() => {
    const fetchCategories = async () => {
      if (!gameType) return; // Ensure gameType is available

      try {
        setLoading(true);
        const response = await fetch(`/api/categories/game/${encodeURIComponent(gameType)}`); // Correct API endpoint with encoding

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        console.log('Fetched categories:', data.data); // Log fetched data
        setCategories(data.data); // Set fetched categories to state
      } catch (err) {
        console.error('Error fetching categories:', err); // Log error
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [gameType]);

  // Handle category selection
  const handlePress = (categoryId: string) => {
    setPressedCategory(categoryId);
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-auto">
      <h1 className="quiz_name ml-14 mt-14 flex flex-row text-center self-start text-white z-10">
        Class Quiz
      </h1>

      <p className="quiz_name mt-20 mb-10 self-center text-center text-white z-10">
        Choose Category
      </p>

      <SearchCategory 
        routeEnd={gameType || 'list'} // Pass gameType or default to 'list'
        onCategorySelect={handlePress}
      />

      {loading && <p className="text-white">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && categories.length === 0 && !error && (
        <p className="text-white">No categories found.</p>
      )}
      
      <div className="z-10 grid grid-cols-3 gap-4 p-4">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            buttonLabel="Select"
            onButtonClick={() => handlePress(category._id)}
            clickable={true}
          />
        ))}
      </div>

      <div className="mx-10 mb-10 flex flex-row justify-end self-stretch items-end">
        <div className="absolute top-0 left-0">
          <BlueShape />
        </div>
        <button
          className={`${pressedCategory ? 'orange_btn' : 'white_btn'} absolute bottom-10 right-10`}
          disabled={!pressedCategory}
          onClick={() => onNavigate(`play-game?categoryId=${pressedCategory}`)} // Navigate to the next page
        >
          Start
        </button>
      </div>
    </section>
  );
};

export default ChooseCategoryPage;
