import React from 'react'
import HotSeatIcon from './icons/hotSeatIcon'

const ExplainHotSeat = () => {
  return (
    <div className='flex flex-col items-center z-20'>
      <HotSeatIcon width='30%' height='30%' />
      <p className='font-SourceSansPro text-center text-white mt-10 text-2xl'>
        The person in the seat needs to answer the question.
      </p>
    </div>
  );
};

export default ExplainHotSeat