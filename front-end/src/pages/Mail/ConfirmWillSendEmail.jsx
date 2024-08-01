import { Link, useLocation, useNavigate } from 'react-router-dom';
import Divider from '@/styles/Divider';
import Button from '@/components/Button';
import AuthApi from '@/apis/authApi';
import { toast } from 'react-toastify';

function ConfirmWillSendEmail() {
  const locaiton = useLocation();
  const { user, email } = locaiton.state;
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthApi.sendCode({ email });
      console.log('🚀 ~ submitHandler ~ res:', res);
      toast.success('Code sent successfully');
      navigate('/recover/code', { state: { email } });
    } catch (error) {
      console.log('🚀 ~ submitHandler ~ error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center   ">
      <div className="min-h-24 min-w-24 max-w-[500px] w-full bg-white rounded-md mt-10">
        <h1 className="text-xl font-bold p-4 ">We'll send you a code to your email address</h1>
        <Divider />
        <div className=" flex-between p-4">
          <div className="">
            <p className=" ">We can send a login code to:</p>
            <p className="text-[#606770] text-sm my-5 ">{email} </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={user?.picture} alt="user's picture" className="w-10 h-10 rounded-full object-cover" />
            <span className="text-sm">{user?.name}</span>
            <span className="text-xs text-slate-300 my-1 block">Facebook user</span>
            <Link to="/recover/search-account" className="text-primary text-sm underline">
              Not you?
            </Link>
          </div>
        </div>
        <Divider />

        <div className="py-3 px-4 float-right gap-3 flex">
          <Button btnGray size="sm" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button primary size="sm" onClick={submitHandler}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmWillSendEmail;
