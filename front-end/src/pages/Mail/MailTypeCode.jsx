import { useLocation, useNavigate } from 'react-router-dom';
import Divider from '@/styles/Divider';
import { useDispatch } from 'react-redux';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/components/Form/TextInput';
import { forgotPassword } from '@/stores/slices/authSlice';

const schema = Yup.object({
  code: Yup.string().required('Code is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

function MailTypeCode() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      code: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const { email } = location.state;

  // const email = 'aslkfjlask';

  const onSubmit = (data) => {
    data.email = email;
    console.log('🚀 ~ submitHandler ~ data', data);
    dispatch(forgotPassword({ data, navigate }));
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className="min-h-24 min-w-24 max-w-[500px] bg-white rounded-md mt-10">
        <h1 className="text-xl font-bold p-4 ">Enter security code</h1>
        <Divider />
        <div className="p-4">
          <p className="text-[#606770] mb-3">
            Please check your emails for a message with your code. Your code is 5 numbers long.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-between">
              <div className="relative">
                <div>
                  <TextInput
                    name="code"
                    control={control}
                    errors={errors}
                    label="Code"
                    maxLength={6}
                    autoFocus
                    autoComplete="off"
                    placeholder="Enter code here"
                  />
                </div>
              </div>

              <div>
                <h5 className="mb-3">We sent your code to:</h5>
                <span className="text-sm text-slate-600">{email}</span>
              </div>
            </div>
            <TextInput passwordField name="password" placeholder="New Password" control={control} errors={errors} />
          </form>
        </div>
        <Divider />

        <div className="py-3 px-4 float-right gap-3 flex">
          <Button btnGray size="sm" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button primary size="sm" onClick={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MailTypeCode;
