import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardsList from '../components/LeaderboardsList';
import { asyncPopulateDataForum } from '../states/shared/action';

function LeaderboardPage() {
  const { leaderboards = [] } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateDataForum());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center pb-4 mt-4">
      <h1 className="mb-5 text-2xl font-bold">List Active Users</h1>
      <div className="w-3/5">
        <div className="flex items-center space-x-4 font-semibold text-gray-900 rtl:space-x-reverse dark:text-white">
          <div className="flex-1 min-w-0">Users</div>
          <div className="inline-flex items-center text-base">Score</div>
        </div>
        <ul>
          <LeaderboardsList leaderboards={leaderboards} />
        </ul>
      </div>
    </div>
  );
}

export default LeaderboardPage;
