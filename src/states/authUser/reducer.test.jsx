import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = null;
    const unknownAction = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, unknownAction);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const authUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
