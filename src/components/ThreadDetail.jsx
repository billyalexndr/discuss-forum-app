import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { postedAt } from '../utils';
import { useState, useEffect } from 'react';
import ThreadComments from './ThreadComments';
import CommentInput from './CommentInput';

const ThreadDetail = ({
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
  upVote,
  downVote,
  createComment,
}) => {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVote(id);
    console.log(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  return (
    <>
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
          <p>{postedAt(createdAt)}</p>
          <p className="flex items-center">
            <img
              className="w-5 h-5 mr-1 rounded-full"
              src={owner.avatar}
              alt="image description"
            />
            Created by<span className="pl-1 font-medium"> {owner.name}</span>
          </p>
        </div>

        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          #{category}
        </span>

        <CommentInput id={id} createComment={createComment} />

        <ThreadComments
          comments={comments}
          upVote={upVote}
          downVote={downVote}
          isThreadUpVoted={isThreadUpVoted}
          isThreadDownVoted={isThreadDownVoted}
        />
      </div>
    </>
  );
};

export default ThreadDetail;
