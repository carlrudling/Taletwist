'use client'
import React from 'react'
import PinkShape from '../icons/pinkShape'


const QuizQuestionPage = () => {    


  return (
  <section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
    
    <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center '>
<h1 className={'quiz_name text-white '}>
      {/*quiz.name*/} Class Quiz
      </h1>

      <h1 className='font-SourceSansPro font-regular text-3xl text-white'>7</h1>
    </div>
      

      <p className="self-center z-10 text-center z-10 text-white font-poppins font-medium text-4xl">
        “Growing up my favorit movie was Zorro”
      </p>


    <div className='grid grid-rows-2 grid-flow-col '>

  <button className='bg-quiz-green w-full h-quizColorheight flex items-center justify-center text-black font-poppins font-medium text-3xl'>
Jonas
            </button>
             <button className='bg-quiz-yellow w-full h-quizColorheight flex items-center justify-center text-black font-poppins font-medium text-3xl'>Jonas
            </button>
             <button className='bg-quiz-red w-full h-quizColorheight flex items-center justify-center text-black font-poppins font-medium text-3xl'>Jonas
            </button>
             <button className='bg-quiz-blue w-full h-quizColorheight flex items-center justify-center text-black font-poppins font-medium text-3xl'>Jonas
            </button>
    </div>

<div className='absolute top-0 right-0 '>
<PinkShape />
</div>
    </section>
  )
}

export default QuizQuestionPage
