import React from 'react';
import { useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import { asyncCreateThread } from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();

  const onCreateThread = ({ title, body, category }) => {
    dispatch(asyncCreateThread({ title, body, category }));
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-2 text-2xl font-semibold">Create Thread</h1>
        <p className="mb-4">
          Please input title and body to create your thread.
        </p>
        <div>
          <ThreadInput createThread={onCreateThread} />
        </div>
      </div>
    </section>
  );
}

export default CreateThreadPage;
