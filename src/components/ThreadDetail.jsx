import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCommentDots } from 'react-icons/fa6';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { postedAt } from '../utils';

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
}) => {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);
  //   const isThreadCommentUpVoted = comments.upVotesBy.includes(authUser);
  //   const isThreadCommentDownVoted = comments.downVotesBy.includes(authUser);

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
              <button type="button">
                {isThreadUpVoted ? <BiSolidLike /> : <BiLike />}
              </button>
              {upVotesBy.length}
            </div>
          )}
          {downVote && (
            <div className="flex items-center gap-1">
              <button type="button">
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

        <div>
          <label className="block mt-4 mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Your commentar
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your commentar here..."
          ></textarea>
          <button
            type="button"
            className="text-white w-full mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Post Commentar
          </button>
        </div>

        <div className="mt-4">
          <p className="font-semibold">Comments ({comments.length})</p>
          <div className="flex flex-col mt-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex flex-col w-full mb-4 border-b-2 border-gray-300 border-solid"
              >
                <div className="flex justify-between w-full">
                  <div className="flex items-center">
                    <img
                      className="w-5 h-5 mr-2 rounded-full"
                      src={comment.owner.avatar}
                      alt={comment.owner.name}
                    />
                    <p>{comment.owner.name}</p>
                  </div>
                  <div>
                    <p>{postedAt(comment.createdAt)}</p>
                  </div>
                </div>
                <div
                  className="mt-1 mb-1 font-normal"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
                <div className="flex items-center gap-3">
                  {upVote && (
                    <div className="flex items-center gap-1">
                      <button type="button">
                        {isThreadUpVoted ? <BiSolidLike /> : <BiLike />}
                      </button>
                      {comment.upVotesBy.length}
                    </div>
                  )}
                  {downVote && (
                    <div className="flex items-center gap-1">
                      <button type="button">
                        {isThreadUpVoted ? <BiSolidDislike /> : <BiDislike />}
                      </button>
                      {comment.downVotesBy.length}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreadDetail;
