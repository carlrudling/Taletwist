'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import io, { Socket } from 'socket.io-client';
import StartPage from '../Pages/StartPage';
import JoinPage from '../Pages/JoinPage';
import CreateQuizPage from '../Pages/CreateQuizPage';
import ProfilePage from '../Pages/ProfilePage';
import CreateCategoryPage from '../Pages/CreateCategoryPage';
import SubscriptionPage from '../Pages/SubscriptionPage';
import ChooseGamePage from '../Pages/ChooseGamePage';
import ChooseCategoryPage from '../Pages/ChooseCategoryPage';
import JoinedQuizResponsePage from '../Pages/Player/JoinedQuizResponsePage';
import { IQuiz } from '@/models/quiz';  // Import the IQuiz interface
import { ICategory } from '@/models/category';
import LoadingPage from '../Pages/LoadingPage';
import QuestionAnswerPage from '../Pages/Player/QuestionAnswerPage';
import { useQuizContext } from '@/app/provider/QuizProvider';
import { IGameStatement } from '@/utils/IGameStatement';


// Define the shape of the user data
interface User {
  id: string;
  email: string;
  name: string;
}

const GameLogic: React.FC = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('start');
  const [gameType, setGameType] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quiz, setQuiz] = useState<IQuiz | null>(null);  // Define the state to hold a quiz
  const [category, setCategory] = useState<ICategory | null>(null);
  const [questions, setQuestions] = useState<IGameStatement[]>([]);  // State to hold questions for the game
  const { selectedQuiz } = useQuizContext();  // Get the selected quiz from context
  const [playerName, setPlayerName] = useState();


  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser(session.user as User);
    }
  }, [session, status]);

  useEffect(() => {
      const newSocket = io('http://localhost:3001');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to socket server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      // Listen for the startGuessWhoGame event and store questions
     newSocket.on('startGuessWhoGame', (receivedQuestions: IGameStatement[]) => {
      console.log('Received questions:', receivedQuestions);
      setQuestions(receivedQuestions);  // Store the received questions
      setCurrentPage('QuestionAnswerPage');  // Navigate to the QuestionAnswerPage
    });

      return () => {
        newSocket.disconnect();
      };
  }, [status]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleHashChange = () => {
        const hashParts = window.location.hash.replace('#', '').split(':');
        const newPage = hashParts[0] || 'start';
        const gameTypeParam = hashParts[1] || null;

        setCurrentPage(newPage);
        setGameType(gameTypeParam);
      };

      window.addEventListener('hashchange', handleHashChange);
      handleHashChange();

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, []);


  const handleNavigate = (page: string, gameTypeParam?: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = gameTypeParam ? `${page}:${gameTypeParam}` : page;
    }
  };

  const renderPage = () => {
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  switch (currentPage) {
    case 'start':
      return <StartPage onNavigate={handleNavigate} user={user} socket={socket} />;
    case 'join':
      return <JoinPage onNavigate={handleNavigate} user={user} socket={socket} />;
    case 'create-quiz':
      return <CreateQuizPage onNavigate={handleNavigate} user={user} />;
    case 'create-category':
      return <CreateCategoryPage onNavigate={handleNavigate} user={user} />;
    case 'edit-subscription':
      return <SubscriptionPage onNavigate={handleNavigate} user={user} />;
    case 'chooseGame':
      return <ChooseGamePage onNavigate={handleNavigate} user={user} />;
    case 'joinQuizResponse':
      return <JoinedQuizResponsePage onNavigate={handleNavigate} user={user} quizName={quiz?.name} />;
    case 'choose-category':
      return <ChooseCategoryPage onNavigate={handleNavigate} user={user} gameType={gameType} socket={socket} />;
    case 'profile':
      return <ProfilePage onNavigate={handleNavigate} user={user} />;
    case 'loadingPage':
      return <LoadingPage onNavigate={handleNavigate} user={user} socket={socket} loadingText={gameType === 'GuessWho' ? 'Waiting for all Players to finsih the statements' : 'Loading, please wait...'}
/>;
    case 'QuestionAnswerPage':
      return <QuestionAnswerPage onNavigate={handleNavigate} socket={socket} questions={questions} playerName='Carl'/>;
    default:
      return <StartPage onNavigate={handleNavigate} user={user} socket={socket} />;
  }
};


  return <div>{renderPage()}</div>;
};

export default GameLogic;
