'use client'
import React from 'react'
import PinkShape from '../icons/pinkShape'


const QuizStatsPage = () => {    

    const votes = [
    { name: 'Oskar', votes: 6, color: 'bg-quiz-green' },
    { name: 'Carl', votes: 3, color: 'bg-quiz-red' },
    { name: 'Hanna', votes: 8, color: 'bg-quiz-yellow' },
    { name: 'Axel', votes: 4, color: 'bg-quiz-blue' },
  ];

 const maxVotes = Math.max(...votes.map(v => v.votes));

  return (
  <section className="w-screen h-screen flex flex-col justify-between bg-custom-purple relative overflow-hidden">
    
    <div className='flex flex-row mx-14 mt-14 z-10 justify-between text-center '>
<h1 className={'quiz_name text-white'}>
      {/*quiz.name*/} Class Quiz
      </h1>

      <h1 className='font-SourceSansPro font-regular text-3xl text-white'>7</h1>
    </div>
      

      <p className="self-center z-10 text-center z-10 text-white font-poppins font-medium text-4xl mt-20">
        “Growing up my favorit movie was Zorro”
      </p>

     <div className='flex justify-center items-end w-full px-14 lg:space-x-32 space-x-8'>
        {votes.map((vote, index) => (
          <div key={index} className='flex flex-col items-center'>
            <div
              className={`${vote.color} w-12`}
              style={{ height: `${(vote.votes / maxVotes) * 200}px` }}
            ></div>
            <span className='mt-2 text-white font-SourceSansPro text-xl'>{vote.name}</span>
            <span className='text-white font-SourceSansPro'>{vote.votes} votes</span>
          </div>
        ))}
      </div>


 <div className="z-10 mx-10 mb-10 flex flex-row align-end self-end place-self-end justify-self-end">  
         <button  className='orange_btn'>
          Next
        </button>
          </div>

<div className='absolute top-0 right-0 '>
<PinkShape />
</div>
    </section>
  )
}

export default QuizStatsPage
