'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import StartPage from '../Pages/StartPage';
import JoinPage from '../Pages/JoinPage';
import CreateQuizPage from '../Pages/CreateQuizPage';
import ProfilePage from '../Pages/ProfilePage';
import CreateCategoryPage from '../Pages/CreateCategoryPage';
import SubscriptionPage from '../Pages/SubscriptionPage';
import ChooseGamePage from '../Pages/ChooseGamePage';

// Define the shape of the user data, if needed
interface User {
  id: string;
  email: string;
  name: string;
}

const GameLogic = () => {
  const [currentPage, setCurrentPage] = useState('start');
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Fetch or set user data here
      setUser(session.user as User); // Assuming session.user contains the necessary user info
    }
  }, [session, status]);

  // This function can fetch other shared data like categories
  const fetchInitialData = async () => {
    // Fetch data as necessary and update state
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchInitialData();
    }
  }, [status]);

  const renderPage = () => {
    // Handle loading and unauthenticated states
    if (status === 'loading') {
      return <div>Loading...</div>;
    }



    // Pass user and any other shared data as props
    switch (currentPage) {
      case 'start':
        return <StartPage onNavigate={setCurrentPage} user={user} />;
      case 'join':
        return <JoinPage onNavigate={setCurrentPage} user={user} />;
      case 'create-quiz':
        return <CreateQuizPage onNavigate={setCurrentPage} user={user} />;
      case 'create-category':
        return <CreateCategoryPage onNavigate={setCurrentPage} user={user} />;
      case 'edit-subscription':
        return <SubscriptionPage onNavigate={setCurrentPage} user={user} />;
        case 'chooseGame':
     return <ChooseGamePage onNavigate={setCurrentPage} user={user} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} user={user} />;
      default:
        return <StartPage onNavigate={setCurrentPage} user={user} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default GameLogic;
