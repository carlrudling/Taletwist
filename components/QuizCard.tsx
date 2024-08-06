'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Player {
  _id: string;
  name: string;
  score: number;
  // Add other player fields as needed
}

interface Quiz {
  _id: string;
  name: string;
  votes: number;
  description: string;
  players: Player[];
  createdDate: string; // Assuming the date comes as a string from the server
}

interface QuizCategoryProps {
  onNavigate: (page: string) => void; // Ensure onNavigate is part of props
  quiz: Quiz;
  onButtonClick?: () => void;
  buttonLabel?: string;
}

const QuizCard: FC<QuizCategoryProps> = ({ onNavigate, quiz, onButtonClick, buttonLabel = 'Select' }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [remainingTime, setRemainingTime] = useState<string>(''); // State to hold remaining time

  // Use onNavigate function to change the page
  const handleButtonClick = () => {
    onNavigate('join'); // Navigate to the join page
  };

  // Function to calculate remaining time until quiz expires
  const calculateRemainingTime = () => {
    const quizDuration = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
    const quizEndTime = new Date(quiz.createdDate).getTime() + quizDuration;
    const currentTime = new Date().getTime();
    const timeDifference = quizEndTime - currentTime;

    if (timeDifference <= 0) {
      return 'Expired';
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Update remaining time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='quiz_card grid grid-row-3 mt-20 z-10'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-xl font-poppins font-bold text-black'>{quiz.name}</h3>
        <div className='flex flex-row items-center'>
          <p className='text-black text-sm text-sourceSansPro'>
            {quiz.players.length} {quiz.players.length === 1 ? 'player' : 'players'} joined
          </p>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center align-center'>
        <p className='text-black text-sm text-sourceSansPro '>
          Ends in: {remainingTime}
        </p>
        <button className='bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded' onClick={handleButtonClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
