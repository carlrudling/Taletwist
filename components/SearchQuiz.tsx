'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useQuizContext } from '@/app/provider/QuizProvider';
import { Socket } from 'socket.io-client';


interface SearchQuizProps {
  socket: Socket | null;  // Add socket as a prop
  onNavigate: (page: string) => void;
}

const SearchQuiz: React.FC<SearchQuizProps> = ({ socket, onNavigate }) => {
  const [quizCode, setQuizCode] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { setSelectedQuiz } = useQuizContext();

  const handleJoinQuiz = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Joining quiz with code:', quizCode, 'as', playerName);

    try {
      // Step 1: Create the player
      const createPlayerResponse = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName }),
      });

      if (!createPlayerResponse.ok) {
        throw new Error('Failed to create player');
      }

      const playerData = await createPlayerResponse.json();
      console.log('Player created:', playerData);

      // Step 2: Add the player to the quiz
      const addPlayerResponse = await fetch(`/api/quizzes/joinCode/${quizCode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName, score: 0, wins: 0 }), // Additional player details can be added here
      });

      if (!addPlayerResponse.ok) {
        const errorData = await addPlayerResponse.json();
        throw new Error(errorData.message || 'Failed to join the quiz');
      }

      const quizData = await addPlayerResponse.json();
      console.log('Joined quiz successfully:', quizData);


      setMessage('Joined quiz successfully!');
      setSelectedQuiz(quizData.data); // Set the selected quiz in the context



if (socket && socket.connected) {
  console.log('Socket is connected, emitting joinRoom');
  socket.emit('joinRoom', quizCode);
   onNavigate('joinQuizResponse')
} else {
  console.log('Socket not connected');
}


     
       

    } catch (error) {
      console.error('Failed to join quiz:', (error as Error).message);
      setMessage((error as Error).message);
    }

    setQuizCode('');
    setPlayerName('');
  };

  const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleQuizCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizCode(event.target.value);
  };

  return (
    <section className='feed'>
      <form className='z-20 relative w-full flex justify-center items-center flex-col gap-4' onSubmit={handleJoinQuiz}>
        <input
          type='text'
          placeholder='Code for the quiz'
          value={quizCode}
          onChange={handleQuizCodeChange}
          required
          className='search_input'
        />
        {quizCode.length >= 8 && (
          <input
            type='text'
            placeholder='Name'
            value={playerName}
            onChange={handlePlayerNameChange}
            required
            className='search_input'
          />
        )}
        <button type='submit' className='join_btn' disabled={quizCode.length < 8 || !playerName}>
          Join
        </button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};

export default SearchQuiz;
