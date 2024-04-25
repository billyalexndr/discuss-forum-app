import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  CREATE_COMMENT: 'CREATE_COMMENT',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRAL_COMMENT: 'TOGGLE_NEUTRAL_COMMENT',
};

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function toggleNeutralVoteCommentActionCreator({
  threadId,
  commentId,
  userId,
}) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncCreateComment({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ id, content });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleUpVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.toggleUpVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }
  };
}

function asyncToggleNeutralVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleNeutralVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.toggleNeutralVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleDownVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.toggleDownVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncCreateComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
};
