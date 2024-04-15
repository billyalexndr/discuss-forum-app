import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold mb-2">Register</h1>
          <p className="mb-4">
            Please enter your name, email and password to create your account.
          </p>
          <div>
            <RegisterInput register={onRegister} />
            <p className="mt-2">
              Already have an account?{' '}
              <Link className="text-blue-600" to="/">
                Login here!
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
