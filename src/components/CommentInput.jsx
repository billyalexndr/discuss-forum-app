import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ id, createComment }) {
  const [commentContent, setCommentContent] = useState('');
  const handleTextareaChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleCreateComment = () => {
    if (commentContent.trim() !== '') {
      createComment({ id, content: commentContent });
      setCommentContent('');
    } else {
      alert('Please enter your comment before posting.');
    }
  };

  return (
    <>
      <div className="block mt-4 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
        Your commentar
      </div>
      <textarea
        id="comment"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your commentar here..."
        value={commentContent}
        onChange={handleTextareaChange}
      />
      <button
        type="button"
        onClick={handleCreateComment}
        className="text-white w-full mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Post Commentar
      </button>
    </>
  );
}

CommentInput.propTypes = {
  id: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired,
};

export default CommentInput;
