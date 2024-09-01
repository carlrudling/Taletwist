'use client'
import React, { useEffect, useState } from 'react';
import { useQuizContext } from '@/app/provider/QuizProvider';



interface JoinedQuizResponsePageProps {
  quizName?: string;
  onNavigate: (page: string) => void;
  user: {
    id: string;
  } | null;

}

const JoinedQuizResponsePage: React.FC<JoinedQuizResponsePageProps> = ({ user, onNavigate  }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const { selectedQuiz } = useQuizContext();

  return (
    <section className="flex flex-col justify-center items-center w-screen h-screen bg-correct-gradient">
      <div>
        <h1 className="logo_text text-white text-center">
          {`You've successfully joined: ${selectedQuiz?.name ?? 'nul'}`}
        </h1>
      </div>
    </section>
  );
};

export default JoinedQuizResponsePage;
