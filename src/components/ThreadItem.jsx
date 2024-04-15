import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

const ThreadItem = ({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotes,
  downVotes,
  authUser,
}) => {
  const navigate = useNavigate();
  //   const isThreadUpVote = upVotes.inlcludes(authUser);
  //   const isThreadDownVote = downVotes.inlcludes(authUser);

  //   const onUpVoteClick = (event) => {
  //     event.stopPropagation();
  //     like(id);
  //   };

  //   const onDownClick = (event) => {
  //     event.stopPropagation();
  //     like(id);
  //   };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/thread/${id}`);
    }
  };
  const firstSentence = body.split('. ')[0];

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
          dangerouslySetInnerHTML={{ __html: firstSentence }}
        />
        <div className="flex gap-3">
          <p>{postedAt(createdAt)}</p>
          <p className="font-medium">Dibuat oleh {user.name}</p>
        </div>
        <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          #{category}
        </span>
      </div>
    </>
  );
};

export default ThreadItem;
