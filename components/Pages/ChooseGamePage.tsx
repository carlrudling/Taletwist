'use client';
import React, { useState } from 'react';
import BlueShape from '../icons/blueShape';
import GuessWhoIcon from '../icons/guessWhoIcon';
import HotSeatIcon from '../icons/hotSeatIcon';
import WhosThatFace from '../icons/whosthatface';
import TriviaIcon from '../icons/triviaIcon';


interface ChooseGamePageProps {
  onNavigate: (page: string) => void;
  user: {
    id: string;
  } | null;
}


const ChooseGamePage: React.FC<ChooseGamePageProps> = ({ onNavigate, user }) => {
  const [pressedGame, setPressedGame] = useState<string | null>(null);

  const handlePress = (gameName: string) => {
    setPressedGame(gameName);
  };

  const games = [
    { name: 'Guess Who', icon: <GuessWhoIcon width='100%' height='100%'/> },
    { name: 'Hot Seat', icon: <HotSeatIcon width='100%' height='100%'/> },
    { name: 'Trivia', icon: <TriviaIcon width='100%' height='100%'/> },
    { name: 'Who’s that face?', icon: <WhosThatFace width='100%' height='100%'/> },
    { name: 'Most likely', icon: <GuessWhoIcon width='100%' height='100%' /> }
  ];

  return (
    <section className="w-screen h-screen flex flex-col justify-between items-center bg-custom-purple relative overflow-auto lg:overflow-hidden">
      <h1 className="quiz_name ml-14 mt-14 flex flex-row text-center self-start text-white z-10">
        {/* quiz.name */} Class Quiz
      </h1>

      <p className="quiz_name lg:mt-2 mt-10 lg:mb-2 mb-10 self-center text-center text-white z-10">
        Choose Game
      </p>

      <div className="flex justify-center w-full z-10">
        <div className="text-3xl grid lg:grid-cols-3 gap-x-40 lg:mb-2 mb-10 gap-y-10 text-medium text-white text-center font-sourceSansPro justify-center">
          {games.map((game) => (
            <div
              key={game.name}
              className={`game_card  border-4 flex flex-col justify-center items-center ${pressedGame === game.name ? 'border-custom-orange border-3' : 'border-white '}`}
              onClick={() => handlePress(game.name)}
            >
              <div className="w-40 h-40 ">
                {game.icon}
              </div>
              <p className="font-SourceSansPro text-3xl items-center text-black">{game.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-10 mb-10 flex flex-row justify-end self-stretch items-end">
        <div className="absolute top-0 left-0">
          <BlueShape />
        </div>
        <button  className={`${pressedGame ? 'orange_btn' : 'white_btn'}`}
          disabled={!pressedGame}>
          {/* handleClick */}
          Next
        </button>
      </div>
    </section>
  );
};

export default ChooseGamePage;
