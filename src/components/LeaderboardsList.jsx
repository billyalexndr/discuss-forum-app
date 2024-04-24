import React from 'react';
import LeaderboardItem from './LeaderboardItem';

const LeaderboardsList = ({ leaderboards }) => {
  return (
    <>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem key={leaderboard.id} {...leaderboard} />
      ))}
    </>
  );
};

export default LeaderboardsList;
