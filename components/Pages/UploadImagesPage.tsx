'use client'
import React, { useState } from 'react';
import UploadImage from '../icons/uploadImage';

const UploadImagesPage = () => {
  const [isAnimating, setIsAnimating] = useState(false); // State to control animation
  const [success, setSuccess] = useState(false); // State to control success animation

  // Function to handle button click
  const handleClick = () => {
    // Trigger the initial animation
    setIsAnimating(true);

    // Reset initial animation after 2 seconds and trigger success animation
    setTimeout(() => {
      setIsAnimating(false);
      setSuccess(true);

      // Stop success animation after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 2000); // Initial animation duration
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-custom-purple relative overflow-hidden">
      <div className="text-center mb-40">
        <h1 className="font-SourceSansPro font-regular text-4xl text-white">1/3</h1>
        <h1 className="font-SourceSansPro mt-5 font-regular text-2xl text-white">Uploaded images</h1>
      </div>

      <button 
        className={`mb-40 relative flex items-center justify-center w-40 h-40 ${isAnimating ? 'animation-scale-pulse' : ''}`} 
        onClick={handleClick}
      >
        <UploadImage />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`block w-40 h-40 ${success ? 'bg-quiz-green' : 'bg-custom-blue'} rounded-full`}></span>
        </div>
      </button>
    </section>
  );
}

export default UploadImagesPage;
