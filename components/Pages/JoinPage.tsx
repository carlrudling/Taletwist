'use client';

import React, { useState, useEffect } from 'react';
import PinkCircle from '../icons/pinkCircle';
import { useQuizContext } from '@/app/provider/QuizProvider'; 
import { Socket } from 'socket.io-client';  // Import the Socket type

interface JoinPageProps {
  onNavigate: (page: string) => void;
  user: {
    id: string;
  } | null;
  socket: Socket | null;  // Accept socket as a prop
}

const JoinPage: React.FC<JoinPageProps> = ({ onNavigate, user, socket }) => {
  const { selectedQuiz } = useQuizContext();
  const [currentPage, setCurrentPage] = useState(0);
  const playersPerPage = 18;

  const players = selectedQuiz?.players || [];

  useEffect(() => {
    if (socket) {
      // Listen for the 'userJoined' event from the server
      socket.on('userJoined', (message) => {
        console.log('New user joined:', message);
        // Optionally, update state or UI based on the new user
      });

      // Cleanup the listener when the component unmounts
      return () => {
        socket.off('userJoined');
      };
    }
  }, [socket]);

  const handleButtonClick = () => {
    onNavigate('chooseGame');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(players.length / playersPerPage));
    }, 3000);
    return () => clearInterval(interval);
  }, [players]);

  const start = currentPage * playersPerPage;
  const end = start + playersPerPage;
  const visiblePlayers = players.slice(start, end);

  let gridColumns = 'grid-cols-3';
  if (visiblePlayers.length > 9) {
    gridColumns = visiblePlayers.length === 18 ? 'grid-cols-12' : 'grid-cols-6';
  }

  const [isPremium, setIsPremium] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isPremium && players.length >= 6) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [isPremium, players.length]);

  return (
    <section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-hidden">
      {showPopup && (
        <div className="absolute flex flex-row items-center gap-2 top-5 left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded shadow-lg z-20">
          <p className="text-center">Maximum players reached!</p>
          <button
            className="mt-2 bg-custom-purple hover:bg-custom-orange text-white py-1 px-4 rounded"
            onClick={() => {
              console.log('Upgrade to Premium');
            }}
          >
            👑 Upgrade Now
          </button>
        </div>
      )}

      <h1 className='quiz_name ml-14 mt-14 z-10 flex flex-row text-center self-start text-white'>
        {selectedQuiz?.name ?? 'null'}
      </h1>

      <p className="quiz_name lg:mb-8 mb-2 mt-20 self-center z-10 text-center text-white">
        Players
      </p>

      <div className="flex justify-center w-full z-10">
        <div className={`text-xl lg:text-3xl grid ${gridColumns} gap-2 lg:gap-4 text-medium text-white text-center font-sourceSansPro`}>
          {visiblePlayers.map((player, index) => (
            <p key={index}>{player.name}</p>
          ))}
        </div>
      </div>

      <div className="absolute top-20 left-0">
        <PinkCircle />
      </div>
      <div className='absolute bottom-10 w-full'>
        <div className="mx-10 mb-10 flex flex-row justify-between self-stretch items-end">
          <p className='players_text text-white z-10' style={{ letterSpacing: '0.1em' }}>
            {selectedQuiz?.joinCode || 'Join Code'}
          </p>

          <button className='orange_btn' onClick={handleButtonClick}>
            Start
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinPage;
