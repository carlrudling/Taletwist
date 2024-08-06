import React from 'react';
import Nav from '../Nav';
import VotesIcon from '../icons/votesIcon';
import PinkCircle from '../icons/pinkCircle';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
   user: {
    id: string; 
  } | null;
}


const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, user }) => {
  return (
    <section className="w-screen h-screen flex flex-col justify-start bg-custom-purple relative overflow-hidden">
      <Nav onNavigate={onNavigate} />
      <div className='flex flex-row justify-between'>

        <div className='z-20 flex flex-col ml-14'>
          <h1 className='quiz_name z-10 text-white'>
            My Profile
          </h1>
          <p className='text-white mt-10 text-xl font-SourceSansPro'>My Categories</p>
        </div>

        <div className='flex flex-col'>
          <div className='flex flex-row items-center mr-2'>
            <VotesIcon color='fill-quiz-green' width='16px' height='16px'/> {/* Set fixed width and height */}
            <p className='font-SourceSansPro font-medium text-white text-xl ml-2'>12 Votes</p> {/* Added margin-left */}
          </div>
          <p className='text-white mr-2'>Subscription: None 😒</p>
        </div>
      </div>

      <button
        className='absolute bottom-4 right-4 rounded bg-white text-l py-1.5 px-5 text-custom-purple transition-all text-center font-poppins font-medium border hover:border-black hover:bg-black hover:text-white z-10'
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
