import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the authUser when given SET_AUTH_USER action
 *  - should return null when given UNSET_AUTH_USER action
 *
 */

describe('authUserReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = null;
    const unknownAction = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, unknownAction);

    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given SET_AUTH_USER action', () => {
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

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
