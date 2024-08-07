'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import StartPage from '../Pages/StartPage';
import JoinPage from '../Pages/JoinPage';
import CreateQuizPage from '../Pages/CreateQuizPage';
import ProfilePage from '../Pages/ProfilePage';
import CreateCategoryPage from '../Pages/CreateCategoryPage';
import SubscriptionPage from '../Pages/SubscriptionPage';
import ChooseGamePage from '../Pages/ChooseGamePage';
import ChooseCategoryPage from '../Pages/ChooseCategoryPage'; // Import ChooseCategoryPage

// Define the shape of the user data
interface User {
  id: string;
  email: string;
  name: string;
}

const GameLogic = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize state with the current hash or default to 'start'
    return window.location.hash.replace('#', '') || 'start';
  });
  const [gameType, setGameType] = useState<string | null>(null); // State to hold gameType

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Set user data from session
      setUser(session.user as User);
    }
  }, [session, status]);

  // Fetch other shared data like categories
  const fetchInitialData = useCallback(async () => {
    // Fetch data as necessary and update state
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchInitialData();
    }
  }, [status, fetchInitialData]);

  // Preserve page state on refresh and handle navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hashParts = window.location.hash.replace('#', '').split(':');
      const newPage = hashParts[0] || 'start';
      const gameTypeParam = hashParts[1] || null;

      setCurrentPage(newPage);
      setGameType(gameTypeParam);
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Ensure the current page reflects the current hash
    handleHashChange();

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Function to navigate between pages
  const handleNavigate = (page: string, gameTypeParam?: string) => {
    // Update hash which will trigger the hashchange event
    window.location.hash = gameTypeParam ? `${page}:${gameTypeParam}` : page;
  };

  const renderPage = () => {
    // Handle loading and unauthenticated states
    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    // Pass user and any other shared data as props
    switch (currentPage) {
      case 'start':
        return <StartPage onNavigate={handleNavigate} user={user} />;
      case 'join':
        return <JoinPage onNavigate={handleNavigate} user={user} />;
      case 'create-quiz':
        return <CreateQuizPage onNavigate={handleNavigate} user={user} />;
      case 'create-category':
        return <CreateCategoryPage onNavigate={handleNavigate} user={user} />;
      case 'edit-subscription':
        return <SubscriptionPage onNavigate={handleNavigate} user={user} />;
      case 'chooseGame':
        return <ChooseGamePage onNavigate={handleNavigate} user={user} />;
      case 'choose-category':
        return <ChooseCategoryPage onNavigate={handleNavigate} user={user} gameType={gameType} />; // Pass gameType as a prop
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} user={user} />;
      default:
        return <StartPage onNavigate={handleNavigate} user={user} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default GameLogic;
