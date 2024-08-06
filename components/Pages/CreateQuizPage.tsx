// CreateQuizPage.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import PinkCircle from '../icons/pinkCircle';
import Nav from '../Nav';

interface CreatePageProps {
  onNavigate: (page: string) => void;
  user: {
    id: string; // Adjust the type according to your user object structure
  } | null; // Allow for null in case the user isn't logged in
}

const CreateQuizPage: React.FC<CreatePageProps> = ({ onNavigate, user }) => {
  const [quizName, setQuizName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to generate a random 8-digit join code
  const generateJoinCode = (): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const handleQuizNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizName(event.target.value);
    // Clear the error message when the user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleCreateQuiz = async (event: FormEvent) => {
    event.preventDefault();

    // Check if the quiz name is provided
    if (!quizName.trim()) {
      setError('Please enter a quiz name.');
      return;
    }

    // Check if the user is provided
    // Check if the user is provided
if (!user) {
  setError('You must be logged in to create a quiz.');
  return;
}

setIsLoading(true);
setError(null);

try {
  // Prepare the quiz data
  const quizData = {
    name: quizName.trim(),
    creatorId: user.id, // Use the user ID from the prop
    joinCode: generateJoinCode(),
  };

  // Make the API request to create a quiz
  const response = await fetch('/api/quizzes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizData), // Ensure these fields are present
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Quiz Created:', data);
    // Optionally reset form or navigate to another page
    setQuizName('');
    onNavigate('someOtherPage'); // Redirect to another page if needed
  } else {
    setError(data.message || 'Failed to create quiz');
  }
} catch (error) {
  console.error('Error creating quiz:', error);
  setError('An error occurred while creating the quiz.');
} finally {
  setIsLoading(false);
}
  };

  return (
    <section className="flex flex-col justify-between w-screen h-screen bg-custom-purple relative overflow-hidden">
      <Nav onNavigate={onNavigate} />

      <div className="flex flex-row self-start ml-4 mr-14 mb-60 lg:ml-20">
        <form className="create_quiz_form flex flex-col z-10 mb-2 p-20" onSubmit={handleCreateQuiz}>
          <h2 className="head_text mb-6">Create Quiz</h2>

          <p className="font-sourceSansPro mb-4 text-2xl font-regular text-black">
            A quiz lasts for 5 hours 🕑
          </p>

          <p className="font-sourceSansPro mb-4 text-l font-regular text-black">
            When creating a quiz you can enjoy a number of fun games to play with friends and get to know each other better.
          </p>

          <p className="font-sourceSansPro text-l font-regular mb-3 text-black">Choose a catchy quiz name!</p>

          <input
            type="text"
            placeholder="Quiz Name"
            value={quizName}
            onChange={handleQuizNameChange}
            required
            className="search_input"
          />

          {/* Display an error message if there's an issue */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="z-10 mx-10 mt-10  flex flex-row align-end self-end place-self-end justify-self-end">
            <button
              type="submit"
              className={`${quizName ? 'orange_btn' : 'purple_btn'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      <div className="absolute top-20 left-0">
        <PinkCircle />
      </div>
    </section>
  );
};

export default CreateQuizPage;
