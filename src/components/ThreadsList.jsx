import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, upVote, downVote, neutralVote }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const uniqueCategories = new Set(threads.map((thread) => thread.category));

  const categoryOptions = ['All', ...uniqueCategories];

  const filteredThreads =
    selectedCategory === 'All'
      ? threads
      : threads.filter((thread) => thread.category === selectedCategory);

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-4">
        <div>Filter by category:</div>
        <div className="flex flex-row">
          {categoryOptions.map((category) => (
            <button
              type="button"
              key={category}
              className={`flex justify-center items-center mt-2 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-indigo-400 ${
                selectedCategory === category
                  ? 'bg-indigo-100 text-indigo-800 dark:text-indigo-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
              onClick={handleChangeCategory}
              value={category}
            >
              #{category}
            </button>
          ))}
        </div>
      </div>
      {filteredThreads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
          neutralVote={neutralVote}
        />
      ))}
    </>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string,
    }),
  ).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadList;
