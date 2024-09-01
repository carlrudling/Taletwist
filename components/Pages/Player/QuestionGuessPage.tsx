'use client'
import React from 'react';

const QuestionGuessPage = () => {    
  return (
    <section className="w-screen h-screen grid grid-rows-2 grid-cols-2 relative overflow-hidden">
      <button className='bg-quiz-green flex items-center justify-center text-black font-poppins font-medium text-3xl'>
        Jonas
      </button>
      <button className='bg-quiz-yellow flex items-center justify-center text-black font-poppins font-medium text-3xl'>
        Jonas
      </button>
      <button className='bg-quiz-red flex items-center justify-center text-black font-poppins font-medium text-3xl'>
        Jonas
      </button>
      <button className='bg-quiz-blue flex items-center justify-center text-black font-poppins font-medium text-3xl'>
        Jonas
      </button>
    </section>
  )
}

export default QuestionGuessPage;
