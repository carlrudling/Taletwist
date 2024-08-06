'use client';

import React, { useState } from 'react';
import BlueShape from '../icons/blueShape';
import CategoryCard from '../CategoryCard'; // Import your CategoryCard component
import SearchCategory from '../SearchCategory';

interface Category {
  _id: string;
  name: string;
  votes: number;
  description: string;
}

const ChooseCategoryPage = () => {
  const [pressedCategory, setPressedCategory] = useState<string | null>(null);

  const handlePress = (categoryId: string) => {
    setPressedCategory(categoryId);
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-auto lg:overflow-hidden">
      <h1 className="quiz_name ml-14 mt-14 flex flex-row text-center self-start text-white z-10">
        Class Quiz
      </h1>

      <p className="quiz_name  mt-20 mb-10 self-center text-center text-white z-10">
        Choose Category
      </p>

      {/* Call the SearchCategory component with required props */}
      <SearchCategory 
        routeEnd="list" // Provide appropriate endpoint or route end
        onCategorySelect={handlePress}
      />

      <div className="mx-10 mb-10 flex flex-row justify-end self-stretch items-end">
        <div className="absolute top-0 left-0">
          <BlueShape />
        </div>
        <button
          className={`${pressedCategory ? 'orange_btn' : 'white_btn'} absolute bottom-10 right-10 `}
          disabled={!pressedCategory}
        >
          Start
        </button>
      </div>
    </section>
  );
};

export default ChooseCategoryPage;
