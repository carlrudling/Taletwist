'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import Nav from "../Nav";
import PinkCircle from "../icons/pinkCircle";
import CategoryCard from '../CategoryCard';
import GuessWhoIcon from "../icons/guessWhoIcon";
import HotSeatIcon from "../icons/hotSeatIcon";
import TriviaIcon from "../icons/triviaIcon";

interface Question {
  question: string;
  answers?: string[];

}

interface CreateCategoryPageProps {
  onNavigate: (page: string) => void;
}

const CreateCategoryPage: React.FC<CreateCategoryPageProps> = ({ onNavigate }) => {
  const { data: session } = useSession();
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [transitionClass, setTransitionClass] = useState('form-enter');
  const [categoryName, setCategoryName] = useState<string>(""); // State to hold the quiz name
  const [questions, setQuestions] = useState<Question[]>([{ question: "", answers: ["", "", "", ""] }]);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [categoryType, setCategoryType] = useState<string>("");
  const [description, setDescription] = useState<string>("");

const category = {
    _id: '1',
    name: 'Childhood memories',
    votes: 20,
    description: 'This is the very very very long description about the category',
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Prepare the data based on the selected game
    let postData: any = {
      name: categoryName,
      creatorId: session?.user?.id,
      isPrivate: isPrivate,
      description: description,
      categoryType: categoryType, // Only the question text is needed
    };

    // Add game-specific data
    if (categoryType === 'GuessWho') {
      postData.statements = questions.map(q => ({
        statement: q.question,
        answer: ""  // You can modify this as needed, perhaps include a way to input answers if required
      }));
    } else if (categoryType === 'HotSeat') {
      postData.questions = questions.map(q => q.question); // Only the question text is needed
    } else if (categoryType === 'MostLikely') {
      postData.questions = questions.map(q => q.question); // Only the question text is needed
    } else if (categoryType === 'Trivia') {
      postData.questions = questions.map(q => ({
        question: q.question,
        answers: q.answers
      }));
    }

    try {
      const response = await fetch('/api/category/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      const responseData = await response.json();

      if (response.ok) {
        // Handle successful creation
        console.log('Category Created:', responseData);
      } else {
        // Handle errors
        console.error('Failed to create category:', responseData.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

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
      setQuestions([...questions, { question: "", answers: ["", "", "", ""] }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (game: string) => {
    setCategoryType(game);  // Set the selected game to the one that was just clicked
  };

    const handleFormToggle = (showFirst: boolean) => {
    setTransitionClass(showFirst ? 'form-exit-active' : 'form-enter-active');
    setTimeout(() => {
      setShowFirstForm(showFirst);
      setTransitionClass(showFirst ? 'form-enter' : 'form-exit');
    }, 500); // The duration should match the CSS transition duration
  };

  return (
    <section className="flex flex-col w-screen h-screen bg-custom-purple relative overflow-auto">
      <Nav onNavigate={onNavigate}/>
      
      {showFirstForm ? (
        
        <div className='flex flex-row self-start ml-4 lg:ml-20 mr-14 mb-40'>
          <form className='create_quiz_form flex flex-col z-10 mb-2 justify-start'>
            <h1 className='head_text text-left mb-10'>
         Category
      </h1>
            <p className='font-sourceSansPro text-2xl font-regular mb-20 text-black'>
              A category is a set of questions that you can play in different games.
            </p>
            <p className='font-poppins text-l font-bold mb-5 text-black'>Example</p>
            <div className="self-start">
              <CategoryCard
                category={category}
                buttonLabel="Select" // Optionally keep this if you want to display the button
                clickable={false} // Pass clickable as false
              />
            </div>
            <button 
              className='purple_btn self-end mt-10'
              onClick={() => handleFormToggle(false)}
            >
              Got it
            </button>
          </form>
        </div>
      ) : (
      <div className='flex flex-row self-start ml-4 mr-14 mb-40 lg:ml-20 '>
      <form
        onSubmit={handleSubmit}
        className='create_quiz_form flex flex-col z-10 mb-2 justify-start'> 
        <h1 className='head_text text-left mb-10'>
        Create Category
      </h1>
        <h3 className="mb-5 text-lg font-medium font-SourceSansPro text-gray-900">Which game do you want to create a category for?</h3>
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
        <GuessWhoIcon width="40%" height="40%"/>
  
      <div className="w-full text-lg font-SourceSansPro font-semibold">Guess Who</div>
      <div className="w-full font-SourceSansPro text-sm">Finish statements and Guess Who it is.</div>
    </div>
  </label>
</li>

          <li>
            <input type="checkbox" id="hotSeat-option" value="HotSeat" className="hidden peer" checked={categoryType === 'HotSeat'} onChange={() => handleCheckboxChange('HotSeat')} />
            <label htmlFor="hotSeat-option"className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
              <div className="block">
                <HotSeatIcon width="70" height="70" />
                <div className="w-full mt-3 text-lg font-SourceSansPro font-semibold">Hot Seat</div>
                <div className="w-full font-SourceSansPro text-sm">Select questions, see who's in the Hot Seat.</div>
              </div>
            </label>
          </li>
           <li>
            <input type="checkbox" id="trivia-option" value="Trivia" className="hidden peer" checked={categoryType === 'Trivia'} onChange={() => handleCheckboxChange('Trivia')} />
            <label htmlFor="trivia-option"className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
              <div className="block">
                <TriviaIcon width="70" height="70" />
                <div className="w-full mt-3 text-lg font-SourceSansPro font-semibold">Trivia</div>
                <div className="w-full font-SourceSansPro text-sm">A classic Trivia with questions and answers.</div>
              </div>
            </label>
          </li>
           <li>
            <input type="checkbox" id="mostLikely-option" value="MostLikely" className="hidden peer" checked={categoryType === 'MostLikely'} onChange={() => handleCheckboxChange('MostLikely')} />
            <label htmlFor="mostLikely-option"className="inline-flex items-start justify-between w-full h-50 p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-custom-orange peer-checked:text-white peer-checked:bg-custom-purple hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
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
          type='text'
          placeholder='Name for the Category'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className='search_input peer mb-5'
        />

        <textarea
          placeholder='Enter a description of the category...'
          className='w-full h-32 mb-5 p-4 border-2 search_input border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none'
          aria-label='Detailed information'
          value={description} // Bind the value of textarea to the description state
          onChange={(e) => setDescription(e.target.value)} // Update the state when the input changes
        ></textarea>

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
                value={categoryType === 'MostLikely' ? `Who is most likely to ${item.question}` : item.question}
                onChange={(e) => handleQuestionChange(index, categoryType === 'MostLikely' ? e.target.value.replace('Who is most likely to ', '') : e.target.value)}
                className="search_input peer flex-1"
              />
              <button type="button" onClick={() => handleRemoveQuestion(index)} className="remove_btn">Remove</button>
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
    <label htmlFor="helper-checkbox" className="font-medium text-gray-900">Make Category Private</label>
    <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500"> By setting it to private no one else can get access to it.</p>
  </div>
</div>


       
       

 <div className='flex flex-row justify-between'>
            <button 
              className=' font-poppins text-l self-end mt-10'
              onClick={() => handleFormToggle(true)}
            >
              Back
              
            </button>

             <button 
              className='purple_btn self-end mt-10'
            >
              Create
            </button>
            </div>

      </form>
     
</div>
)}  
 <div className="absolute top-20 left-0 ">
        <PinkCircle />
      </div>
    </section>
  );
};

export default CreateCategoryPage;
