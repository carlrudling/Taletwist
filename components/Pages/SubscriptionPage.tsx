import React from 'react'
import PinkCircle from '../icons/pinkCircle'
import Nav from '../Nav'

interface SubscriptionePageProps {
  onNavigate: (page: string) => void;
   user: {
    id: string; // Adjust the type according to your user object structure
  } | null;
}

const SubscriptionPage: React.FC<SubscriptionePageProps> = ({ onNavigate, user }) => {

     const rightTextFree = [
    '6 players',
    '✅',
    '❌',
    '✅',
    '✅',
    '✅',
    '✅',
  ];

  const rightTextPremium = [
    'unlimited',
    '✅',
    '✅',
    '✅',
    '✅',
    '✅',
    '✅',
  ];



  return (
    <section className="flex flex-col justify-start w-screen h-screen bg-custom-purple relative overflow-auto lg:overflow-hidden">
    
      <Nav onNavigate={onNavigate} />
  <h1 className='quiz_name z-10 ml-14 mb-10 text-white'>
            Subscription
          </h1>
          

     <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-14 ml-4 mr-14 lg:mr-14 mb-40 lg:ml-20 sm:mx-4'>

<div className='subscription_card z-10 bg-white'>
    
    <h2 className='text-3xl font-poppins font-bold text-black mb-6 mt-2'>
        Free version 
    </h2>
     {[
            'Number of players',
            'Guess Who',
            'Make private categories',
            'Hot Seat',
            'Trivia',
            "Who's that face?",
            'Most likely',
        
          ].map((item, index) => (
            <div key={index} className="flex justify-between font-SourceSansPro font-medium mb-4">
              <span>{item}</span>
              <span className='font-poppins font-bold'>{rightTextFree[index]}</span>
            </div>
          ))}
        </div>

     <div className='subscription_card z-10 bg-custom-orange'>
<h2 className='text-3xl font-poppins font-bold text-black mb-6 mt-2'>
        Premium 👑
    </h2>
     {[
            'Guess Who',
            'Hot Seat',
            'Trivia',
            "Who's that face?",
            'Most likely',
            'Make private categories',
            'Number of players',

          ].map((item, index) => (
            <div key={index} className="flex justify-between font-SourceSansPro font-medium mb-4">
              <span>{item}</span>
              <span className='font-poppins font-bold'>{rightTextPremium[index]}</span>
            </div>
          ))}

<h2 className='text-xl font-poppins font-bold text-black mt-4'>$6.99 / month </h2>
           <button
            className='bg-custom-purple hover:bg-custom-pink hover:text-black hover:shadow text-white mt-4 font-medium font-poppins py-2 px-4 rounded'
            >
           Get Premium
          </button>
        </div>
        </div>
 
      <div className="absolute top-20 left-0 ">
        <PinkCircle />
      </div>


    </section>
  )
}

export default SubscriptionPage