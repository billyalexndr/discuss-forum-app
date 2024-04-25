import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-2 text-2xl font-semibold">Sign In</h1>
        <p className="mb-4">
          Please enter your email and password to sign in to your account.
        </p>
        <div>
          <LoginInput login={onLogin} />
          <p className="mt-2">
            Don&apos;t have an account yet?
            <Link className="text-blue-600" to="/register">
              {' '}
              Register here!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
