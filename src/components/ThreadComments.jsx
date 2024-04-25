import React from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { postedAt } from '../utils';

function ThreadComments({
  idThread,
  authUser,
  comments,
  upVoteComment,
  downVoteComment,
}) {
  const onUpVoteCommentClick = (event, commentId) => {
    event.stopPropagation();
    upVoteComment(idThread, commentId);
  };

  const onDownVoteCommentClick = (event, commentId) => {
    event.stopPropagation();
    downVoteComment(idThread, commentId);
  };

  return (
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
              {upVoteComment && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(event) => onUpVoteCommentClick(event, comment.id)}
                  >
                    {comment.upVotesBy.includes(authUser) ? (
                      <BiSolidLike />
                    ) : (
                      <BiLike />
                    )}
                  </button>
                  {comment.upVotesBy.length}
                </div>
              )}
              {downVoteComment && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(event) =>
                      onDownVoteCommentClick(event, comment.id)
                    }
                  >
                    {comment.downVotesBy.includes(authUser) ? (
                      <BiSolidDislike />
                    ) : (
                      <BiDislike />
                    )}
                  </button>
                  {comment.downVotesBy.length}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ThreadComments.propTypes = {
  idThread: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
};

export default ThreadComments;
