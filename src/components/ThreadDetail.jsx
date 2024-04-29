import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { postedAt } from '../utils';
import ThreadComments from './ThreadComments';
import CommentInput from './CommentInput';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  comments,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  createComment,
}) {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  return (
    <div className="w-2/4 p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/thread/${id}`}>
        <h5 className="mb-2.5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </Link>
      <div
        className="mb-1 font-normal text-gray-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="flex items-center gap-3 mt-2 mb-2">
        {upVoteThread && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                if (isThreadUpVoted) {
                  neutralVoteThread(id);
                } else {
                  upVoteThread(id);
                }
              }}
            >
              {isThreadUpVoted ? <BiSolidLike /> : <BiLike />}
            </button>

            {upVotesBy.length}
          </div>
        )}
        {downVoteThread && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                if (isThreadDownVoted) {
                  neutralVoteThread(id);
                } else {
                  downVoteThread(id);
                }
              }}
            >
              {isThreadDownVoted ? <BiSolidDislike /> : <BiDislike />}
            </button>
            {downVotesBy.length}
          </div>
        )}
        <p>{postedAt(createdAt)}</p>
        <p className="flex items-center">
          <img
            className="w-5 h-5 mr-1 rounded-full"
            src={owner.avatar}
            alt="avatar user"
          />
          Created by<span className="pl-1 font-medium"> {owner.name}</span>
        </p>
      </div>

      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
        #{category}
      </span>

      <CommentInput id={id} createComment={createComment} />

      <ThreadComments
        idThread={id}
        authUser={authUser}
        comments={comments}
        upVoteComment={upVoteComment}
        downVoteComment={downVoteComment}
      />
    </div>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
};

export default ThreadDetail;
