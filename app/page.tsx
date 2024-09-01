import React from 'react'
import GameLogic from '@/components/GameLogic/GameLogic'
import JoinPage from '@/components/Pages/JoinPage'
import ChooseCategoryPage from '@/components/Pages/ChooseCategoryPage'
import ChooseGamePage from '@/components/Pages/ChooseGamePage'
import QuizQuestionPage from '@/components/Pages/QuizQuestionPage'
import QuizStatsPage from '@/components/Pages/QuizStatsPage'
import QuizRankingPage from '@/components/Pages/QuizRankingPage'
import GameExplanationPage from '@/components/Pages/GameExplanationPage'
import LoadingPage from '@/components/Pages/LoadingPage'
import Thoughtsform from '@/components/Thoughtsform'
import QuizVotePage from '@/components/Pages/QuizVotePage'
import QuestionAnswerPage from '@/components/Pages/QuestionAnswerPage'
import QuestionGuessPage from '@/components/Pages/QuestionGuessPage'
import AnswerResponsePage from '@/components/Pages/AnswerResponsePage'
import UploadImagesPage from '@/components/Pages/UploadImagesPage'

const Home = () => {
   const isCorrect = true;  // Example value
  const earnedPoints = 578;  // Example value
  const currentScore = 1278;  // Example value
  return (
     <GameLogic />
  )
}

export default Home