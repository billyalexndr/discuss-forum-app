import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  ActionType,
} from './action';

const fakeAuthUserResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeTokenResponse = 'fake-token';
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch actions correctly when login is successful', async () => {
    api.login = vi.fn().mockResolvedValue(fakeTokenResponse);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeAuthUserResponse);

    const dispatch = vi.fn();
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(
      dispatch,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeTokenResponse);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert correctly when login fails', async () => {
    api.login = vi.fn().mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(
      dispatch,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password',
    });
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('should dispatch actions correctly when logging out', () => {
    const dispatch = vi.fn();
    api.putAccessToken = vi.fn();

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
