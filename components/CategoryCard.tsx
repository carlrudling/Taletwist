'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import VotesIcon from './icons/votesIcon';

interface Category {
  _id: string;
  name: string;
  votes: number;
  description: string;
}

interface CategoryCardProps {
  category: Category;
  onButtonClick?: () => void;
  buttonLabel?: string;
  clickable?: boolean;
}

const CategoryCard: FC<CategoryCardProps> = ({ category, onButtonClick, buttonLabel = 'Select', clickable = true }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const defaultButtonClick = () => {
    router.push(`/edit-category?id=${category._id}`);
  };

  const handleClick = onButtonClick || defaultButtonClick;

  return (
    <div className='category_card grid grid-rows-3'>
      <div className="flex justify-between items-center mb-2">
        <h3 className='text-xl font-poppins font-bold text-black'>
          {category.name}
        </h3>
        <div className="flex flex-row items-center justify-end">
          <VotesIcon color='fill-quiz-green' width='6%' height='6%' />
          <p className='text-black ml-1 text-sm text-sourceSansPro'>
            {category.votes} votes
          </p>
        </div>
      </div>
      <div>
      <p className='text-black text-sourceSansPro text-sm overflow-hidden text-ellipsis'>
        {category.description}
      </p>
      <p className='text-black text-sourceSansPro text-sm mt-2'>
        #teambuilding #relationship #work
      </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className='text-black text-sm text-sourceSansPro'>
          28 Questions
        </p>
        {clickable && (
          <button
            className='bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded self-end'
            onClick={handleClick}>
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
