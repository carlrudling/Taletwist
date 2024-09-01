'use client';

import React, { useState, useEffect } from 'react';
import BlueShape from '../icons/blueShape';
import SearchCategory from '../SearchCategory';
import { Socket } from 'socket.io-client';
import { useQuizContext } from '@/app/provider/QuizProvider';
import { IGameStatement } from '@/utils/IGameStatement';

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
  gameType: {
    id: string;  // Add gameType id here
  };
}

// Define the props for the ChooseCategoryPage component
interface ChooseCategoryPageProps {
  onNavigate: (page: string, gameTypeParam?: string) => void;
  user: {
    id: string;
  } | null;
  gameType: string | null;
  socket: Socket | null;
}

const ChooseCategoryPage: React.FC<ChooseCategoryPageProps> = ({ onNavigate, user, gameType, socket }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pressedCategory, setPressedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedQuiz } = useQuizContext();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!gameType) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/categories/game/${encodeURIComponent(gameType)}`);

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
  }, [gameType]);

  const handlePress = (categoryId: string) => {
    setPressedCategory(categoryId);
  };

 const handleStartGame = async () => {
  if (gameType && socket && pressedCategory && selectedQuiz) {
    try {
      // Find the selected category
      const selectedCategory = categories.find(category => category._id === pressedCategory);
      if (!selectedCategory) {
        throw new Error('Category not found');
      }

      // Fetch the questions for the selected category
      const response = await fetch(`/api/games/guesswho/${selectedCategory.gameType.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const fetchedData = await response.json();
      const fetchedStatements = fetchedData.data.statements;

      if (!Array.isArray(fetchedStatements)) {
        throw new Error('Fetched data is not an array of statements');
      }

      const questions: IGameStatement[] = fetchedStatements.map((statement) => ({
        statement: statement.statement,
      }));

      // Emit the start game event with the roomId and questions
      if (gameType === 'GuessWho') {
        socket.emit('startGuessWhoGame', { roomId: selectedQuiz.joinCode, questions });
        console.log(`Starting Guess Who game in room ${selectedQuiz.joinCode}`);
      } else if (gameType === 'HotSeat') {
        socket.emit('startHotSeatGame', { roomId: selectedQuiz.joinCode, questions });
        console.log('Starting Hot Seat game');
      }

      onNavigate('loadingPage');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error starting the game:', error);
    }
  }
};





  return (
    <section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-auto">
      <h1 className="quiz_name ml-14 mt-14 flex flex-row text-center self-start text-white z-10">
        {selectedQuiz?.name ?? 'nul'}
      </h1>

      <p className="quiz_name mt-20 mb-10 self-center text-center text-white z-10">
        Choose Category
      </p>

      <SearchCategory 
        categories={categories}
        onCategorySelect={handlePress}
      />

      {loading && <p className="text-white">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && categories.length === 0 && !error && (
        <p className="text-white">No categories found.</p>
      )}

      <div className="mx-10 mb-10 flex flex-row justify-end self-stretch items-end">
        <div className="absolute top-0 left-0">
          <BlueShape />
        </div>
        <button
          className={`${pressedCategory ? 'orange_btn' : 'white_btn'} absolute bottom-10 right-10 z-10`}
          disabled={!pressedCategory}
          onClick={handleStartGame}  // Directly call the handleStartGame function
        >
          Start
        </button>
      </div>
    </section>
  );
};

export default ChooseCategoryPage;
