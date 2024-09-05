import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface QuestionGuessPageProps {
  socket: Socket | null;
  onNavigate: (page: string) => void;
  handleAnswerQuestion: (correct: boolean, points: number) => void; // Expect only 2 arguments
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

const QuestionGuessPage: React.FC<QuestionGuessPageProps> = ({ socket, onNavigate, handleAnswerQuestion }) => {
  const [question, setQuestion] = useState<QuestionOptions | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(1000); // Initial timer value (1000 points)
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0); // Track current score
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);



  useEffect(() => {
    if (socket && socket.connected) {
      // Listen for the "timeUp" event
      socket.on('timeUp', () => {
        console.log('Time is up!');
        setIsTimeUp(true); // Update local state when time is up
        handleAnswerQuestion(false, 0); // No points for incorrect answers
        onNavigate('AnswerToSlow'); // Navigate to the "AnswerTooSlow" page
      });

      return () => {
        socket.off('timeUp'); // Clean up the event listener
      };
    }
  }, [socket, onNavigate]);



  // Timer effect: Decrease timer over 15 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isAnswered) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - (1000 / (15 * 100)) : 0)); 
        // Decrease by 1000 points over 15 seconds (15*100 steps for a 10ms interval)
      }, 10); // Adjust timer every 10ms
    }

    return () => {
      clearInterval(interval); // Clear interval when component unmounts or when the question is answered
    };
  }, [isAnswered, timer, onNavigate]);

  // Listen for a new question from the server
  useEffect(() => {
    if (socket && socket.connected) {
      console.log('Socket is connected');
      
      // Listen for the 'newQuestion' event
      socket.on('newQuestion', (newQuestion: QuestionOptions) => {
        console.log('Players received new question:', newQuestion);
        setQuestion(newQuestion); // Set the new question
        setSelectedAnswer(null); // Reset selected answer
        setIsCorrect(null); // Reset correctness
        setIsAnswered(false); // Allow answering the new question
        setTimer(1000); // Reset the timer to 1000 points
      });

      // Optionally, request the current question after the socket connection
      socket.emit('requestCurrentQuestion');

      return () => {
        socket.off('newQuestion');
      };
    } else {
      console.log('Socket is not available or not connected');
    }
  }, [socket]);

  // Handle answer click
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true); // Stop the timer when an answer is clicked

    if (question && answer === question.correctAnswer) {
      setIsCorrect(true);
      const points = Math.floor(timer);
      const newScore = currentScore + points;
      
      // Emit currentScore and if the answer is correct
      if (socket) {
        socket.emit('currentScore', { currentScore: newScore, correct: true });
      }

      setCurrentScore(newScore); // Update local score
      handleAnswerQuestion(true, points); // Pass only correct and points
    } else {
      setIsCorrect(false);

      // Emit currentScore and if the answer is incorrect
      if (socket) {
        socket.emit('currentScore', { currentScore, correct: false });
      }

      handleAnswerQuestion(false, 0); // No points for incorrect answers
    }

    setTimeout(() => {
      onNavigate('AnswerResponsePage'); // Navigate to the next page
    }, 1000); // Delay for a short period to show feedback
  };

  if (!question) {
    console.log('Still waiting for the question data');
    return <div>Waiting for the question...</div>;
  }

  console.log('Rendering with question:', question);

  return (
    <section className="w-screen h-screen grid grid-rows-2 grid-cols-2 relative overflow-hidden">
      <button
        className='bg-quiz-green flex items-center justify-center text-black font-poppins font-medium text-3xl'
        onClick={() => handleAnswerClick(question.options.leftTop)}
      >
        {question.options.leftTop}
      </button>
      <button
        className='bg-quiz-red flex items-center justify-center text-black font-poppins font-medium text-3xl'
        onClick={() => handleAnswerClick(question.options.rightTop)}
      >
        {question.options.rightTop}
      </button>
      <button
        className='bg-quiz-yellow flex items-center justify-center text-black font-poppins font-medium text-3xl'
        onClick={() => handleAnswerClick(question.options.leftBottom)}
      >
        {question.options.leftBottom}
      </button>
      <button
        className='bg-quiz-blue flex items-center justify-center text-black font-poppins font-medium text-3xl'
        onClick={() => handleAnswerClick(question.options.rightBottom)}
      >
        {question.options.rightBottom}
      </button>

      {/* Display feedback if the player has selected an answer */}
      {selectedAnswer && (
        <div className="absolute bottom-0 w-full text-center">
          {isCorrect ? (
            <p className="text-green-500 text-2xl">Correct! Score: {Math.floor(timer)}</p>
          ) : (
            <p className="text-red-500 text-2xl">Incorrect!</p>
          )}
        </div>
      )}

      {/* Display the countdown timer */}
      <div className="absolute top-4 left-4 text-white text-2xl">
        Time Remaining: {Math.floor(timer)} ms
      </div>
    </section>
  );
};

export default QuestionGuessPage;
