import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

import TextInput from '@/components/Form/TextInput';
import Register from './Register';
import Footer from '@/layouts/shared/Footer';
import Divider from '@/styles/Divider';
import { useState } from 'react';
import Button from '@/components/Button';
import { useDispatch } from 'react-redux';
import { login } from '@/stores/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispath(login({ data, navigate }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      <div className="  bg-secondary  h-[720px]  py-[140px] ">
        <div className=" max-w-[980px] m-auto flex justify-between   ">
          <div className="mt-[40px]">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt=""
              className="w-[320px] -ml-[30px] "
            />
            <p className="text-2xl">
              Facebook helps you connect and share <br /> with the people in your life.
            </p>
          </div>
          <div>
            <div className="bg-white rounded-xl w-[400px] p-4  shadow-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group flex flex-col gap-y-2 ">
                  <TextInput
                    name="email"
                    placeholder="Email address or phone number"
                    control={control}
                    onKeyDown={handleKeyDown}
                    errors={errors}
                  />
                  <TextInput
                    passwordField
                    name="password"
                    placeholder="Password"
                    control={control}
                    errors={errors}
                  />
                </div>

                <Button primary fullWidth size="md" className="mt-3 bg-primary">
                  Log in
                </Button>
              </form>
              <Link
                className="text-center text-primary text-sm my-4 block hover:underline"
                to="/recover/search-account"
              >
                Forgotten password?
              </Link>

              <Divider />
              <div className="text-center">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowRegister(true);
                  }}
                  className="bg-green text-white mt-4"
                >
                  Create new account
                </Button>
              </div>
            </div>
            <p className="text-center mt-6">
              <b className="hover:underline cursor-pointer">Create a Page </b>for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>

      {showRegister && <Register setShowRegister={setShowRegister} />}

      <div className="max-w-[980px] mx-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
