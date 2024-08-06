'use client';
import React, { useState } from 'react';
import IdeaIcon from './icons/ideaIcon';
import Dropdown from './Dropdown';

const Thoughtsform = () => {
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('Subject'); // Default value for dropdown
  const [message, setMessage] = useState(''); // State to store the message

  const handleFormToggle = (showFirst: boolean) => {
    setShowFirstForm(showFirst);
  };

  return (
    <div>
      {showFirstForm ? (
        <div className='flex flex-col thoughts_card '>
          <h3 className='text-xl font-poppins font-bold text-black'>
            Please share
          </h3>
          <p className='font-SourceSansPro font-regular text-base mr-15'>
            We are a small team and in order to make Taletwist as good and fun as possible as well keep getting better we need <span className='font-bold'>your thoughts</span> and <span className='font-bold'>ideas.</span>
          </p>

          <div className='flex flex-row justify-end'>
            <div className='flex flex-col gap-y-5 items-center'>
              <IdeaIcon width='100%' height='100%' />
              <button className='bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded self-end' onClick={() => handleFormToggle(false)}>
                Share
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col thoughts_card '>        
          <h3 className='text-xl font-poppins font-medium text-black'>
            Ideas, bugs, thoughts?<br />
            <span className='font-bold'>Please share!</span>
          </h3>
          <Dropdown selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} />
          <textarea
            className='mt-4 p-2 border rounded-md font-SourceSansPro font-regular resize-none focus:outline-none focus:ring-0 h-40' // Adjust the height here
            placeholder='Write your message here...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='bg-custom-purple text-white font-medium font-poppins py-2 px-4 rounded mt-4 self-end'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Thoughtsform;
