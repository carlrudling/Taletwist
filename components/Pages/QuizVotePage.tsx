'use client'
import React, { useState } from 'react';
import PinkShape from '../icons/pinkShape';
import VotesIconAnimation from '../animations/votesIconAnimation';

const QuizVotePage = () => {    
  const [isUpVoted, setIsUpvoted] = useState(false);
   
  const handleVoted = () => {
    setIsUpvoted(prevState => !prevState);
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
      <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center '>
        <h1 className={'quiz_name text-white'}>
          Class Quiz
        </h1>
        <h1 className='font-SourceSansPro font-regular text-3xl text-white'>7</h1>
      </div>
      
      <p className="quiz_name lg:mt-2 mt-10 lg:mb-2 mb-10 self-center text-center text-white z-10">
        Thoughts of the category? 
      </p>

      <div className="flex flex-col space-y-4 justify-center items-center">
        <button 
          className='flex flex-col space-y-4 items-center justify-center w-full h-full relative' 
          onClick={handleVoted}
        >
          <VotesIconAnimation color={isUpVoted ? '#59C134' : '#FFFFFF'} height='100px' animate={isUpVoted} />
          <p className='font-SourceSansPro font-regular text-3xl text-white'>Upvote</p>
        </button>
      </div>

      <div className="z-10 mx-10 mb-10 flex flex-row align-end self-end place-self-end justify-self-end">  
        <button className='orange_btn'>
          Next
        </button>
      </div>

      <div className='absolute top-0 right-0 '>
        <PinkShape />
      </div>
    </section>
  )
}

export default QuizVotePage;
