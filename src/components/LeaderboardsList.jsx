import React from 'react';
import LeaderboardItem from './LeaderboardItem';

const LeaderboardsList = ({ leaderboards }) => {
  // console.log(leaderboards);
  return (
    <>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
      ))}
    </>
  );
};

export default LeaderboardsList;
