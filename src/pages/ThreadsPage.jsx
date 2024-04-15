import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadList from '../components/ThreadsList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action';

const ThreadsPage = () => {
  const {
    users = [],
    threads = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (id) => {
    dispatch(asyncToggleUpVoteThread({ id }));
  };

  const onDownVote = (id) => {
    dispatch(asyncToggleDownVoteThread({ id }));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Hello Threads!</h1>
        <ThreadList threads={threadList} />
      </div>
    </>
  );
};

export default ThreadsPage;
