import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by CREATE_THREAD action
 *  - should return the thread with the toggled up vote thread when given by
 *    TOGGLE_UPVOTE_THREAD action
 *  - should return the thread with the toggled down vote thread when given by
 *    TOGGLE_DOWNVOTE_THREAD action
 *
 */

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T09:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by CREATE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'CREATE_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the thread with the toggled up vote thread when given by TOGGLE_UPVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'TOGGLE_UPVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);

    const nextState2 = threadsReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });

  it('should return the thread with the toggled down vote thread when given by TOGGLE_DOWNVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
      },
    ];
    const action = {
      type: 'TOGGLE_DOWNVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);

    const nextState2 = threadsReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });
});
