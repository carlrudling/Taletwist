"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                satoshi: ['Satoshi', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                sourceSansPro: ['Source Sans Pro', 'sans-serif'],
            },
            colors: {
                'custom-purple': '#002446',
                'custom-orange': '#FFCB5B',
                'custom-lightOrange': '#F9E8D6',
                'custom-pink': '#FD8DB7',
                'custom-blue': '#D1E2F4',
                'custom-light-green': '#E4F2E4',
                'quiz-green': '#59C134',
                'quiz-red': '#CA7171',
                'quiz-yellow': '#E3EB88',
                'quiz-blue': '#9FD0FD',
            },
            boxShadow: {
                'custom-shadow': 'inset 10px -50px 94px 0 rgba(199, 199, 199, 0.2)',
                'custom-glass': 'inset 10px -50px 94px 0 rgba(199, 199, 199, 0.2)',
            },
            maxWidth: {
                'categoryCardWidth': '250px',
                'gameCardWidth': '400px', // Customize this value as needed
            },
            width: {
                'categoryCardWidth': '25rem',
                'subscriptionCardWidth': '45rem',
                'buttonWidth': '20rem',
                'starHeight': '12rem',
                'gameCardWidth': '40rem',
            },
            borderWidth: {
                'size3': '3px', // Define custom border width
            },
            height: {
                'categoryCardHeight': '15rem',
                'waveHeight': '20rem',
                'starHeight': '12rem',
                'quizColorheight': '8rem',
                'subscriptionCardHeight': '50rem',
            },
            lineHeight: {
                'custom': '1.15', // Add custom line-height
            },
            backgroundImage: {
                'correct-gradient': 'linear-gradient(to bottom, #E6E96A, #59C134)', // Light green to quiz-green
                'incorrect-gradient': 'linear-gradient(to bottom, #D38B5C, #CA7171)', // Light red to quiz-red
            },
        },
    },
    plugins: [],
};
exports.default = config;
