import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = true;
    const unknownAction = { type: 'UNKNOWN' };

    // action
    const nextState = isPreloadReducer(initialState, unknownAction);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the new state when given SET_IS_PRELOAD action', () => {
    // arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreLoad: false,
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(false);
  });
});
