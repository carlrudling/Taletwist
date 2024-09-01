'use client'
import React, {useEffect} from 'react'
import WaveIcon from '../icons/waveIcon'
import loadingAnimation from '../animations/loadingAnimation.json'
import Lottie from 'lottie-react'
import { Socket } from 'socket.io-client';
import { useQuizContext } from '@/app/provider/QuizProvider'


interface LoadingPageProps {
  onNavigate: (page: string) => void;
  user: {
    id: string;
  } | null;
  socket: Socket | null;  // Accept socket as a prop
  loadingText: string;  // Accept loadingText as a prop

}

const LoadingPage: React.FC<LoadingPageProps> = ({ onNavigate, user, socket, loadingText }) => {
  const { selectedQuiz } = useQuizContext();

  return (
  <section className="w-screen h-screen flex flex-col justify-start items-center bg-custom-purple relative overflow-hidden">
    
      <h1 className={'quiz_name ml-14 mt-14 z-10 flex flex-row text-center self-start text-white z-10 hidden lg:block '}>
      {selectedQuiz?.name ?? 'null' }
      </h1>

      <p className="mt-40 self-center z-10 text-center z-10 text-white font-poppins font-medium mx-10 text-3xl">
             {loadingText}
      </p>
<Lottie animationData={loadingAnimation} className='w-80 '/>




<div className='w-full hidden lg:block'>
 <WaveIcon />
</div>
    </section>
  )
}

export default LoadingPage