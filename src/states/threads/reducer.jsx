import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.CREATE_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          if (!thread.upvotes.includes(action.payload.userId)) {
            return {
              ...thread,
              upvotes: thread.upvotes.concat(action.payload.userId),
            };
          } else {
            return {
              ...thread,
              upvotes: thread.upvotes.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
        }
        return thread;
      });
    case ActionType.TOGGLE_DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          if (!thread.downvotes.includes(action.payload.userId)) {
            return {
              ...thread,
              downvotes: thread.downvotes.concat(action.payload.userId),
            };
          } else {
            return {
              ...thread,
              downvotes: thread.downvotes.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
