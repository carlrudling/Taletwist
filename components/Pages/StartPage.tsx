// StartPage.tsx

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Nav from '../Nav';
import SearchQuiz from '../SearchQuiz';
import WaveIcon from '../icons/waveIcon';
import Star from '../icons/star';
import QuizCard from '../QuizCard';
import Thoughtsform from '../Thoughtsform';
import { useQuizContext } from '@/app/provider/QuizProvider';

interface StartPageProps {
  onNavigate: (page: string) => void;
  user: {
    id: string;
  } | null;
}

const StartPage: React.FC<StartPageProps> = ({ onNavigate, user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: session, status } = useSession();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thoughtsField, setThoughtsField] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Access the context
  const { setSelectedQuiz } = useQuizContext();

  const handleThoughtsFieldToggle = () => {
    setThoughtsField(!thoughtsField);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setThoughtsField(false);
    }
  };

  useEffect(() => {
    if (thoughtsField) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [thoughtsField]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/quizzes/creator/${user.id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch quizzes: ${response.statusText}`);
        }

        const data = await response.json();
        setQuizzes(data.data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchQuizzes();
    }
  }, [status, user?.id]);

  return (
    <section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-hidden">
      <Nav onNavigate={onNavigate} />
      <h1
        className={`head_text text-center text-custom-orange z-20 ${
          isVisible ? 'fall-animation' : ''
        }`}
      >
        Discover & Share
        <br />
        <span className="blue_gradient text-center text-white z-10">
          Stories with your Friends
        </span>
      </h1>
      <p className="desc text-center z-10">
        Taletwist is a new way to share stories among friends through fun games
        like <span className="font-bold">Guess Who</span> and{' '}
        <span className="font-bold">🔥Hot Seat🔥</span>
      </p>
      <SearchQuiz />

      {/* Display loading, error, or quizzes */}
      <div className="z-20 mt-8 w-full flex flex-col lg:flex-row items-center justify-center">
        {loading && <p className="text-white">Loading quizzes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && quizzes.length === 0 && !error && (
          <p className="text-white">No quizzes found.</p>
        )}
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz._id}
            quiz={quiz}
            buttonLabel="Select"
            onNavigate={() => {
              setSelectedQuiz(quiz); // Set the selected quiz in context
              onNavigate('join'); // Navigate to the join page
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className={`text-6xl absolute z-10 ${
            isVisible ? 'fall-animation' : ''
          }`}
          style={{ top: '10%', left: '10%' }}
        >
          🤭
        </div>
        <div
          className={`text-6xl absolute ${isVisible ? 'fall-animation' : ''}`}
          style={{ top: '30%', left: '5%' }}
        >
          😍
        </div>
        <div
          className={`text-6xl absolute z-10 ${
            isVisible ? 'fall-animation' : ''
          }`}
          style={{ top: '70%', left: '15%' }}
        >
          🤯
        </div>
        <div
          className={`text-6xl absolute z-10 ${
            isVisible ? 'fall-animation' : ''
          }`}
          style={{ top: '8%', right: '2%' }}
        >
          🥳
        </div>
        <div
          className={`text-6xl absolute z-10 ${
            isVisible ? 'fall-animation' : ''
          }`}
          style={{ top: '15%', right: '11%' }}
        >
          🤣
        </div>
        <div
          className={`text-6xl absolute z-10 ${
            isVisible ? 'fall-animation' : ''
          }`}
          style={{ top: '45%', right: '12%' }}
        >
          🤩
        </div>
        <div
          className={`absolute h-28 w-28 ${
            isVisible ? 'fall-spin-animation' : ''
          }`}
          style={{ top: '60%', left: '11%' }}
        >
          <Star color="text-custom-lightOrange" />
        </div>
        <div
          className={`absolute rotate-45 h-10 w-10 rotate-90 ${
            isVisible ? 'fall-spin-animation' : ''
          }`}
          style={{ top: '16%', left: '12%' }}
        >
          <Star color="text-custom-pink" />
        </div>
        <div
          className={`absolute h-16 w-16 ${
            isVisible ? 'fall-spin-animation' : ''
          }`}
          style={{ top: '50%', right: '15%' }}
        >
          <Star color="text-custom-blue" />
        </div>
        <div
          className={`absolute rotate-45 h-8 w-8 ${
            isVisible ? 'fall-spin-animation' : ''
          }`}
          style={{ top: '20%', right: '5%' }}
        >
          <Star color="text-custom-light-green" />
        </div>
        <WaveIcon />
      </div>

      {thoughtsField ? (
        <div
          ref={formRef}
          className="absolute bottom-10 right-10 mr-16 w-full max-w-xs z-20"
        >
          <Thoughtsform />
        </div>
      ) : (
        <button
          className="absolute bottom-4 right-4 bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded"
          onClick={handleThoughtsFieldToggle}
        >
          Thoughts?
        </button>
      )}
    </section>
  );
};

export default StartPage;
