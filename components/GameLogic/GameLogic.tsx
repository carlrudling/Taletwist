'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import io, { Socket } from 'socket.io-client';
import StartPage from '../Pages/StartPage';
import JoinPage from '../Pages/JoinPage';
import CreateQuizPage from '../Pages/CreateQuizPage';
import ProfilePage from '../Pages/ProfilePage';
import CreateCategoryPage from '../Pages/CreateCategoryPage';
import SubscriptionPage from '../Pages/SubscriptionPage';
import ChooseGamePage from '../Pages/ChooseGamePage';
import ChooseCategoryPage from '../Pages/ChooseCategoryPage';
import JoinedQuizResponsePage from '../Pages/Player/JoinedQuizResponsePage';
import { IQuiz } from '@/models/quiz';  // Import the IQuiz interface
import { ICategory } from '@/models/category';
import LoadingPage from '../Pages/LoadingPage';
import QuestionAnswerPage from '../Pages/Player/QuestionAnswerPage';
import { useQuizContext } from '@/app/provider/QuizProvider';
import { IGameStatement } from '@/utils/IGameStatement';
import QuizQuestionPage from '../Pages/QuizQuestionPage';
import QuestionGuessPage from '../Pages/Player/QuestionGuessPage';
import AnswerResponsePage from '../Pages/AnswerResponsePage';
import AnswerToSlowPage from '../Pages/Player/AnswerToSlowPage';
import QuizRankingPage from '../Pages/QuizRankingPage';
import QuizStatsPage from '../Pages/QuizStatsPage';


// Define the shape of the user data
interface User {
  id: string;
  email: string;
  name: string;
}


interface PlayerRanking {
  name: string;
  score: number;
  icon: string; // 🔥 for correct, 🥶 for incorrect
}

interface PlayerResponse {
  playerId: string;
  playerName?: string; // Player name is optional (only for players)
  currentScore: number;
  correct: boolean;
  answer?: string;      // Optional answer string
  position?: string;    // Add the position field to track the answer position
}




const GameLogic: React.FC = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('start');
  const [gameType, setGameType] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quiz, setQuiz] = useState<IQuiz | null>(null);  // Define the state to hold a quiz
  const [category, setCategory] = useState<ICategory | null>(null);
  const [questions, setQuestions] = useState<IGameStatement[]>([]);  // State to hold questions for the game
  const [finalStatements, setFinalStatements] = useState<IGameStatement[]>([]); // State to hold final statements
  const { selectedQuiz } = useQuizContext();  // Get the selected quiz from context
  const [playerName, setPlayerName] = useState<string | null>(null);  // Explicitly define the type
  const [correct, setCorrect] = useState(false);
  const [points, setPoints] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [rankings, setRankings] = useState<PlayerRanking[]>([]);  // Add state to store rankings
  const [statsData, setStatsData] = useState<{ answer: string; votes: number; position: string }[]>([]); // Initialize with an empty array




  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser(session.user as User);
    }
  }, [session, status]);

  useEffect(() => {
      const newSocket = io('http://localhost:3001');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to socket server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      // Listen for the startGuessWhoGame event and store questions
     newSocket.on('startGuessWhoGame', (receivedQuestions: IGameStatement[]) => {
      console.log('Received questions:', receivedQuestions);
      setQuestions(receivedQuestions);  // Store the received questions
      setCurrentPage('QuestionAnswerPage');  // Navigate to the QuestionAnswerPage
    });


      newSocket.on('allStatementsReceived', (statements: IGameStatement[]) => {
        console.log('Received all statements in GameLogic:', statements);
        setFinalStatements(statements);
        console.log('Navigating to QuizQuestionPage');
        setCurrentPage('QuizQuestionPage');

      });

      newSocket.on('QuestionGuessPage', () => {
        console.log('Navigating to QuestionGuessPage');
        setCurrentPage('QuestionGuessPage');

      });

          // Listen for the 'allPlayersAnswered' event for rankings
newSocket.on('allPlayersAnswered', (roomResponses: PlayerResponse[]) => {
  console.log('Received allPlayersAnswered:', roomResponses);

  // Process responses for stats
  const voteCount: { [key: string]: { votes: number, position: string } } = {};  // Store both votes and position

  roomResponses.forEach((response: PlayerResponse) => {
    if (response.answer && response.position) {
      if (!voteCount[response.answer]) {
        voteCount[response.answer] = { votes: 0, position: response.position };
      }
      voteCount[response.answer].votes += 1;
    }
  });

  // Convert voteCount object into the required array format with { answer, votes, position }
  const statsDataArray = Object.keys(voteCount).map((answer) => ({
    answer,
    votes: voteCount[answer].votes,
    position: voteCount[answer].position,
  }));

  setStatsData(statsDataArray);  // Save the stats data for use in QuizStatsPage

  // Map the room responses to the ranking format
  const updatedRankings: PlayerRanking[] = roomResponses
    .map((response: PlayerResponse) => ({
      name: response.playerName || 'Unknown',
      score: response.currentScore,
      icon: response.correct ? '🔥' : '🥶',
    }))
    .sort((a: PlayerRanking, b: PlayerRanking) => b.score - a.score)
    .slice(0, 5); // Take only the top 5 players

  console.log('Updated rankings:', updatedRankings);
  setRankings(updatedRankings);  // Set the rankings state
});




      return () => {
        newSocket.disconnect();
      };
  }, [session, status]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleHashChange = () => {
        const hashParts = window.location.hash.replace('#', '').split(':');
        const newPage = hashParts[0] || 'start';
        const gameTypeParam = hashParts[1] || null;

        setCurrentPage(newPage);
        setGameType(gameTypeParam);
      };

      window.addEventListener('hashchange', handleHashChange);
      handleHashChange();

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, []);

  const updateGameType = (type: string) => {
    setGameType(type);
  };

  const handleNavigate = (page: string, gameTypeParam?: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = gameTypeParam ? `${page}:${gameTypeParam}` : page;
    }
  };

 const handleAnswerQuestion = (correct: boolean, points: number) => {
  setCurrentScore(prevScore => prevScore + points); // Update the score
  setCorrect(correct);  // Store whether the answer was correct
  setPoints(points);    // Store the points earned
};


 const handlePlayerName = (name: string) => {
  setPlayerName(name);
  
};


  const renderPage = () => {
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  switch (currentPage) {
    case 'start':
      return <StartPage onNavigate={handleNavigate} user={user} socket={socket} handlePlayerName={handlePlayerName}/>;
    case 'join':
      return <JoinPage onNavigate={handleNavigate} user={user} socket={socket} />;
    case 'create-quiz':
      return <CreateQuizPage onNavigate={handleNavigate} user={user} />;
    case 'create-category':
      return <CreateCategoryPage onNavigate={handleNavigate} user={user} />;
    case 'edit-subscription':
      return <SubscriptionPage onNavigate={handleNavigate} user={user} />;
    case 'chooseGame':
      return <ChooseGamePage onNavigate={handleNavigate} user={user} setGameType={updateGameType}/>;
    case 'joinQuizResponse':
      return <JoinedQuizResponsePage onNavigate={handleNavigate} user={user} quizName={quiz?.name} />;
    case 'choose-category':
      return <ChooseCategoryPage onNavigate={handleNavigate} user={user} gameType={gameType} socket={socket} />;
    case 'profile':
      return <ProfilePage onNavigate={handleNavigate} user={user} />;
    case 'loadingPage':
      return <LoadingPage onNavigate={handleNavigate} user={user} socket={socket} loadingText={gameType === 'GuessWho' ? 'Waiting for all Players to finsih the statements' : 'Loading, please wait...'}
/>;
    case 'QuestionAnswerPage':
      return <QuestionAnswerPage onNavigate={handleNavigate} socket={socket} questions={questions} playerName={playerName ?? ''}/>;
      case 'QuizQuestionPage':
        return <QuizQuestionPage statements={finalStatements} socket={socket} onNavigate={handleNavigate}/>;
      case 'QuestionGuessPage':
        return <QuestionGuessPage socket={socket} onNavigate={handleNavigate} handleAnswerQuestion={handleAnswerQuestion}/>
      case 'AnswerResponsePage':
        return <AnswerResponsePage correct={correct} points={points} currentScore={currentScore}/>
        case 'AnswerToSlow':
          return <AnswerToSlowPage currentScore={currentScore} />
          case 'quizRankingPage':
        return <QuizRankingPage rankings={rankings}/>;  // Pass rankings as a prop
        case 'quizStatsPage': 
      return <QuizStatsPage statsData={statsData} onNavigate={handleNavigate}/>;
    default:
      return <StartPage onNavigate={handleNavigate} user={user} socket={socket} handlePlayerName={handlePlayerName}/>;
  }
};


  return <div>{renderPage()}</div>;
};

export default GameLogic;
