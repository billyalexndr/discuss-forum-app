import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThreadInput = ({ createThread }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    if (title.trim()) {
      createThread({ title, body, category });
      setTitle('');
      setBody('');
      setCategory('');
      navigate('/threads');
    }
  }

  function onTitleChange({ target }) {
    if (target.value.length <= 50) {
      setTitle(target.value);
    }
  }

  function onBodyChange({ target }) {
    if (target.value.length <= 350) {
      setBody(target.value);
    }
  }

  function onCategoryChange({ target }) {
    if (target.value.length <= 50) {
      return setCategory(target.value);
    }
    return setCategory('');
  }

  return (
    <form className="w-100">
      <div className="mb-5">
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          value={body}
          onChange={onBodyChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Body"
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          value={category}
          onChange={onCategoryChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Category"
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create
      </button>
    </form>
  );
};

export default ThreadInput;
