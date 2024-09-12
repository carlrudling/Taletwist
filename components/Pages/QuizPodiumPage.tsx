'use client'
import React, { useEffect, useState } from 'react';
import PinkShape from '../icons/pinkShape';
import { useQuizContext } from '@/app/provider/QuizProvider';
import Confetti from 'react-confetti';
import Podium from '../icons/podium';

interface PlayerRanking {
  name: string;
  score: number;
  icon: string; // 🔥 for correct, 🥶 for incorrect
}

interface QuizPodiumPageProps {
  rankings: PlayerRanking[];  // Rankings passed as a prop
  onNavigate: (page: string) => void;
}

const QuizPodiumPage: React.FC<QuizPodiumPageProps> = ({ rankings, onNavigate }) => {
  const { selectedQuiz } = useQuizContext();
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });

      handleResize(); // Set initial dimensions
      window.addEventListener('resize', handleResize); // Update on resize

      return () => window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
    }
  }, []);

  const handleButtonClick = () => {
    onNavigate('quizVotePage');
  };

  // Safely access the rankings array (ensure it exists and has enough players)
  const firstPlace = rankings?.[0];
  const secondPlace = rankings?.[1];
  const thirdPlace = rankings?.[2];

  return (
    <section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className="flex flex-row mx-14 mt-14 z-10 justify-between text-center">
        <h1 className="quiz_name text-white">{selectedQuiz?.name ?? 'Room'}</h1>
        <h1 className="font-SourceSansPro font-regular text-3xl text-white"></h1>
      </div>

      <div className="relative flex flex-col space-y-4 justify-center items-center">
        {/* Second Place (Left) */}
        {secondPlace && (
          <div className="absolute left-0 ml-96 font-SourceSansPro flex flex-col text-white text-center z-10 animation-slide-up animation-delay-4 -mt-16">
            <span className="text-6xl">🥳</span>
            <span className="text-bold text-3xl">{secondPlace.name}</span>
            <span className="text-2xl">{secondPlace.score} points</span>
          </div>
        )}

        {/* First Place (Middle) */}
        {firstPlace && (
          <div className="relative z-20 font-SourceSansPro flex flex-col text-white text-center animation-slide-up animation-delay-3">
            <span className="text-6xl">🤩</span>
            <span className="text-bold text-3xl">{firstPlace.name}</span>
            <span className="text-2xl">{firstPlace.score} points</span>
          </div>
        )}

        {/* Third Place (Right) */}
        {thirdPlace && (
          <div className="absolute right-0 mr-96 font-SourceSansPro flex flex-col text-white text-center z-10 animation-slide-up animation-delay-2 -mt-10">
            <span className="text-6xl">🥳</span>
            <span className="text-bold text-3xl">{thirdPlace.name}</span>
            <span className="text-2xl">{thirdPlace.score} points</span>
          </div>
        )}

        {/* Podium */}
        <div className="relative z-30 animation-slide-up animation-delay-1">
          <Podium />
        </div>
      </div>

      <div className="absolute bottom-10 right-10">
        <button className="orange_btn" onClick={handleButtonClick}>Next</button>
      </div>

      <div className="absolute top-0 right-0">
        <PinkShape />
      </div>

      <div className="absolute inset-0 w-full h-full">
        <Confetti width={dimensions.width} height={dimensions.height} />
      </div>
    </section>
  );
};

export default QuizPodiumPage;
