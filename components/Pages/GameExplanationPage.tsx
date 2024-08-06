'use client';
import React, { useState } from 'react';
import BlueShape from '../icons/blueShape';
import ExplainHotSeat from '../ExplainHotSeat';
import ExplainWhosThatFace from '../ExplainWhosThatFace';


const GameExplanationPage = () => {
    const [chosenGame, setChosenGame] = useState<string | null>('Hot Seat');
 
    const handlePress = (gameName: string) => {
         setChosenGame(gameName);
     };

    const renderGameExplanation = () => {
    switch (chosenGame) {
      case 'Hot Seat':
        return <ExplainHotSeat />;
      case 'Who’s that face?':
        return <ExplainWhosThatFace />;
      // Add more cases here for other games
      default:
        return <p className='text-white'>Please select a game</p>;
    }
  };


  return (
  <section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
       <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center '>
<h1 className={'quiz_name text-white'}>
      {/*quiz.name*/} Class Quiz
      </h1>

      <h1 className='font-SourceSansPro font-regular text-3xl text-white'>1/20</h1>
    </div>

      <p className="quiz_name mt-20 lg:mb-2 mb-10 self-center text-center text-white z-10">
        {chosenGame}
      </p>

  <div className="flex-grow flex justify-center items-center">
        {renderGameExplanation()}
      </div>

     <div className="flex justify-end p-10 z-10">
          <button
          className={`${chosenGame ? 'orange_btn' : 'white_btn'}`}
          disabled={!chosenGame}
        >
          {/* handleClick */}
          Got it
        </button>
      </div>

      <div className="absolute top-0 left-0 z-0">
        <BlueShape />
      </div>
    </section>
  );
};
export default GameExplanationPage;
