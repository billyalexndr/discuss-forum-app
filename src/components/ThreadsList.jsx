import React from 'react';
import ThreadItem from './ThreadItem';

const ThreadList = ({ threads, upVote, downVote }) => {
  return (
    <>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </>
  );
};

export default ThreadList;
