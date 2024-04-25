import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <li className="pb-2 mt-2 mb-2 border-b-2">
      <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={user.avatar}
            alt="avatar user"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="flex items-center justify-start text-sm font-medium text-gray-900 truncate dark:text-white">
            {user.name}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {score}
        </div>
      </div>
    </li>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
