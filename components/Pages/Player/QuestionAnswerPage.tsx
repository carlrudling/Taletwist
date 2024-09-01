'use client';
import React, { useState } from 'react';
import { Socket } from 'socket.io-client';  // Import the Socket type
import { IGameStatement } from '@/utils/IGameStatement';



interface QuestionAnswerPageProps {
  onNavigate: (page: string) => void;
  socket: Socket | null;
  questions: IGameStatement[];  // The questions to display
  playerName: string;  // The player's name
}


const QuestionAnswerPage: React.FC<QuestionAnswerPageProps> = ({ onNavigate, socket, questions, playerName }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedStatement, setCompletedStatement] = useState('');

  const handleNext = () => {
    const updatedQuestion = {
      ...questions[currentQuestionIndex],
      completedStatement,
      playerName,
    };

    // Send completed statement back to the server
    if (socket) {
      socket.emit('submitGuessWhoAnswers', updatedQuestion);
    }

    // Move to the next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCompletedStatement(''); // Reset input for the next question
    } else {
      onNavigate('loadingPage'); // Navigate to the next phase or page
    }
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-between items-center bg-custom-purple relative overflow-hidden">
      <h1 className="mt-20 font-SourceSansPro font-regular text-4xl text-white">
        {`${currentQuestionIndex + 1}/${questions.length}`}
      </h1>

      <p className="self-center z-10 text-center text-white font-poppins font-medium text-4xl">
        {questions[currentQuestionIndex]?.statement}
      </p>

      <textarea
        className="p-2 border mb-10 h-60 w-11/12 mx-10 rounded-md font-SourceSansPro font-regular resize-none focus:outline-none focus:ring-0"
        placeholder="Complete the statement..."
        value={completedStatement}
        onChange={(e) => setCompletedStatement(e.target.value)}
      />

      <div className="z-10 mx-10 mb-10 flex flex-row justify-end w-full">
        <button className="orange_btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </section>
  );
};

export default QuestionAnswerPage;