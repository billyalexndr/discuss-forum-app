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
import { asyncCreateComment } from '../states/comments/action';
import NotFoundPage from './NotFoundPage';

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

  // console.log(threadDetail);
  const onUpVote = (id) => {
    if (threadDetail && threadDetail.upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteThreadDetail(id));
    } else {
      dispatch(asyncToggleUpVoteThreadDetail(id));
    }
  };

  const onDownVote = (id) => {
    if (threadDetail && threadDetail.downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteThreadDetail(id));
    } else {
      dispatch(asyncToggleDownVoteThreadDetail(id));
    }
  };

  if (!threadDetail) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-gray-100">
          <div className="flex flex-col items-center justify-center w-full mt-4 mb-4">
            <ThreadDetail
              {...threadDetail}
              authUser={authUser.id}
              upVote={onUpVote}
              downVote={onDownVote}
              createComment={onCreateComment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
