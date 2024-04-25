import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaRegCommentDots } from 'react-icons/fa6';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  totalComments,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
}) {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVote(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  const firstSentence = body.split('. ')[0];

  return (
    <div className="w-2/4 p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/thread/${id}`}>
        <h5 className="mb-2.5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </Link>
      <div
        className="mb-1 font-normal text-gray-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: firstSentence }}
      />
      <div className="flex items-center gap-3">
        {upVote && (
          <div className="flex items-center gap-1">
            <button type="button" onClick={onUpVoteClick}>
              {isThreadUpVoted ? <BiSolidLike /> : <BiLike />}
            </button>
            {upVotesBy.length}
          </div>
        )}
        {downVote && (
          <div className="flex items-center gap-1">
            <button type="button" onClick={onDownVoteClick}>
              {isThreadDownVoted ? <BiSolidDislike /> : <BiDislike />}
            </button>
            {downVotesBy.length}
          </div>
        )}
        <div className="flex items-center gap-1">
          <FaRegCommentDots />
          {totalComments}
        </div>
        <p>{postedAt(createdAt)}</p>
        <p className="flex items-center">
          <img
            className="w-5 h-5 mr-1 rounded-full"
            src={user.avatar}
            alt="avatar user"
          />
          Created by
          <span className="pl-1 font-medium">{user.name}</span>
        </p>
      </div>

      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
        #{category}
      </span>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadItem;
