import {useLocation, useNavigate } from 'react-router-dom';
import Divider from '@/styles/Divider';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyConfirmationEmail } from '@/stores/slices/authSlice';
import Button from '@/components/Button';
import AuthApi from '@/apis/authApi';
import { toast } from 'react-toastify';

function ConfirmEmail() {
  const [code, setCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recentMail = location.state?.email;
  if (!recentMail) {
    navigate('/auth/register');
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { code, email: recentMail };

    dispatch(verifyConfirmationEmail({ data, navigate }));
  };

  const handleSendEmailAgain = () => {
    AuthApi.resendRegistrationEmail({email: recentMail})
      .then((res) => {
        console.log('🚀 ~ handleSendEmailAgain ~ res', res);
        toast.success('Email sent successfully');
      })
      .catch((err) => {
        console.log('🚀 ~ handleSendEmailAgain ~ err', err);
        toast.error('Failed to send email');
      });
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className="min-h-24 min-w-24 max-w-[500px] bg-white rounded-md mt-10">
        <h1 className="text-xl font-bold p-4 ">Enter the code from your email</h1>
        <Divider />
        <div className="p-4">
          <p className="text-[#606770] mb-5">
            Let us know that this email address belongs to you. Enter the code from the email sent to{' '}
            <b>{recentMail}</b>.
          </p>
          <div className="relative">
            <span className="absolute text-gray-500 top-2/4 -translate-y-2/4 left-3">FB- </span>{' '}
            <input
              type="text"
              className="rounded-md border border-gray-300 py-4 px-10"
              maxLength={6}
              name="code"
              size={6}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <Button text className="text-[#1877f2] text-sm hover:underline  mt-4 block" onClick={handleSendEmailAgain}>
            Send Email Again
          </Button>
        </div>
        <Divider />

        <div className="py-3 px-4 float-right">
          <button className="bg-[#ebedf0] py-1 px-3 rounded-md  font-medium">Update contact info</button>
          <button
            onClick={submitHandler}
            className={` py-1 px-3 rounded-md font-medium ml-5 min-w-[140px] ${code.length > 0 ? 'bg-primary text-white' : 'bg-[#ebedf0]'} `}
            disabled={code.length === 0}
          >
            <span className={code.length > 0 ? 'text-white opacity-100' : 'opacity-30'}>Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
