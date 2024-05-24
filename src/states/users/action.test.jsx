import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

/**
 * test scenario for asyncRegisterUser Thunk
 *
 * - asyncRegisterUser Thunk
 *  - should dispatch action correctly when user registration success
 *  - should dispatch action and call alert correctly when user registration failed
 */

const fakeUser = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
  });

  it('should dispatch action correctly when user registration success', async () => {
    api.register = () => Promise.resolve();

    const dispatch = vi.fn();
    await asyncRegisterUser(fakeUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when user registration failed', async () => {
    api.register = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncRegisterUser(fakeUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
