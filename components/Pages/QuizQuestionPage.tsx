'use client'

import React, { useEffect, useState } from 'react';
import PinkShape from '../icons/pinkShape';
import { IGameStatement } from '@/utils/IGameStatement';
import { useQuizContext } from '@/app/provider/QuizProvider';
import { Socket } from 'socket.io-client';  // Import Socket type

interface QuizQuestionPageProps {
  statements: IGameStatement[];
  socket: Socket | null; // Pass socket as a prop
}

interface QuestionOptions {
  statement: string;
  correctAnswer: string;
  options: {
    leftTop: string;
    leftBottom: string;
    rightTop: string;
    rightBottom: string;
  };
}

const QuizQuestionPage: React.FC<QuizQuestionPageProps> = ({ statements, socket }) => {    
  const { selectedQuiz } = useQuizContext();
  const [playerOptions, setPlayerOptions] = useState<string[]>([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To control when to show the correct answer
  const [timer, setTimer] = useState(15); // 15 seconds timer

  useEffect(() => {
  const countdown = setInterval(() => {
    setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
  }, 1000); // Decrease timer by 1 every second

  // When the timer hits 0, emit the "timeUp" event to the server
  if (timer === 0) {
    clearInterval(countdown); // Stop the interval
    if (socket && socket.connected) {
      socket.emit('timeUp'); // Emit the timeUp event without specifying the room
      setShowCorrectAnswer(true);
      console.log('Time is up, emitting to server');
    }
  }

  return () => clearInterval(countdown); // Cleanup on unmount
}, [timer, socket]);


  useEffect(() => {
    if (selectedQuiz) {
      const allPlayerNames = selectedQuiz.players.map(player => player.name);
      const currentPlayerName = statements[0].playerName || '';

      // Filter out the current player's name from the list
      const otherPlayerNames = allPlayerNames.filter(name => name !== currentPlayerName);

      // Shuffle the array to get random names
      const shuffledNames = otherPlayerNames.sort(() => 0.5 - Math.random());

      // Select 3 unique random names from the shuffled list
      const randomNames = shuffledNames.slice(0, 3);

      // Combine the statement's playerName with the random names
      const options = [currentPlayerName, ...randomNames];

      // Shuffle the options to randomize their positions
      const shuffledOptions = options.sort(() => 0.5 - Math.random());

      // Map the shuffled options to specific positions
      const positionMapping = {
        leftTop: shuffledOptions[0],
        leftBottom: shuffledOptions[1],
        rightTop: shuffledOptions[2],
        rightBottom: shuffledOptions[3],
      };

      setPlayerOptions(shuffledOptions);

      // Format the statement
      const formattedStatement = formatStatement(statements[0].statement, statements[0].completedStatement || '');

      // Create the new question object to be emitted
      const newQuestion: QuestionOptions = {
        statement: formattedStatement,
        correctAnswer: currentPlayerName, // Correct player's name
        options: positionMapping,         // Randomized options
      };

      // Emit the new question object via socket
      if (socket && socket.connected) {
        socket.emit('newQuestion', newQuestion);
        console.log('Emitting newQuestion:', newQuestion);
      }
    }
  }, [selectedQuiz, statements, socket]);

  // Function to process the statement and remove trailing dots
  const formatStatement = (statement: string, completedStatement: string) => {
    const trimmedStatement = statement.replace(/\.\.\.$/, '');
    return `${trimmedStatement} ${completedStatement}`;
  };

  const currentStatement = statements[0];

 const getButtonOpacity = (playerName: string) => {
    if (!showCorrectAnswer) return 1; // Full opacity if the timer hasn't run out
    return playerName === statements[0].playerName ? 1 : 0.1; // Correct answer stays full opacity, others fade
  };
  return (
     <section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center'>
        <h1 className={'quiz_name text-white '}>
          {selectedQuiz?.name ?? 'Room'}
        </h1>
        <h1 className='font-SourceSansPro font-regular text-3xl text-white'>{timer} seconds left</h1>
      </div>

      <p className="self-center z-10 text-center z-10 text-white font-poppins font-medium text-4xl">
        {currentStatement 
          ? `"${formatStatement(currentStatement.statement, currentStatement.completedStatement || '')}"`
          : 'No statement available'}
      </p>

      <div className='grid grid-rows-2 grid-flow-col'>
        {playerOptions.map((playerName, index) => (
          <div
            key={index}
            className={`bg-quiz-${index % 4 === 0 ? 'green' : index % 4 === 1 ? 'yellow' : index % 4 === 2 ? 'red' : 'blue'} w-full h-quizColorheight flex items-center justify-center text-black font-poppins font-medium text-3xl`}
            style={{ opacity: getButtonOpacity(playerName) }} // Set opacity based on correctness
          >
            {playerName || 'Unknown'}
          </div>
        ))}
      </div>

      <div className='absolute top-0 right-0'>
        <PinkShape />
      </div>
    </section>
  );
}

export default QuizQuestionPage;
