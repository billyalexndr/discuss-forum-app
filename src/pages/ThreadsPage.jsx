import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ThreadList from '../components/ThreadsList';
import { asyncPopulateDataForum } from '../states/shared/action';
import {
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
  asyncToggleNeutralVoteThread,
} from '../states/threads/action';

function ThreadsPage() {
  const {
    users = [],
    threads = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateDataForum());
  }, [dispatch]);

  const onUpVote = (id) => {
    dispatch(asyncToggleUpVoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncToggleDownVoteThread(id));
  };

  const onNeutralVote = (id) => {
    dispatch(asyncToggleNeutralVoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full bg-gray-100">
        <div className="flex flex-col items-center justify-center w-full mt-4 mb-4">
          <ThreadList
            threads={threadList}
            upVote={onUpVote}
            downVote={onDownVote}
            neutralVote={onNeutralVote}
          />
        </div>
        <div className="fixed bottom-4 right-4">
          <Link to="/create-thread">
            <button
              type="button"
              className="hover:font-bold"
              aria-labelledby="button-label"
            >
              <IoIosAddCircleOutline className="text-5xl" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThreadsPage;
