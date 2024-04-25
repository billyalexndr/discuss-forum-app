import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.CREATE_COMMENT:
      return [action.payload.comment, ...comments];
    case ActionType.TOGGLE_UPVOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          if (!comment.upvotes.includes(action.payload.userId)) {
            return {
              ...comment,
              upvotes: comment.upvotes.concat(action.payload.userId),
            };
          } else {
            return {
              ...comment,
              upvotes: comment.upvotes.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
        }
        return comment;
      });
    case ActionType.TOGGLE_DOWNVOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          if (!comment.downvotes.includes(action.payload.userId)) {
            return {
              ...comment,
              downvotes: comment.downvotes.concat(action.payload.userId),
            };
          } else {
            return {
              ...comment,
              downvotes: comment.downvotes.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
        }
        return comment;
      });
    case ActionType.TOGGLE_NEUTRAL_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          if (!comment.neutralvotes.includes(action.payload.userId)) {
            return {
              ...comment,
              neutralvotes: comment.neutralvotes.concat(action.payload.userId),
            };
          } else {
            return {
              ...comment,
              neutralvotes: comment.neutralvotes.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
        }
        return comment;
      });
    default:
      return comments;
  }
}

export default commentsReducer;
