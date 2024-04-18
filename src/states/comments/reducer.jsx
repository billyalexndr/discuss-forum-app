import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.CREATE_COMMENT:
      return [action.payload.comment, ...comments];
    default:
      return comments;
  }
}

export default commentsReducer;
