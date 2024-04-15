import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold mb-2">Sign In</h1>
          <p className="mb-4">
            Please enter your email and password to sign in to your account.
          </p>
          <div>
            <LoginInput login={onLogin} />
            <p className="mt-2">
              Don't have an account yet?{' '}
              <Link className="text-blue-600" to="/register">
                Register here!
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
