import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold">
        WELCOME TO THE FORUM DISKUSI-KU!
      </h1>
      <Link
        to="/threads"
        type="button"
        className="text-white w-1/4 h-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Get Started
      </Link>
    </div>
  );
}

export default HomePage;
