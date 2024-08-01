import { Link, useNavigate } from 'react-router-dom';
import Divider from '@/styles/Divider';
import { useState } from 'react';
import * as Yup from 'yup';
import AuthApi from '@/apis/authApi';

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
});
function SearchMail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid = await schema.isValid({ email });
    if (!isValid) {
      setError('Invalid email');
      return;
    }
    try {
      const res = await AuthApi.getUserSummary({email});
      navigate('/recover/initiate', { state: { user: res, email } });
    } catch (error) {
      console.log('🚀 ~ submitHandler ~ error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className="min-h-24 min-w-24 max-w-[500px] bg-white rounded-md mt-10">
        <h1 className="text-xl font-bold p-4 ">Find Your Account</h1>
        <Divider />
        <div className="p-4">
          <p className="text-[#606770] mb-5">
            Please enter your email address or mobile number to search for your account.
          </p>
          <div className="relative">
            <input
              type="text"
              className={`  rounded-md border border-gray-300 py-4 px-4 w-full ${error ? 'border-red-500' : 'focus:border-primary focus:ring-1'}`}
              name="email"
              placeholder="Enter your email address"
              
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-1 italic ml-2">{error}</p>}
          </div>
        </div>
        <Divider />

        <div className="py-3 px-4 float-right">
          <Link to='/auth/login' className="bg-[#ebedf0] py-2 px-5 rounded-md  font-medium">Cancel</Link>
          <button
            onClick={submitHandler}
            className={` py-2 px-3 rounded-md font-medium ml-5 min-w-[140px] ${email.length > 0 ? 'bg-primary text-white' : 'bg-[#ebedf0]'} `}
          >
            <span className={email.length > 0 ? 'text-white opacity-100' : 'opacity-30'}>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchMail;
