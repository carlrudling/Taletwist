import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import VotesIcon from '../icons/votesIcon';
import PinkCircle from '../icons/pinkCircle';
import CategoryCard from '../CategoryCard';

interface Category {
  _id: string;
  name: string;
  votes: {
    count: number;
    userIds: string[];
  };
  description: string;
  tags: string[];          // Include tags property
  questionCount: number;   // Include questionCount property
}

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  user: {
    id: string;
  } | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, user }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/categories/creator/${user.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user?.id]);

  return (
    <section className="w-screen h-screen flex flex-col justify-start bg-custom-purple relative overflow-hidden">
      <Nav onNavigate={onNavigate} />

      <div className='flex flex-row justify-between mt-8 mx-14'>
        <div className='z-20 flex flex-col'>
          <h1 className='quiz_name z-10 text-white'>
            My Profile
          </h1>
          <p className='text-white mt-10 text-xl font-SourceSansPro'>My Categories</p>
        </div>

        <div className='flex flex-col items-end'>
          <div className='flex flex-row items-center'>
            <VotesIcon color='fill-quiz-green' width='16px' height='16px' />
            <p className='font-SourceSansPro font-medium text-white text-xl ml-2'>
              {categories.reduce((acc, category) => acc + category.votes.count, 0)} Votes
            </p>
          </div>
          <p className='text-white mt-2'>Subscription: None 😒</p>
        </div>
      </div>

      {/* Grid Container for Category Cards */}
      <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-14">
        {loading && <p className="text-white col-span-full">Loading categories...</p>}
        {error && <p className="text-red-500 col-span-full">{error}</p>}
        {!loading && categories.length === 0 && !error && (
          <p className="text-white col-span-full">No categories found.</p>
        )}
        {categories.map(category => (
          <div key={category._id} className="mb-4">
            <CategoryCard
              category={category}
              buttonLabel="Edit"
              onButtonClick={() => onNavigate(`edit-category?id=${category._id}`)}
              clickable={true}
            />
          </div>
        ))}
      </div>

      <button
        className='absolute bottom-4 right-4 rounded bg-white text-l py-1.5 px-5 text-custom-purple transition-all text-center font-poppins font-medium border hover:bg-custom-orange hover:border-black hover:text-white z-10'
        onClick={() => onNavigate('edit-subscription')}>
        Edit Subscription
      </button>

      <div className="absolute top-20 left-0 ">
        <PinkCircle />
      </div>
    </section>
  );
}

export default ProfilePage;
