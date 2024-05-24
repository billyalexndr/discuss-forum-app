import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the new state when given SET_IS_PRELOAD action
 */

describe('isPreloadReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = true;
    const unknownAction = { type: 'UNKNOWN' };

    const nextState = isPreloadReducer(initialState, unknownAction);

    expect(nextState).toEqual(initialState);
  });

  it('should return the new state when given SET_IS_PRELOAD action', () => {
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreLoad: false,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(false);
  });
});
