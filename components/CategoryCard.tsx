'use client';

import { useSession } from 'next-auth/react';
import { FC } from 'react';
import VotesIcon from './icons/votesIcon';

interface Category {
  _id: string;
  name: string;
  votes: {
    count: number;  // Use the primitive `number` type here
    userIds: string[];
  };
  description: string;
  tags: string[];
  questionCount: number;  // Use the primitive `number` type here
}

interface CategoryCardProps {
  category: Category;
  onButtonClick?: () => void;
  buttonLabel?: string;
  clickable?: boolean;
  selected?: boolean; // Add selected prop
}

const CategoryCard: FC<CategoryCardProps> = ({
  category,
  onButtonClick,
  buttonLabel = 'Select',
  clickable = true,
  selected = false, // Default selected to false
}) => {

  const { data: session } = useSession();

  const defaultButtonClick = () => {};
  const handleClick = onButtonClick || defaultButtonClick;

  return (
    <div
      className={`category_card grid grid-rows-3 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 ${
        selected ? 'border-4 border-custom-orange' : 'border-2 border-white'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-poppins font-bold text-black">
          {category.name}
        </h3>
        <div className="flex flex-row items-center justify-end">
          <VotesIcon color="fill-quiz-green" width="16px" height="16px" />
          <p className="text-black ml-1 text-sm text-sourceSansPro">
            {category.votes.count} votes
          </p>
        </div>
      </div>
      <div>
        <p className="text-black text-sourceSansPro text-sm overflow-hidden text-ellipsis">
          {category.description}
        </p>
        <p className="text-black text-sourceSansPro text-sm mt-2">
          {category.tags.map((tag) => `#${tag}`).join(' ')}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-black text-sm text-sourceSansPro">
          {category.questionCount} Questions
        </p>
        {clickable && (
          <button
            className="bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded self-end"
            onClick={handleClick}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
