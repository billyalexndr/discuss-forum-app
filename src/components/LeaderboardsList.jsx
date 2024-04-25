import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardsList({ leaderboards }) {
  return (
    <>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
      ))}
    </>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      rank: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default LeaderboardsList;
