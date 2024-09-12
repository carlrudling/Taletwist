"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var pinkCircle_1 = __importDefault(require("../icons/pinkCircle"));
var Nav_1 = __importDefault(require("../Nav"));
var SubscriptionPage = function (_a) {
    var onNavigate = _a.onNavigate, user = _a.user;
    var rightTextFree = [
        '6 players',
        '✅',
        '❌',
        '✅',
        '✅',
        '✅',
        '✅',
    ];
    var rightTextPremium = [
        'unlimited',
        '✅',
        '✅',
        '✅',
        '✅',
        '✅',
        '✅',
    ];
    return (<section className="flex flex-col justify-start w-screen h-screen bg-custom-purple relative overflow-auto lg:overflow-hidden">
    
      <Nav_1.default onNavigate={onNavigate}/>
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
        ].map(function (item, index) { return (<div key={index} className="flex justify-between font-SourceSansPro font-medium mb-4">
              <span>{item}</span>
              <span className='font-poppins font-bold'>{rightTextFree[index]}</span>
            </div>); })}
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
        ].map(function (item, index) { return (<div key={index} className="flex justify-between font-SourceSansPro font-medium mb-4">
              <span>{item}</span>
              <span className='font-poppins font-bold'>{rightTextPremium[index]}</span>
            </div>); })}

    <h2 className='text-xl font-poppins font-bold text-black mt-4'>$6.99 / month </h2>
           <button className='bg-custom-purple hover:bg-custom-pink hover:text-black hover:shadow text-white mt-4 font-medium font-poppins py-2 px-4 rounded'>
           Get Premium
          </button>
        </div>
        </div>
 
      <div className="absolute top-20 left-0 ">
        <pinkCircle_1.default />
      </div>


    </section>);
};
exports.default = SubscriptionPage;
