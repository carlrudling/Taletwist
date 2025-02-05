'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import Nav from '../Nav';
import PinkCircle from '../icons/pinkCircle';
import CategoryCard from '../CategoryCard';
import GuessWhoIcon from '../icons/guessWhoIcon';
import HotSeatIcon from '../icons/hotSeatIcon';
import TriviaIcon from '../icons/triviaIcon';

interface Question {
  question: string;
  answers?: string[];
}

interface CreateCategoryPageProps {
  onNavigate: (page: string) => void;
  user: {
    id: string; // Adjust the type according to your user object structure
  } | null; // Allow for null in case the user isn't logged in
}

const CreateCategoryPage: React.FC<CreateCategoryPageProps> = ({ onNavigate, user }) => {
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryTags, setCategoryTags] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([{ question: '', answers: ['', '', '', ''] }]);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [categoryType, setCategoryType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [formOkey, setFormOkey] = useState(false); // State to track form validity
  const [errorMessages, setErrorMessages] = useState<string[]>([]); // State to track validation errors
  const [showErrorMessages, setShowErrorMessages] = useState(false); // State to control the display of error messages

  // Update the example category to include tags and questionCount
  const category = {
    _id: '1',
    name: 'Childhood memories',
    votes: { count: 20, userIds: [] }, // Ensure votes is an object
    description: 'This is the very very very long description about the category',
    tags: ['memory', 'childhood', 'nostalgia'], // Example tags
    questionCount: 10, // Example question count
  };

  // Use useEffect to validate the form whenever a relevant state changes
  useEffect(() => {
    validateForm();
  }, [categoryName, categoryTags, categoryType, questions, description]);

  // Function to validate form fields
  const validateForm = () => {
    const errors: string[] = [];

    // Validate each form field and push an error message if validation fails
    if (categoryName.trim() === '') {
      errors.push('Category name is required.');
    }
    if (description.trim() === '') {
      errors.push('Description is required.');
    }
    if (description.length > 150) {
      errors.push('Description must not exceed 150 characters.');
    }
    if (categoryType === '') {
      errors.push('Category type must be selected.');
    }
    if (categoryTags.length < 3) {
      errors.push('Please enter at least 3 tags.');
    }
    if (!questions.every((q) => q.question.trim() !== '')) {
      errors.push('All questions must be filled.');
    }
    if (categoryType === 'Trivia' && !questions.every((q) => q.answers?.every((a) => a.trim() !== ''))) {
      errors.push('All Trivia questions must have complete answers.');
    }

    setErrorMessages(errors);
    setFormOkey(errors.length === 0); // Update form validity
  };

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    validateForm(); // Validate the form on submission

    // If form is not valid, show errors and return
    if (!formOkey) {
      setShowErrorMessages(true); // Display error messages if form is invalid
      return;
    }

    try {
      // First, create the game
      const gameId = await createGame();

      if (!gameId) {
        console.error('Failed to create game');
        return;
      }

      // Then, create the category with the gameId and questions
      await createCategory(gameId, questions.map(q => q.question)); // Pass questions array

      // Reset form state after successful submission
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Function to create a game based on the category type
  const createGame = async (): Promise<string | null> => {
    let endpoint = '';
    let payload: any = {};

    // Set the endpoint and payload based on the selected category type
    switch (categoryType) {
      case 'GuessWho':
        endpoint = '/api/games/guesswho';
        payload = {
          statements: questions.map((q) => ({
            statement: q.question,
          })),
        };
        break;
      case 'HotSeat':
        endpoint = '/api/games/hotseat';
        payload = {
          questions: questions.map((q) => ({
            question: q.question,
          })),
        };
        break;
      case 'MostLikely':
        endpoint = '/api/games/mostlikely';
        payload = {
          questions: questions.map((q) => ({
            question: q.question,
          })),
        };
        break;
      case 'Trivia':
        endpoint = '/api/games/trivia';
        payload = {
          questions: questions.map((q) => ({
            question: q.question,
            rightAnswer: q.answers![0],
            falseAnswer1: q.answers![1],
            falseAnswer2: q.answers![2],
            falseAnswer3: q.answers![3],
          })),
        };
        break;
      default:
        return null;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Game Created:', data);
        return data.data._id; // Return the created game ID
      } else {
        console.error('Failed to create game:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Error creating game:', error);
      return null;
    }
  };

  // Function to create a category
  const createCategory = async (gameId: string, questions: string[]) => {
    // Prepare the category data
    const categoryData = {
      name: categoryName,
      creatorId: user?.id,
      createdBy: 'user', // Assuming categories are created by users
      isPrivate: isPrivate,
      description: description,
      tags: categoryTags,
      gameType: {
        name: categoryType, // Use categoryType for gameType name
        id: gameId, // Use the gameId returned from the game creation
      },
      questionCount: questions.length, // Correctly set the number of questions
      votes: {
        count: 0, // Initialize with default values
        userIds: [], // Initialize with an empty array
      },
    };

    console.log('Category Data:', categoryData); // Log the data for debugging

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData), // Ensure correct data is being sent
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Category Created:', responseData);
      } else {
        console.error('Failed to create category:', responseData.message);
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  // Function to reset form after successful submission
  const resetForm = () => {
    setCategoryName('');
    setCategoryTags([]);
    setQuestions([{ question: '', answers: ['', '', '', ''] }]);
    setIsPrivate(false);
    setCategoryType('');
    setDescription('');
    setFormOkey(false);
    setErrorMessages([]);
    setShowErrorMessages(false);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers![answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''] }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (game: string) => {
    setCategoryType(game);
  };

  const handleFormToggle = (showFirst: boolean) => {
    setShowFirstForm(showFirst);
  };

  // Function to handle tag input change
  const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tagsArray = event.target.value.split(',').map((tag) => tag.trim());
    const filteredTags = tagsArray.filter((tag) => tag !== '');
    setCategoryTags(filteredTags);
  };

  return (
    <section className="flex flex-col w-screen h-screen bg-custom-purple relative overflow-auto">
      <Nav onNavigate={onNavigate} />

      {showFirstForm ? (
        <div className="flex flex-row self-start ml-4 lg:ml-20 mr-14 mb-40">
          <form className="create_quiz_form flex flex-col z-10 mb-2 justify-start">
            <h1 className="head_text text-left mb-10">Category</h1>
            <p className="font-sourceSansPro text-2xl font-regular mb-20 text-black">
              A category is a set of questions that you can play in different games.
            </p>
            <p className="font-poppins text-l font-bold mb-5 text-black">Example</p>
            <div className="self-start">
              <CategoryCard category={category} buttonLabel="Select" clickable={false} />
            </div>
            <button className="purple_btn self-end mt-10" onClick={() => handleFormToggle(false)}>
              Got it
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-row self-start ml-4 mr-14 mb-40 lg:ml-20">
          <form onSubmit={handleSubmit} className="create_quiz_form flex flex-col z-10 mb-2 justify-start">
            <h1 className="head_text text-left mb-10">Create Category</h1>
            <h3 className="mb-5 text-lg font-medium font-SourceSansPro text-gray-900">
              Which game do you want to create a category for?
            </h3>
            <ul className="grid w-full gap-6 md:grid-cols-3">
              <li>
                <input
                  type="checkbox"
                  id="guessWho-option"
                  value="GuessWho"
                  className="hidden peer"
                  checked={categoryType === 'GuessWho'}
                  onChange={() => handleCheckboxChange('GuessWho')}
                />
                <label
                  htmlFor="guessWho-option"
                  className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                >
                  <div className="block">
                    <GuessWhoIcon width="40%" height="40%" />
                    <div className="w-full text-lg font-SourceSansPro font-semibold">Guess Who</div>
                    <div className="w-full font-SourceSansPro text-sm">Finish statements and Guess Who it is.</div>
                  </div>
                </label>
              </li>

              <li>
                <input
                  type="checkbox"
                  id="hotSeat-option"
                  value="HotSeat"
                  className="hidden peer"
                  checked={categoryType === 'HotSeat'}
                  onChange={() => handleCheckboxChange('HotSeat')}
                />
                <label
                  htmlFor="hotSeat-option"
                  className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                >
                  <div className="block">
                    <HotSeatIcon width="70" height="70" />
                    <div className="w-full mt-3 text-lg font-SourceSansPro font-semibold">Hot Seat</div>
                    <div className="w-full font-SourceSansPro text-sm">Select questions, see who's in the Hot Seat.</div>
                  </div>
                </label>
              </li>

              <li>
                <input
                  type="checkbox"
                  id="trivia-option"
                  value="Trivia"
                  className="hidden peer"
                  checked={categoryType === 'Trivia'}
                  onChange={() => handleCheckboxChange('Trivia')}
                />
                <label
                  htmlFor="trivia-option"
                  className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                >
                  <div className="block">
                    <TriviaIcon width="70" height="70" />
                    <div className="w-full mt-3 text-lg font-SourceSansPro font-semibold">Trivia</div>
                    <div className="w-full font-SourceSansPro text-sm">A classic Trivia with questions and answers.</div>
                  </div>
                </label>
              </li>

              <li>
                <input
                  type="checkbox"
                  id="mostLikely-option"
                  value="MostLikely"
                  className="hidden peer"
                  checked={categoryType === 'MostLikely'}
                  onChange={() => handleCheckboxChange('MostLikely')}
                />
                <label
                  htmlFor="mostLikely-option"
                  className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                >
                  <div className="block">
                    <TriviaIcon width="70" height="70" />
                    <div className="w-full mt-3 text-lg font-SourceSansPro font-semibold">Most Likely</div>
                    <div className="w-full font-SourceSansPro text-sm">Make questions and vote of who is most likely to do it.</div>
                  </div>
                </label>
              </li>
            </ul>

            <h3 className="mt-5 text-lg font-SourceSansPro mb-2 font-medium text-gray-900">Category information</h3>
            <input
              type="text"
              placeholder="Name for the Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="search_input peer mb-5"
            />

            <textarea
              placeholder="Enter a description of the category..."
              maxLength={150} // Limit the description to 150 characters
              className="w-full h-32 mb-2 p-4 border-2 search_input border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              aria-label="Detailed information"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className={`text-xs ${description.length === 150 ? 'text-quiz-red' : 'text-gray-500'} mb-4`}>
              {description.length}/150 characters
            </p>

            {categoryType === 'GuessWho' ? (
              <p className="text-xs font-normal text-gray-500">Example statement: My favorite movie as a kid was...</p>
            ) : categoryType === 'HotSeat' ? (
              <p className="text-xs font-normal text-gray-500 ">Example question: What is your biggest fear?</p>
            ) : categoryType === 'Trivia' ? (
              <p className="text-xs font-normal text-gray-500 ">Example question: What is the population of Greenland?</p>
            ) : categoryType === 'MostLikely' ? (
              <p className="text-xs font-normal text-gray-500 ">Example question: Who is most likely to choke on a job interview?</p>
            ) : null}

            {questions.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`${categoryType === 'GuessWho' ? 'Statement' : 'Question'} ${index + 1}`}
                    value={
                      categoryType === 'MostLikely'
                        ? `Who is most likely to ${item.question}`
                        : item.question
                    }
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        categoryType === 'MostLikely'
                          ? e.target.value.replace('Who is most likely to ', '')
                          : e.target.value
                      )
                    }
                    className="search_input peer flex-1"
                  />
                  <button type="button" onClick={() => handleRemoveQuestion(index)} className="remove_btn">
                    Remove
                  </button>
                </div>
                {categoryType === 'Trivia' && (
                  <div className="grid grid-cols-2 gap-2">
                    {item.answers!.map((answer, answerIndex) => (
                      <input
                        key={answerIndex}
                        type="text"
                        placeholder={answerIndex === 0 ? 'Correct answer' : 'Wrong answer'}
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
                        className="search_input peer flex-1"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button type="button" onClick={handleAddQuestion} className="add_btn">
              Add {categoryType === 'GuessWho' ? 'Statement' : 'Question'}
            </button>

            <p className="text-xs font-normal text-gray-500 ">Min 3 tags. Separate tags by commas</p>
            <input
              type="text"
              placeholder="Tags (e.g., fun, challenging, educational)"
              onChange={handleTagsChange} // Update the tags when input changes
              required
              className="search_input peer mb-5"
            />

            <div className="flex mt-10">
              <div className="custom-checkbox flex items-center h-5">
                <input
                  id="helper-checkbox"
                  aria-describedby="helper-checkbox-text"
                  type="checkbox"
                  value=""
                  checked={isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                />
                <label htmlFor="helper-checkbox" className="ml-2"></label>
              </div>
              <div className="ms-2 text-sm">
                <label htmlFor="helper-checkbox" className="font-medium text-gray-900">
                  Make Category Private
                </label>
                <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500">
                  {' '}
                  By setting it to private no one else can get access to it.
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <button className="font-poppins text-l self-end mt-10" onClick={() => handleFormToggle(true)}>
                Back
              </button>

              <button className="purple_btn self-end mt-10" type="button" onClick={handleSubmit}>
                Create
              </button>
            </div>

            {/* Display validation error messages */}
            {showErrorMessages && errorMessages.length > 0 && (
              <div className="mt-4 text-sm text-red-600">
                {errorMessages.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            )}
          </form>
        </div>
      )}

      <div className="absolute top-20 left-0">
        <PinkCircle />
      </div>
    </section>
  );
};

export default CreateCategoryPage;
