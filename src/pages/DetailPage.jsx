import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import {
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
} from '../states/threadDetail/action';
import {
  asyncCreateComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
  asyncToggleUpVoteComment,
} from '../states/comments/action';

const DetailPage = () => {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onCreateComment = (id, content) => {
    dispatch(asyncCreateComment(id, content));
  };

  const onUpVoteThread = (id) => {
    if (threadDetail && threadDetail.upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteThreadDetail(id));
    } else {
      dispatch(asyncToggleUpVoteThreadDetail(id));
    }
  };

  const onDownVoteThread = (id) => {
    if (threadDetail && threadDetail.downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteThreadDetail(id));
    } else {
      dispatch(asyncToggleDownVoteThreadDetail(id));
    }
  };

  const onUpVoteComment = (idThread, commentId) => {
    if (
      threadDetail &&
      threadDetail.comments.some(
        (comment) =>
          comment.id === commentId && comment.upVotesBy.includes(authUser.id),
      )
    ) {
      dispatch(asyncToggleNeutralVoteComment(idThread, commentId));
    } else {
      dispatch(asyncToggleUpVoteComment(idThread, commentId));
    }
  };

  const onDownVoteComment = (idThread, commentId) => {
    if (
      threadDetail &&
      threadDetail.comments.some(
        (comment) =>
          comment.id === commentId && comment.downVotesBy.includes(authUser.id),
      )
    ) {
      dispatch(asyncToggleNeutralVoteComment(idThread, commentId));
    } else {
      dispatch(asyncToggleDownVoteComment(idThread, commentId));
    }
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-gray-100">
          <div className="flex flex-col items-center justify-center w-full mt-4 mb-4">
            <ThreadDetail
              {...threadDetail}
              authUser={authUser.id}
              upVoteThread={onUpVoteThread}
              downVoteThread={onDownVoteThread}
              upVoteComment={onUpVoteComment}
              downVoteComment={onDownVoteComment}
              createComment={onCreateComment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
