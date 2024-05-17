import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
} from './action';

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const fakeAuthUserResponse = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    const fakeErrorResponse = new Error('Ups, something went wrong');

    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
