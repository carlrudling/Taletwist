import React from 'react'
import UploadImage from './icons/uploadImage';
import WhosThatFace from './icons/whosthatface';

const ExplainWhosThatFace = () => {
  return (
    <div className='flex flex-col items-center z-20 space-y-16'>
      <p className='font-SourceSansPro text-center text-white text-2xl'>
                Everyone uploads images of themself 
      </p>

      <UploadImage />

      <p className='font-SourceSansPro text-center text-white text-2xl'>
                First to identify the person wins 
      </p>
    <WhosThatFace width='50%' height='50%'/>

    </div>
  );
};

export default ExplainWhosThatFace