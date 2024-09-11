'use client';
import React, { useEffect } from 'react';
import PinkShape from '../icons/pinkShape';
import { Socket } from 'socket.io-client';  // Import Socket type
import { useQuizContext } from '@/app/provider/QuizProvider';

interface QuizStatsPageProps {
  statsData: { answer: string; votes: number; position: string }[];  // Modified to accept stats with position
  onNavigate: (page: string) => void; // Pass onNavigate for page navigation
}

const QuizStatsPage: React.FC<QuizStatsPageProps> = ({ statsData, onNavigate }) => {
  const { selectedQuiz } = useQuizContext();

  // Define the order of positions
  const positionOrder = ['leftTop', 'rightTop', 'leftBottom', 'rightBottom'];

  // Define color mapping based on the position
  const colorMapping: { [key: string]: string } = {
    leftTop: 'bg-quiz-green',
    rightTop: 'bg-quiz-red',
    leftBottom: 'bg-quiz-yellow',
    rightBottom: 'bg-quiz-blue',
  };

  // Filter and sort the votes based on the positionOrder
  const sortedVotes = positionOrder.map((position) => {
    const vote = statsData.find((item) => item.position === position);
    return {
      name: vote ? vote.answer : 'Unknown',  // If no answer for this position, default to 'Unknown'
      votes: vote ? vote.votes : 0,          // If no votes for this position, default to 0
      color: colorMapping[position],         // Set color based on the position
    };
  });

  const maxVotes = Math.max(...sortedVotes.map(v => v.votes), 1); // Avoid divide by zero

  // Set up the timer to navigate after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate('quizRankingPage');
    }, 5000); // 5 seconds delay

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center'>
        <h1 className={'quiz_name text-white'}>
          Class Quiz
        </h1>
        <h1 className='font-SourceSansPro font-regular text-3xl text-white'>7</h1>
      </div>
      
      <p className="self-center z-10 text-center z-10 text-white font-poppins font-medium text-4xl mt-20">
        “Growing up my favorite movie was Zorro”
      </p>

      <div className='flex justify-center items-end w-full px-14 lg:space-x-32 space-x-8'>
        {sortedVotes.map((vote, index) => (
          <div key={index} className='flex flex-col items-center'>
            <div
              className={`${vote.color} w-12`}
              style={{ height: `${(vote.votes / maxVotes) * 200}px` }}
            ></div>
            <span className='mt-2 text-white font-SourceSansPro text-xl'>{vote.name}</span>
            <span className='text-white font-SourceSansPro'>{vote.votes} votes</span>
          </div>
        ))}
      </div>

      <div className='absolute top-0 right-0'>
        <PinkShape />
      </div>
    </section>
  );
};

export default QuizStatsPage;
