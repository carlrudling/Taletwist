// context/QuizContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the quiz data
interface Player {
  _id: string;
  name: string;
  score: number;
}

interface Quiz {
  _id: string;
  name: string;
  votes: number;
  description: string;
  players: Player[];
  createdDate: string;
  joinCode: string;  // Add joinCode to the Quiz interface
  
}

// Define the context value interface
interface QuizContextType {
  selectedQuiz: Quiz | null;
  setSelectedQuiz: (quiz: Quiz | null) => void;
}

// Create the context with default values
const QuizContext = createContext<QuizContextType>({
  selectedQuiz: null,
  setSelectedQuiz: () => {},
});

// Create a provider component
export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  return (
    <QuizContext.Provider value={{ selectedQuiz, setSelectedQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

// Create a custom hook to use the Quiz context
export const useQuizContext = () => {
  return useContext(QuizContext);
};
