'use client'
import React from 'react';
import Confetti from 'react-confetti';

// Define the props interface
interface AnswerToSlowPageProps {

  currentScore: number;
}

const AnswerToSlowPage: React.FC<AnswerToSlowPageProps> = ({ currentScore }) => {

  
  return (
    <section
      className='w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden bg-incorrect-gradient
      '>

      <div className="flex flex-col items-center justify-center">
        <p className='text-black mb-20 font-SourceSansPro font-Regular text-2xl'>
        </p>
       <h2 className='text-black mb-10 font-poppins font-bold text-2xl text-center'>
            Hey Sloth,<br />try being quicker next time!
        </h2>
        <h1 className='text-black mb-10 font-poppins font-medium text-6xl animation-scale-pulse'>
           🦥
        </h1>
        <p className='mb-40 font-SourceSansPro font-Regular'>On 7th place 348 points after Gustav</p>
      </div>
      <p className='absolute bottom-8 text-black font-SourceSansPro font-Regular text-xl'>
        Current score: <span className='font-bold'>{currentScore}</span>
      </p>
    </section>
  );
}

export default AnswerToSlowPage;
