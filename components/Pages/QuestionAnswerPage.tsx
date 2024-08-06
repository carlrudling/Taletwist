'use client'
import React, { useState } from 'react';

const QuestionAnswerPage = () => {    
  const [answer, setAnswer] = useState(''); // State to store the message

  return (
    <section className="w-screen h-screen flex flex-col justify-between items-center bg-custom-purple relative overflow-hidden">
      <h1 className="mt-20 font-SourceSansPro font-regular text-4xl text-white">1/3</h1>

      <p className="self-center z-10 text-center text-white font-poppins font-medium text-4xl">
        “Growing up my favorite movie was...”
      </p>
      
      <textarea
        className="p-2 border mb-10 h-60 w-11/12 mx-10 rounded-md font-SourceSansPro font-regular resize-none focus:outline-none focus:ring-0"
        placeholder="Don't rewriting the message, just write the answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <div className="z-10 mx-10 mb-10 flex flex-row justify-end w-full">  
        <button className="orange_btn">
          Next
        </button>
      </div>
    </section>
  );
}

export default QuestionAnswerPage;
